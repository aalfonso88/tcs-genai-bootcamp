import os

from dotenv import load_dotenv
from openai import OpenAI

from app.prompt import build_travel_prompt
from app.schemas import TravelPurpose, TravelResponse


load_dotenv()

client = OpenAI()

prompt = build_travel_prompt(
    first_city="Montevideo",
    second_city="La Paloma",
    purpose=TravelPurpose.GASTRONOMY,
)

response = client.responses.parse(
    model="gpt-5-mini",
    input=prompt,
    text_format=TravelResponse,
)

result = response.output_parsed

print(result)