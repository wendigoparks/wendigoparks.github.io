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
