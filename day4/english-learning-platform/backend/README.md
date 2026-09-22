# Backend — FastAPI

Quick start:

1. Create a virtual environment and install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

2. Run the backend (from repo root):

```bash
export PYTHONPATH=backend
# If `uvicorn` is not on your PATH, use the full binary path, e.g. /var/data/python/bin/uvicorn
uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
```

3. Seed demo data (idempotent):

```bash
export PYTHONPATH=backend
python backend/scripts/load_seed.py
```

Notes:
- SQLite DB file: `backend/dev.db`
- API base path: `/api`
