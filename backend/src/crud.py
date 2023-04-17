from random import randint
from sqlalchemy.orm import Session
from sqlalchemy import or_
from uuid import uuid4
from datetime import time, date, datetime
from fastapi import HTTPException

from . import models, schemas


def get_parks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Park).offset(skip).limit(limit).all()


def create_park(db: Session, park: schemas.ParkCreate):
    db_park = models.Park(
        id = str(uuid4()),
        name = park.name,
        state = park.state,
        county = park.county,
        latitude = park.latitude,
        longitude = park.longitude,
        description = park.description,
        address = park.address,
        amenities = park.amenities,
        phone_nr = park.phone_nr,
        capacity = park.capacity,
        image_url = park.image_url,
    )
    db.add(db_park)
    db.commit()
    if park.facilities:
        for facility in park.facilities:
            db_facility = models.Facility(
                id = str(uuid4()),
                name = facility.name,
                state = facility.state,
                county = facility.county,
                address = facility.address,
                latitude = facility.latitude,
                longitude = facility.longitude,
                description = facility.description,
                phone_nr = facility.phone_nr,
                type = facility.type,
                capacity = facility.capacity,
                image_url = facility.image_url,
                park_id = db_park.id,
                monday_hours = facility.monday_hours,
                tuesday_hours = facility.tuesday_hours,
                wednesday_hours = facility.wednesday_hours,
                thursday_hours = facility.thursday_hours,
                friday_hours = facility.friday_hours,
                saturday_hours = facility.saturday_hours,
                sunday_hours = facility.sunday_hours,
            )
            db.add(db_facility)
            db.commit()
            if facility.courts:
                for court in facility.courts:
                    db_court = models.Court(
                        id = str(uuid4()),
                        facility_id = db_facility.id,
                        park_id = db_park.id,
                        name = court.name,
                        reservable = court.reservable,
                    )
                    db.add(db_court)
    db.commit()
    db.refresh(db_park)
    return db_park


def create_facility(db: Session, facility: schemas.FacilityCreate):
    db_facility = models.Facility(
        id = str(uuid4()),
        name = facility.name,
        state = facility.state,
        county = facility.county,
        address = facility.address,
        latitude = facility.latitude,
        longitude = facility.longitude,
        description = facility.description,
        phone_nr = facility.phone_nr,
        type = facility.type,
        capacity = facility.capacity,
        image_url = facility.image_url,
        park_id = facility.park_id,
        monday_hours = facility.monday_hours,
        tuesday_hours = facility.tuesday_hours,
        wednesday_hours = facility.wednesday_hours,
        thursday_hours = facility.thursday_hours,
        friday_hours = facility.friday_hours,
        saturday_hours = facility.saturday_hours,
        sunday_hours = facility.sunday_hours,
    )
    db.add(db_facility)
    db.commit()
    if facility.courts:
        for court in facility.courts:
            db_court = models.Court(
                id = str(uuid4()),
                facility_id = db_facility.id,
                park_id = facility.park_id,
                name = court.name,
                reservable = court.reservable,
            )
            db.add(db_court)
    db.commit()
    db.refresh(db_facility)
    return db_facility


def create_court(db: Session, court: schemas.CourtCreate):
    db_court = models.Court(
        id = str(uuid4()),
        facility_id = court.facility_id,
        park_id = court.park_id,
        name = court.name,
        reservable = court.reservable,
    )
    db.add(db_court)
    db.commit()
    db.refresh(db_court)
    return db_court


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        id = randint(1, 99999),
        username = user.username,
        email = user.email,
        full_name = user.full_name,
        disabled = user._disabled,
        hashed_pswd = user.hashed_pswd,
        admin = False
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def find_user(db: Session, username: str=None, email: str=None):
    return db.query(models.User).where(or_(models.User.username == username, models.User.email == email)).first()




def search_parks_by_name(db: Session, park_name: str):
    search = "%{}%".format(park_name)
    return db.query(models.Park).where(models.Park.name.like(search)).all()




def update_park(db: Session, park_id: str, park: schemas.ParkCreate):
    db_park = db.query(models.Park).where(models.Park.id == park_id).first()
    if not db_park:
        return None
    db_park.name = park.name
    db_park.state = park.state
    db_park.county = park.county
    db_park.latitude = park.latitude
    db_park.longitude = park.longitude
    db_park.description = park.description
    db_park.address = park.address
    db_park.amenities = park.amenities
    db_park.phone_nr = park.phone_nr
    db_park.capacity = park.capacity
    db_park.image_url = park.image_url
    db.commit()
    db.refresh(db_park)
    return db_park




def delete_park(db: Session, park_id: str):
    db_park = db.query(models.Park).where(models.Park.id == park_id).first()
    if not db_park:
        return None
    db.delete(db_park)
    db.commit()
    return db_park

def get_parks_and_facilities(db: Session, skip: int = 0, limit: int = 100):
    parks = db.query(models.Park).order_by(models.Park.id).offset(skip).limit(limit).all()
    if not parks:
        return []
    for park in parks:
        park.facilities = []
    offset = 0
    park_index = 0
    facilities_limit = limit * 5
    num_facilities = facilities_limit
    while num_facilities == facilities_limit:
        facilities = db.query(models.Facility).order_by(models.Facility.park_id, models.Facility.id).where(models.Facility.park_id >= parks[0].id).offset(offset).limit(facilities_limit).all()
        num_facilities = len(facilities)
        parks[0].capacity = num_facilities
        for facility in facilities:
            while facility.park_id != parks[park_index].id:
                park_index += 1
                if park_index >= limit:
                    return parks
            parks[park_index].facilities.append(facility)
        offset += len(facilities)

    return parks

def get_parks_facilities_and_courts(db: Session, skip: int = 0, limit: int = 100):
    parks = db.query(models.Park).order_by(models.Park.id).offset(skip).limit(limit).all()
    if not parks:
        return []
    for park in parks:
        park.facilities = []
    offset = 0
    park_index = 0
    facilities_limit = limit * 5
    num_facilities = facilities_limit
    while num_facilities == facilities_limit:
        facilities = db.query(models.Facility).order_by(models.Facility.park_id, models.Facility.id).where(models.Facility.park_id >= parks[0].id).offset(offset).limit(facilities_limit).all()
        num_facilities = len(facilities)
        for facility in facilities:
            while facility.park_id != parks[park_index].id:
                park_index += 1
                if park_index >= limit:
                    break
            else:
                facility.courts = []
                parks[park_index].facilities.append(facility)
                continue
            break
        else:
            offset += facilities_limit
            continue
        break

    offset = 0
    park_index = 0
    facility_index = 0
    courts_limit = limit * 5
    num_courts = courts_limit
    while num_courts == courts_limit:
        courts = db.query(models.Court).order_by(models.Court.park_id, models.Court.facility_id, models.Court.id).where(models.Court.park_id >= parks[0].id).offset(offset).limit(courts_limit).all()
        num_courts = len(courts)
        for court in courts:
            while court.park_id != parks[park_index].id:
                facility_index = 0
                park_index += 1
                if park_index >= limit:
                    return parks
            while court.facility_id != parks[park_index].facilities[facility_index].id:
                facility_index += 1
            parks[park_index].facilities[facility_index].courts.append(court)
        offset += courts_limit

    return parks


def get_park(db: Session, id: str):
    return db.query(models.Park).where(models.Park.id == id).first()


def get_facility(db: Session, id: str):
    return db.query(models.Facility).where(models.Facility.id == id).first()


def get_court(db: Session, id: str):
    return db.query(models.Court).where(models.Court.id == id).first()


def get_facilities_for_park(db: Session, id: str):
    return db.query(models.Facility).where(models.Facility.park_id == id).all()


def get_courts_for_facility(db: Session, id: str):
    return db.query(models.Court).where(models.Court.facility_id == id).all()


def get_facilities_and_courts_for_park(db: Session, id: str):
    facilities = db.query(models.Facility).where(models.Facility.park_id == id).order_by(models.Facility.id).all()
    courts = db.query(models.Court).where(models.Court.park_id == id).order_by(models.Court.facility_id).all()
    facility_index = 0
    for facility in facilities:
        facility.courts = []
    for court in courts:
        while court.facility_id != facilities[facility_index].id:
            facility_index += 1
        facilities[facility_index].courts.append(court)
    return facilities


def check_court_available(db: Session, reservation: schemas.ReservationCreate, court: schemas.Court):
    reservation_date = date_from_str(reservation.date)
    start_time = time_from_str(reservation.start_time)
    end_time = time_from_str(reservation.end_time)
    if start_time >= end_time:
        return False, "Start time must be before end time"
    if reservation_date < date.today():
        return False, "Cannot reserve a date in the past"
    elif reservation_date == date.today():
        if start_time < datetime.now().time():
            return False, "Cannot reserve a date in the past"
    facility = get_facility(db, court.facility_id)
    day_of_week = reservation_date.weekday()
    match day_of_week:
        case 0:
            hours = facility.monday_hours
        case 1:
            hours = facility.tuesday_hours
        case 2:
            hours = facility.wednesday_hours
        case 3:
            hours = facility.thursday_hours
        case 4:
            hours = facility.friday_hours
        case 5:
            hours = facility.saturday_hours
        case 6:
            hours = facility.sunday_hours
        case _:
            return False, "Server error"
    if not hours:
        return False, "Reservation must be on a day where the facility is open"
    open_time, close_time = hours.split('-')
    open_time = time_from_str(open_time)
    close_time = time_from_str(close_time)
    if start_time < open_time or end_time > close_time:
        return False, "Reservation must be during facility hours"
    reservations = db.query(models.Reservation).where(models.Reservation.court_id == reservation.court_id and models.Reservation.date == reservation.date).order_by(models.Reservation.start_time).all()
    for db_reservation in reservations:
        if db_reservation.end_time > start_time:
            if db_reservation.start_time < end_time:
                return False, "Reservation must not overlap with existing reservation"
            else:
                return True, ""
    return True, ""


def reserve_court(db: Session, reservation: schemas.ReservationCreate, user: schemas.User):
    db_reservation = models.Reservation(
        id = str(uuid4()),
        date = date_from_str(reservation.date),
        start_time = time_from_str(reservation.start_time),
        end_time = time_from_str(reservation.end_time),
        user_id = user.id,
        court_id = reservation.court_id,
        group_size = reservation.group_size,
        number_can_join = reservation.number_can_join_total,
        number_can_join_total = reservation.number_can_join_total,
    )
    db.add(db_reservation)
    db.commit()
    db.refresh(db_reservation)
    return db_reservation


def get_reservations_for_court(db: Session, court_id: str, date_str: str | None = None):
    query = db.query(models.Reservation).where(models.Reservation.court_id == court_id)
    if date_str:
        date_obj = date_from_str(date_str)
        query = query.where(models.Reservation.date == date_obj)
    return query.order_by(models.Reservation.date, models.Reservation.start_time).all()


def get_reservations_for_facility(db: Session, facility_id: str, date_str: str | None = None):
    courts = get_courts_for_facility(db=db, id=facility_id)
    if not courts:
        return []
    court_ids = [(models.Reservation.court_id == court.id) for court in courts]
    query = db.query(models.Reservation).where(or_(*court_ids))
    if date_str:
        date_obj = date_from_str(date_str)
        query = query.where(models.Reservation.date == date_obj)
    return query.order_by(models.Reservation.court_id, models.Reservation.date, models.Reservation.start_time).all()


def get_reservations_for_user(db: Session, user: schemas.User, date_str: str | None = None):
    query = db.query(models.Reservation).where(models.Reservation.user_id == user.id)
    if date_str:
        date_obj = date_from_str(date_str)
        query = query.where(models.Reservation.date == date_obj)
    return query.order_by(models.Reservation.date, models.Reservation.start_time).all()


def time_from_str(time_str: str):
    try:
        hour, minute = time_str.split(":")
        hour = int(hour)
        minute = int(minute)
        return time(hour, minute)
    except:
        raise HTTPException(status_code=400, detail="Invalid time string")


def str_from_time(time_obj: time):
    return time_obj.strftime("%H:%M")


def date_from_str(date_str: str):
    try:
        split_date = date_str.split('-')
        return date(int(split_date[0]), int(split_date[1]), int(split_date[2]))
    except:
        raise HTTPException(status_code=400, detail="Invalid date string")
