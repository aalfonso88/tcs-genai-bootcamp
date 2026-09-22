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
cd backend
uvicorn app.main:app --reload --port 8000
```

## Frontend (React + Vite)

1. Install dependencies and start dev server

```bash
cd frontend
npm install
npm run dev
```

2. Open browser at the Vite dev URL and use the demo role selector in the footer to switch between `student` and `teacher` experiences.

## Validation scenarios

- Open the student dashboard and verify profile, progress, tasks, and materials for each level (A/B/C).
- As teacher, create a learning material for level B and verify it appears for students of level B.
- Schedule a lesson and verify it appears in students' upcoming lessons list.
