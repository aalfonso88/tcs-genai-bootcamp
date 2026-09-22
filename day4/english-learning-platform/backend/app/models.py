from typing import Optional
from enum import Enum
from datetime import datetime
from sqlmodel import SQLModel, Field


class Level(str, Enum):
    A = "A"
    B = "B"
    C = "C"


class Student(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    display_name: str
    level: Level


class Teacher(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    display_name: str


class LearningMaterial(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    content: Optional[str] = None
    content_url: Optional[str] = None
    assigned_level: Level
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class Lesson(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    level: Level
    scheduled_at: Optional[datetime] = None
    duration_minutes: Optional[int] = None
    join_url: Optional[str] = None
    status: Optional[str] = "scheduled"


class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    material_id: Optional[int] = None
    due_date: Optional[datetime] = None
    status: Optional[str] = "todo"


class ProgressRecord(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int
    material_id: int
    completed_units: int = 0
    percent_complete: float = 0.0
    last_updated: datetime = Field(default_factory=datetime.utcnow)
