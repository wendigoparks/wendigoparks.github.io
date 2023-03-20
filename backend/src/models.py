from sqlalchemy import Column, Integer, String

from .database import Base


class Park(Base):
    __tablename__ = "parks"

    name = Column(String, primary_key=True)
    description = Column(String)
    address = Column(String)
    amenities = Column(String)
    phone_nr = Column(String)
    capacity = Column(Integer)
    image_url = Column(String)
