from sqlmodel import Session, select
from .models import LearningMaterial, Student, Lesson, Task
from .db import engine


def get_student_dashboard(student_id: int):
    with Session(engine) as session:
        student = session.get(Student, student_id)
        if not student:
            return None
        # simple aggregates
        progress = {"completed_units": 0, "percent_complete": 0.0}
        tasks = session.exec(select(Task).where(Task.id == Task.id)).all()[:5]
        materials = session.exec(select(LearningMaterial).where(LearningMaterial.assigned_level == student.level)).all()
        return {
            "id": student.id,
            "display_name": student.display_name,
            "level": student.level,
            "progress": progress,
            "tasks": [ {"id": t.id, "title": t.title, "status": t.status} for t in tasks ],
            "materials": [ {"id": m.id, "title": m.title, "assigned_level": m.assigned_level, "content_url": m.content_url} for m in materials ]
        }
