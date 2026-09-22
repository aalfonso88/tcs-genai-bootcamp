from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, constr
from typing import Optional

from ..crud import create_lesson, list_lessons, start_lesson

router = APIRouter(prefix="/api/lessons")


class LessonIn(BaseModel):
    title: constr(min_length=1)
    level: constr(min_length=1, max_length=1)
    scheduled_at: Optional[str] = None
    duration_minutes: Optional[int] = None


@router.get("/")
def get_lessons(level: Optional[str] = None):
    return list_lessons(level=level)


@router.post("/", status_code=status.HTTP_201_CREATED)
def post_lesson(payload: LessonIn):
    try:
        lesson = create_lesson(payload.title, payload.level, scheduled_at=payload.scheduled_at, duration_minutes=payload.duration_minutes)
        return lesson
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{lesson_id}/start")
def start(lesson_id: int):
    lesson = start_lesson(lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="lesson not found")
    return lesson
