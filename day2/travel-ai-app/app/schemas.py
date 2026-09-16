from enum import Enum

from pydantic import BaseModel


class TravelPurpose(str, Enum):
    PHYSICAL_ACTIVITY = "physical_activity"
    ENTERTAINMENT = "entertainment"
    CULTURAL = "cultural"
    GASTRONOMY = "gastronomy"


class TravelRequest(BaseModel):
    first_city: str
    second_city: str
    purpose: TravelPurpose


class Place(BaseModel):
    name: str
    city: str
    description: str
    highlights: str
    suggestion: str | None


class TravelResponse(BaseModel):
    title: str
    country_name: str
    places: list[Place]