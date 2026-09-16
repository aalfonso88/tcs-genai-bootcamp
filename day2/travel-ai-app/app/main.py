from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.routes.travel import router as travel_router

app = FastAPI(title="Travel AI")

app.include_router(travel_router)


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.get("/")
def serve_frontend():
    return FileResponse("app/static/index.html")

app.mount("/static", StaticFiles(directory="app/static", html=True), name="static")