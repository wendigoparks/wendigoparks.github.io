from pydantic import BaseModel
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
    disabled: bool | None = None
    hashed_pswd: str | None = None

class ParkCreate(ParkBase):
    pass

class Park(ParkBase):
    class Config:
        orm_mode = True

class User(UserBase):
    class Config:
        orm_mode = True

class UserCreate(UserBase):
    password: str

    def __init__(self, username: str, password: str, email: str | None = None, full_name: str | None = None, disabled: bool = False):
        self.hashed_pswd = bcrypt.hash(password)

