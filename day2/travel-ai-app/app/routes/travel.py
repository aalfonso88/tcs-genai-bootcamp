from dotenv import load_dotenv
from fastapi import APIRouter
from openai import OpenAI

from app.prompt import build_travel_prompt
from app.schemas import TravelRequest, TravelResponse


load_dotenv()

router = APIRouter()

client = OpenAI()


@router.post("/api/recommendations", response_model=TravelResponse)
def get_recommendations(request: TravelRequest):
    prompt = build_travel_prompt(
        first_city=request.first_city,
        second_city=request.second_city,
        purpose=request.purpose,
    )

    response = client.responses.parse(
        model="gpt-5-mini",
        input=prompt,
        text_format=TravelResponse,
    )

    return response.output_parsed