from pydantic import BaseModel, validator, Field
from passlib.hash import bcrypt


class UserBase(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    _disabled: bool = False
    hashed_pswd: str


class User(UserBase):
    id: int
    class Config:
        orm_mode = True


class UserCreate(UserBase):

    def __init__(self, username: str, hashed_pswd: str, email: str | None = None, full_name: str | None = None):
        super().__init__(username=username, email=email, full_name=full_name, hashed_pswd=bcrypt.hash(hashed_pswd))

class CourtBase(BaseModel):
    facility_id: str | None = None
    park_id: str | None = None
    name: str
    reservable: bool

class CourtCreate(CourtBase):
    pass

class Court(CourtBase):
    id: str
    class Config:
        orm_mode = True

class FacilityBase(BaseModel):
    name: str
    state: str | None = None
    county: str | None = None
    address: str | None = None
    latitude: str | None = None
    longitude: str | None = None
    description: str | None = None
    phone_nr: str | None = None
    type: str | None = None
    capacity: int | None = None
    image_url: str | None = None
    park_id: str | None = None

class FacilityCreate(FacilityBase):
    courts: list[CourtCreate] | None = None

class Facility(FacilityBase):
    id: str
    courts: list[Court] | None = None
    class Config:
        orm_mode = True

class ParkBase(BaseModel):
    name: str
    description: str | None = None
    state: str | None = None
    county: str | None = None
    address: str | None = None
    latitude: str | None = None
    longitude: str | None = None
    amenities: str | None = None
    phone_nr: str | None = None
    capacity: int | None = None
    image_url: str | None = None

class ParkCreate(ParkBase):
    facilities: list[FacilityCreate] | None = None
    class Config:
        schema_extra = {
            'example': {
                'name': 'Blacksburg Park with facilities and courts',
                'description': 'A new park with existing facilities and courts',
                'state': 'VA',
                'county': 'Montgomery County',
                'address': '123 Example Rd',
                'latitude': '37.2296 N',
                'longitude': '80.4139 W',
                'phone_nr': '(540)-555-1234',
                'facilities': [
                    {
                        'name': 'Park Tennis Courts',
                        'description': 'Tennis courts',
                        'type': 'tennis',
                        'capacity': 8,
                        'courts': [
                            {
                                'name': 'Tennis Court 1',
                                'reservable': True
                            },
                            {
                                'name': 'Tennis Court 2',
                                'reservable': False
                            }
                        ]
                    },
                    {
                        'name': 'Park Swimming Pool',
                        'description': 'Blacksburg park\'s swimming pool',
                        'address': '125 Example Rd',
                        'type': 'swimming',
                        'capacity': 50
                    }
                ]
            }
        }

class Park(ParkBase):
    id: str
    facilities: list[Facility] | None = None
    class Config:
        orm_mode = True

class ReservationBase(BaseModel):
    date: str
    start_time: str
    end_time: str
    user_id: int
    court_id: str
    group_size: int
    number_can_join: int
    number_can_join_total: int

class ReservationCreate(ReservationBase):
    pass

class Reservation(ReservationBase):
    id: str
    class Config:
        orm_mode = True

class ReservationJoinBase(BaseModel):
    user_id: int
    group_size: int
    reservation_joined: str

class ReservationJoinCreate(ReservationJoinBase):
    pass

class ReservationJoin(ReservationJoinBase):
    id: str
    class Config:
        orm_mode = True
