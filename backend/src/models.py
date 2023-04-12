from sqlalchemy import Column, Date, ForeignKey, Integer, String, Time, MetaData, Computed, Sequence

from .database import Base


class Park(Base):
    __tablename__ = "parks"

    id = Column(String, primary_key=True)
    name = Column(String)
    state = Column(String)
    county = Column(String)
    latitude = Column(String)
    longitude = Column(String)
    description = Column(String)
    address = Column(String)
    amenities = Column(String)
    phone_nr = Column(String)
    capacity = Column(Integer)
    image_url = Column(String)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String)
    full_name = Column(String)
    disabled = Column(Integer)
    hashed_pswd = Column(String)
    admin = Column(Integer)

class Facility(Base):
    __tablename__ = "facilities"
    id = Column(String, primary_key=True)
    name = Column(String)
    state = Column(String)
    county = Column(String)
    address = Column(String)
    latitude = Column(String)
    longitude = Column(String)
    description = Column(String)
    phone_nr = Column(String)
    type = Column(String)
    capacity = Column(Integer)
    image_url = Column(String)
    park_id = Column(String, ForeignKey("parks.id"))

class Court(Base):
    __tablename__ = "courts"
    id = Column(String, primary_key=True)
    facility_id = Column(String, ForeignKey("facilities.id"))
    park_id = Column(String, ForeignKey("parks.id"))
    name = Column(String)
    reservable = Column(Integer)

class Reservation(Base):
    __tablename__ = "reservations"
    id = Column(String, primary_key=True)
    date = Column(Date)
    start_time = Column(Time)
    end_time = Column(Time)
    user_id = Column(Integer, ForeignKey("users.id"))
    court_id = Column(String, ForeignKey("courts.id"))
    group_size = Column(Integer)
    number_can_join = Column(Integer)
    number_can_join_total = Column(Integer)

class ReservationJoin(Base):
    __tablename__ = "reservations_joined"
    id = Column(String, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    group_size = Column(Integer)
    reservation_joined = Column(String, ForeignKey("reservations.id"))