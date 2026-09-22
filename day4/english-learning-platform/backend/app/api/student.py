from fastapi import APIRouter, HTTPException
from ..crud import get_student_dashboard, list_students

router = APIRouter(prefix="/api/student")


@router.get("/{student_id}/dashboard")
def student_dashboard(student_id: int):
    data = get_student_dashboard(student_id)
    if not data:
        raise HTTPException(status_code=404, detail="Student not found")
    return data


@router.get("/")
def students_list():
    # return lightweight list of students for demo selection
    students = list_students()
    return [{"id": s.id, "display_name": s.display_name, "level": s.level} for s in students]
