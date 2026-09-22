from fastapi import APIRouter, HTTPException
from ..crud import get_student_dashboard

router = APIRouter(prefix="/api/student")


@router.get("/{student_id}/dashboard")
def student_dashboard(student_id: int):
    data = get_student_dashboard(student_id)
    if not data:
        raise HTTPException(status_code=404, detail="Student not found")
    return data
