from dotenv import load_dotenv
load_dotenv('.env.local')
load_dotenv()

from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import RedirectResponse
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


@app.get("/", include_in_schema=False)
def redirect_to_docs():
    return RedirectResponse(url="/docs")


@app.get("/parks/", response_model=list[schemas.Park])
def read_parks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    parks = crud.get_parks(db=db, skip=skip, limit=limit)
    return parks

@app.get("/park/{park_name}", response_model=schemas.Park)
def find_park(park_name: str, db: Session = Depends(get_db)):
    park = crud.find_park(db=db, park_name=park_name)
    if not park:
        raise HTTPException(status_code=404, detail="Park not found")
    return park

@app.get("/parks/{park_name_contains}", response_model=list[schemas.Park])
def search_parks_by_name(park_name: str, db: Session = Depends(get_db)):
    parks = crud.search_parks_by_name(db=db, park_name=park_name)
    return parks

@app.post("/park/", response_model=schemas.Park)
def create_park(park: schemas.ParkCreate, db: Session = Depends(get_db)):
    existing_park = crud.find_park(db=db, park_name=park.name)
    if existing_park:
        raise HTTPException(status_code=400, detail="Park with this name already exists")
    return crud.create_park(db=db, park=park)

@app.put("/park/update/{park_name}", response_model=schemas.Park)
def update_park(park_name: str, park: schemas.ParkCreate, db: Session = Depends(get_db)):
    existing_park = crud.update_park(db=db, park_name=park_name, park=park)
    if not existing_park:
        raise HTTPException(status_code=404, detail="Park not found")
    return existing_park

@app.delete("/park/{park_name}", response_model=schemas.Park)
def delete_park(park_name: str, db: Session = Depends(get_db)):
    park = crud.delete_park(db=db, park_name=park_name)
    if not park:
        raise HTTPException(status_code=404, detail="Park not found")
    return park
