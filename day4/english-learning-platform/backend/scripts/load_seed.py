from sqlmodel import Session, select
from app.db import engine
from app.models import Student, Teacher, LearningMaterial, Task, Lesson
from datetime import datetime, timedelta


def seed():
    with Session(engine) as session:
        # idempotent students
        students = [
            {"display_name": "Alexis", "level": "A"},
            {"display_name": "Alumno Dos", "level": "B"},
        ]
        created = 0
        for s in students:
            exists = session.exec(select(Student).where(Student.display_name == s["display_name"])).first()
            if not exists:
                session.add(Student(display_name=s["display_name"], level=s["level"]))
                created += 1

        # idempotent materials
        materials = [
            {"title": "Introducción A", "description": "Material A", "assigned_level": "A"},
            {"title": "Introducción B", "description": "Material B", "assigned_level": "B"},
        ]
        for m in materials:
            exists = session.exec(
                select(LearningMaterial).where(LearningMaterial.title == m["title"]).where(LearningMaterial.assigned_level == m["assigned_level"])
            ).first()
            if not exists:
                session.add(LearningMaterial(title=m["title"], description=m.get("description"), assigned_level=m["assigned_level"]))
                created += 1

        # idempotent lessons with fake scheduled datetimes and one completed lesson
        now = datetime.utcnow()
        lessons = [
            {"title": "Clase de vocabulario A", "level": "A", "scheduled_at": (now + timedelta(days=1)).isoformat()},
            {"title": "Clase de gramática B", "level": "B", "scheduled_at": (now + timedelta(days=2, hours=2)).isoformat()},
            {"title": "Clase completada C", "level": "C", "scheduled_at": (now - timedelta(days=3)).isoformat(), "status": "completed"},
        ]
        for ls in lessons:
            exists = session.exec(select(Lesson).where(Lesson.title == ls["title"]).where(Lesson.level == ls["level"])) .first()
            if not exists:
                l = Lesson(title=ls["title"], level=ls["level"], scheduled_at=ls.get("scheduled_at"), status=ls.get("status", "scheduled"))
                session.add(l)
                created += 1

        if created > 0:
            session.commit()
            print(f"Seed: inserted {created} new rows")
        else:
            print("Seed: no changes; data already present")


if __name__ == '__main__':
    seed()
