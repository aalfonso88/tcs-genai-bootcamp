# Research: Init English Platform

Decisions and rationale for architecture and key unknowns.

## Decisions

- Backend: FastAPI with SQLite chosen for minimal setup and Python ecosystem familiarity.
- ORM/DB: Use SQLModel (built on SQLAlchemy + Pydantic) for concise models and easy serialization.
- Frontend: React with Vite for fast iteration and minimal config.
- Video lessons: Represented by `join_url` placeholders in `Lesson` records; full video integration deferred to later phases.

## Alternatives considered

- External video service (Zoom/Jitsi): rejected for v1 to avoid external dependencies and auth complexity.
- Serverless backend: rejected due to added deployment complexity; single FastAPI app is simpler for prototype.

## Open questions (resolved)

- Authentication: out of scope — role selector demo will simulate personas.
- Material storage: store content as markdown in DB (`content` field) and optionally reference local files by `content_url`.

## Recent spec updates

- Frontend UI language changed to Spanish; frontend components and sample data should use Spanish labels and text.

