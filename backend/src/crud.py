from sqlalchemy.orm import Session

from . import models, schemas


def get_parks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Park).offset(skip).limit(limit).all()


def create_park(db: Session, park: schemas.ParkCreate):
    db_park = models.Park(
        name = park.name,
        description = park.description,
        address = park.address,
        amenities = park.amenities,
        phone_nr = park.phone_nr,
        capacity = park.capacity,
        image_url = park.image_url,
    )
    db.add(db_park)
    db.commit()
    db.refresh(db_park)
    return db_park
        

def find_park(db: Session, park_name: str):
    return db.query(models.Park).where(models.Park.name == park_name).first()

def find_user(db: Session, username: str):
    return db.query(models.User).where(models.User.username == username).first()

def search_parks_by_name(db: Session, park_name: str):
    search = "%{}%".format(park_name)
    return db.query(models.Park).where(models.Park.name.like(search)).all()

def update_park(db: Session, park_name: str, park: schemas.ParkCreate):
    db_park = db.query(models.Park).where(models.Park.name == park_name).first()
    if not db_park:
        return None
    db_park.name = park.name,
    db_park.description = park.description,
    db_park.address = park.address,
    db_park.amenities = park.amenities,
    db_park.phone_nr = park.phone_nr,
    db_park.capacity = park.capacity,
    db_park.image_url = park.image_url,
    db.commit()
    db.refresh(db_park)
    return db_park

def delete_park(db: Session, park_name: str):
    db_park = db.query(models.Park).where(models.Park.name == park_name).first()
    if not db_park:
        return None
    db.delete(db_park)
    db.commit()
    return db_park
