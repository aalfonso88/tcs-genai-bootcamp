from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from .db import init_db
from .api.student import router as student_router
from .api.materials import router as materials_router
from .api.lessons import router as lessons_router
from .errors import AppError, http_exception_handler, generic_exception_handler


def setup_logging():
    logger = logging.getLogger()
    handler = logging.StreamHandler()
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(name)s %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)


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
    setup_logging()
    init_db()
    # register exception handlers
    app.add_exception_handler(AppError, http_exception_handler)
    app.add_exception_handler(Exception, generic_exception_handler)


@app.get("/")
def root():
    return {"status": "ok", "service": "english-learning-backend"}


app.include_router(student_router)
app.include_router(materials_router)
app.include_router(lessons_router)
