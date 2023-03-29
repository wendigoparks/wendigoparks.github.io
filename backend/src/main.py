from datetime import datetime, timedelta
from dotenv import load_dotenv
load_dotenv('.env.local')
load_dotenv()

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from passlib.context import CryptContext
from passlib.hash import bcrypt
from pydantic import BaseModel #temporary

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

from fastapi.middleware.cors import CORSMiddleware

SECRET_KEY = "2addb0396574313864b993c346674f9b2b3821ab21f8fde06e259357fcddb419"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

def fake_hash_password(password: str):
    return "fakehashed" + password

origins = [
    "http://localhost:3000/",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
# Dependency
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

def verify_password(plain_password, hashed_password):
    return bcrypt.verify(plain_password, hashed_password)


def get_password_hash(password):
    return bcrypt.hash(password)

def authenticate_user(db: Session, username: str, password: str):
    user = crud.find_user(db=db, username=username)
    if not user:
        return False
    if not verify_password(password, user.hashed_pswd):
        return False
    return user

def create_jwt_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=10)
    to_encode.update({"exp": expire})
    ejwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return ejwt

async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud.find_user(db=db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: schemas.User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_jwt_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(get_current_active_user)):
    return current_user

@app.post("/encrypt")
async def encrypt(pas: str):
    return get_password_hash(pas)

@app.get("/parks/", response_model=list[schemas.Park])
async def read_parks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    parks = crud.get_parks(db=db, skip=skip, limit=limit)
    return parks

@app.get("/park/{park_name}", response_model=schemas.Park)
async def find_park(park_name: str, db: Session = Depends(get_db)):
    park = crud.find_park(db=db, park_name=park_name)
    if not park:
        raise HTTPException(status_code=404, detail="Park not found")
    return park

@app.get("/parks/{park_name_contains}", response_model=list[schemas.Park])
async def search_parks_by_name(park_name: str, db: Session = Depends(get_db)):
    parks = crud.search_parks_by_name(db=db, park_name=park_name)
    return parks

@app.post("/park/", response_model=schemas.Park)
async def create_park(park: schemas.ParkCreate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    existing_park = crud.find_park(db=db, park_name=park.name)
    if existing_park:
        raise HTTPException(status_code=400, detail="Park with this name already exists")
    return crud.create_park(db=db, park=park)


@app.put("/park/update/{park_name}", response_model=schemas.Park)
async def update_park(park_name: str, park: schemas.ParkCreate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    existing_park = crud.update_park(db=db, park_name=park_name, park=park)
    if not existing_park:
        raise HTTPException(status_code=404, detail="Park not found")
    return existing_park

@app.delete("/park/{park_name}", response_model=schemas.Park)
async def delete_park(park_name: str, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    park = crud.delete_park(db=db, park_name=park_name)
    if not park:
        raise HTTPException(status_code=404, detail="Park not found")
    return park
