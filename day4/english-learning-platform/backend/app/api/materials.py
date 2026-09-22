from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, constr

from ..crud import list_materials, create_material, delete_material

router = APIRouter(prefix="/api/materials")


class MaterialIn(BaseModel):
    title: constr(min_length=1)
    assigned_level: constr(min_length=1, max_length=1)
    description: str | None = None
    content: str | None = None
    content_url: str | None = None


@router.get("/")
def get_materials(level: str | None = None):
    return list_materials(level=level)


@router.post("/", status_code=status.HTTP_201_CREATED)
def post_material(payload: MaterialIn):
    try:
        mat = create_material(payload.title, payload.assigned_level, payload.description, payload.content, payload.content_url)
        return mat
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{material_id}")
def del_material(material_id: int):
    ok = delete_material(material_id)
    if not ok:
        raise HTTPException(status_code=404, detail="material not found")
    return {"ok": True}
