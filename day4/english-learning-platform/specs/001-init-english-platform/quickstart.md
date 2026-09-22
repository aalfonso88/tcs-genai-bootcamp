# Quickstart: Init English Platform (prototype)

## Prerequisites

- Python 3.11
- Node 18+
- SQLite (bundled with Python)

## Backend (FastAPI)

1. Create and activate a virtual environment

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

2. Run the backend server

```bash
# from repo root
export PYTHONPATH=backend
uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
# If `uvicorn` is not on your PATH (pip --user installs), run it via the full binary path, e.g.
# /var/data/python/bin/uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

## Frontend (React + Vite)

1. Install dependencies and start dev server

```bash
cd frontend
npm install
./node_modules/.bin/vite
```

Note: Vite typically serves on `http://localhost:5173/`. If that port is busy, Vite will pick the next free port (e.g. `5174`).

2. Open browser at the Vite dev URL and use the demo role selector in the footer to switch between `Estudiante` and `Profesor` experiences. The UI language defaults to Spanish.

## Validation scenarios

- Open the student dashboard and verify profile, progress, tasks, and materials for each level (A/B/C).
- As teacher, create a learning material for level B and verify it appears for students of level B.
- Schedule a lesson and verify it appears in students' upcoming lessons list.
