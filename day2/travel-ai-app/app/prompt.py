from app.schemas import TravelPurpose


PROMPT_TEMPLATE = """
You are a travel assistant.

Your task is to recommend interesting places to visit between two cities,
according to the purpose of the trip.

The user wants to travel between:
- First city: {first_city}
- Second city: {second_city}
- Trip purpose: {purpose}

Assume that both cities belong to the same country.

Identify the country and include its name in the "country_name" field.

If a city name contains an obvious spelling or typographical error
but the intended city can be reasonably inferred, treat it as the
correct city name.

If you cannot reasonably identify either city, even after considering
obvious spelling errors, return a dummy response with empty strings
for "title" and "country_name", and an empty "places" list.

If a city name is ambiguous and can refer to more than one location,
choose any reasonable interpretation.

Recommend up to 5 places that are relevant to the selected trip purpose.

For each place, provide:
- name: the name of the place
- city: the city where it is located
- description: a brief description
- highlights: the most relevant things to know about it
- suggestion: a useful suggestion for the visitor, or null if there is none

Also provide a short title for the recommendations.

Write the title, country_name and all descriptions in Spanish.

Return the result as JSON with this structure:

{{
  "title": "...",
  "country_name": "...",
  "places": [
    {{
      "name": "...",
      "city": "...",
      "description": "...",
      "highlights": "...",
      "suggestion": "..."
    }}
  ]
}}

Do not include any text outside the JSON.
"""


def build_travel_prompt(
    first_city: str,
    second_city: str,
    purpose: TravelPurpose,
) -> str:
    return PROMPT_TEMPLATE.format(
        first_city=first_city,
        second_city=second_city,
        purpose=purpose.value,
    )