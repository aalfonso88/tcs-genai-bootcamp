# Implementation Plan: Init English Platform

**Branch**: `feat/progress-sdd-english-platform` | **Date**: 2026-09-22 | **Spec**: specs/001-init-english-platform/spec.md

**Input**: Feature specification from `/specs/001-init-english-platform/spec.md`

## Summary

Initial, minimal Spanish-language e-learning prototype focused on two personas: `student` and `teacher` supporting proficiency levels A, B, and C. Frontend will be a React (Vite) single-page app exposing role-based views via a demo role selector (no auth). Backend will be a minimal FastAPI service backed by SQLite for persistence. The system supports student dashboards (profile, progress, tasks, materials) and teacher flows to manage materials and schedule or start video lessons (represented by join URLs/placeholders). No authentication or external services are included in this iteration.

## Technical Context

**Language/Version**: Python 3.11 (backend), Node 18+ (frontend tooling)

**Primary Dependencies**:
- Backend: FastAPI, SQLModel (or SQLAlchemy + pydantic), Uvicorn for local dev
- Frontend: React (with Vite), React Router, components library optional (lightweight)

**UI Language**: Spanish (initial release). Ensure content and labels are written in Spanish in the frontend components and example data.

**Storage**: SQLite database file stored in the backend project; learning material content can be stored as text/markdown in the DB or as local files referenced by `content_url`.

**Testing**:
- Backend: pytest + HTTPX test client
- Frontend: Vitest + Testing Library (React) for component and integration tests

**Target Platform**: Linux/macOS development machines; backend runs as a local web service; frontend served by Vite during development and static build for production.

**Project Type**: Web application (separate `backend/` and `frontend/` projects)

**Performance Goals**: Prototype scale; no production performance targets are required for this iteration.

**Constraints**:
- No authentication or external integrations.
- Keep dependencies minimal and easy to install.
- Store all data locally in SQLite; avoid external services.

**Scale/Scope**: Small didactic prototype adequate for demos and local testing; not intended for high scale.

## Constitution Check

Gates evaluated against `.specify/memory/constitution.md`:

- Learner-First: PASS — spec prioritizes learner-facing dashboard and measurable outcomes.
- Accessibility (A11y): NOTE — UI designs should adhere to WCAG AA where feasible; include basic semantic markup and keyboard navigation in implementation tasks.
- Privacy & Safety: PASS — no PII required for v1; minimize stored personal data and document data handling.
- Quality & Test-First: PASS — plan includes unit and integration tests; CI gating recommended.
- Observability & Versioning: PASS (minimal) — plan includes structured logging and simple metrics hooks for critical flows.

No constitution violations detected that block Phase 0 research.

## Project Structure

Documentation (this feature)

```
specs/001-init-english-platform/
├── spec.md
├── plan.md            # this file
├── research.md        # Phase 0 output
├── data-model.md      # Phase 1 output
├── quickstart.md      # Phase 1 output
├── contracts/         # Phase 1 output
└── checklists/
    └── requirements.md
```

Source code (recommended layout)

```
backend/
├── app/
│   ├── main.py        # FastAPI app
│   ├── api/
│   ├── models.py
│   └── crud.py
├── tests/
└── requirements.txt

frontend/
├── src/
│   ├── App.jsx
│   ├── pages/
│   ├── components/
│   └── services/      # simple API client
├── index.html
└── package.json
```

**Structure Decision**: Adopt Option 2 (Web application) with separate `frontend/` and `backend/` folders to keep responsibilities clear and allow lightweight local development and builds. This matches the specified stack (React + FastAPI). Include a small demo-only role selector UI component in the frontend footer to toggle `student`/`teacher` personas as required by the spec.

## Complexity Tracking

No constitution gate violations requiring special approvals were identified. The design intentionally avoids external integrations and authentication to minimize complexity.

## Phase 0: Research Output (next)

See `research.md` for brief decisions and rationale.

