from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import init_db
from .api.student import router as student_router

app = FastAPI(title="English Learning Platform - Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/")
def root():
    return {"status": "ok", "service": "english-learning-backend"}


app.include_router(student_router)
