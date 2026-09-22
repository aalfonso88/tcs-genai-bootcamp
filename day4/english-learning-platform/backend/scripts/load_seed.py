from sqlmodel import Session
from app.db import engine
from app.models import Student, Teacher, LearningMaterial, Task


def seed():
    with Session(engine) as session:
        # create sample students
        s1 = Student(display_name="Alumno Uno", level="A")
        s2 = Student(display_name="Alumno Dos", level="B")
        session.add(s1)
        session.add(s2)
        # sample materials
        m1 = LearningMaterial(title="Introducción A", description="Material A", assigned_level="A")
        m2 = LearningMaterial(title="Introducción B", description="Material B", assigned_level="B")
        session.add(m1)
        session.add(m2)
        session.commit()
        print("Seed data inserted")


if __name__ == '__main__':
    seed()
