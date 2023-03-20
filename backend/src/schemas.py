from pydantic import BaseModel


class ParkBase(BaseModel):
    name: str
    description: str | None = None
    address: str | None = None
    amenities: str | None = None
    phone_nr: str | None = None
    capacity: int | None = None
    image_url: str | None = None

class ParkCreate(ParkBase):
    pass

class Park(ParkBase):
    class Config:
        orm_mode = True