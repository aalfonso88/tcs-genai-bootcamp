from typing import List, Optional
from sqlmodel import Session, select
from .models import LearningMaterial, Student, Lesson, Task, ProgressRecord
from .db import engine


def list_students() -> List[Student]:
    with Session(engine) as session:
        return session.exec(select(Student)).all()


def get_student(student_id: int) -> Optional[Student]:
    with Session(engine) as session:
        return session.get(Student, student_id)


def list_materials(level: Optional[str] = None) -> List[LearningMaterial]:
    with Session(engine) as session:
        q = select(LearningMaterial)
        if level:
            q = q.where(LearningMaterial.assigned_level == level)
        return session.exec(q).all()


def list_tasks_for_student(student_id: int) -> List[Task]:
    # Placeholder: return latest 10 tasks (to be refined)
    with Session(engine) as session:
        return session.exec(select(Task).limit(10)).all()


def get_progress_for_student(student_id: int) -> Optional[ProgressRecord]:
    with Session(engine) as session:
        rec = session.exec(select(ProgressRecord).where(ProgressRecord.student_id == student_id)).first()
        return rec


def get_student_dashboard(student_id: int):
    with Session(engine) as session:
        student = session.get(Student, student_id)
        if not student:
            return None

        progress_rec = get_progress_for_student(student_id)
        progress = {
            "completed_units": progress_rec.completed_units if progress_rec else 0,
            "percent_complete": progress_rec.percent_complete if progress_rec else 0.0,
        }

        tasks = list_tasks_for_student(student_id)
        materials = list_materials(level=student.level)

        return {
            "id": student.id,
            "display_name": student.display_name,
            "level": student.level,
            "progress": progress,
            "tasks": [{"id": t.id, "title": t.title, "status": t.status} for t in tasks],
            "materials": [
                {"id": m.id, "title": m.title, "assigned_level": m.assigned_level, "content_url": m.content_url}
                for m in materials
            ],
        }


# CRUD functions for materials (stubs)
def create_material(title: str, assigned_level: str, description: Optional[str] = None, content: Optional[str] = None, content_url: Optional[str] = None) -> LearningMaterial:
    # server-side validation
    if not title or not assigned_level:
        raise ValueError("title and assigned_level are required")
    if assigned_level not in ("A", "B", "C"):
        raise ValueError("assigned_level must be one of A, B, C")

    with Session(engine) as session:
        mat = LearningMaterial(title=title, assigned_level=assigned_level, description=description, content=content, content_url=content_url)
        session.add(mat)
        session.commit()
        session.refresh(mat)
        return mat


def delete_material(material_id: int) -> bool:
    with Session(engine) as session:
        mat = session.get(LearningMaterial, material_id)
        if not mat:
            return False
        session.delete(mat)
        session.commit()
        return True

