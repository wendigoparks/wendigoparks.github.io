from dotenv import load_dotenv
load_dotenv('.env.local')
load_dotenv()

from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/parks/", response_model=schemas.Park)
def create_park(park: schemas.ParkCreate, db: Session = Depends(get_db)):
    return crud.create_park(db=db, park=park)


@app.get("/parks/", response_model=list[schemas.Park])
def read_parks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    parks = crud.get_parks(db, skip=skip, limit=limit)
    return parks
