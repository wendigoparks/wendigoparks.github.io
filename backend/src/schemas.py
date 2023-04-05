from pydantic import BaseModel, validator, Field
from passlib.hash import bcrypt


class ParkBase(BaseModel):
    name: str
    description: str | None = None
    address: str | None = None
    amenities: str | None = None
    phone_nr: str | None = None
    capacity: int | None = None
    image_url: str | None = None

class UserBase(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    _disabled: bool = False
    hashed_pswd: str


class ParkCreate(ParkBase):
    pass

class Park(ParkBase):
    class Config:
        orm_mode = True

class User(UserBase):
    id: int
    class Config:
        orm_mode = True


class UserCreate(UserBase):

    def __init__(self, username: str, hashed_pswd: str, email: str | None = None, full_name: str | None = None):
        super().__init__(username=username, email=email, full_name=full_name, hashed_pswd=bcrypt.hash(hashed_pswd))
