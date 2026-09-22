# Tasks: Init English Platform

**Input**: Design documents from `/specs/001-init-english-platform/`

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Initialize backend Python project and virtual environment at `backend/` (create `backend/requirements.txt`, `backend/app/__init__.py`)
- [ ] T002 Initialize frontend React (Vite) project at `frontend/` (create `frontend/package.json`, `frontend/src/App.jsx`)
- [ ] T003 Create repository README and update `specs/001-init-english-platform/quickstart.md` with exact commands and expected dev URLs

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T004 Create backend FastAPI app skeleton at `backend/app/main.py` and mount `/api` router
- [ ] T005 Define data models in `backend/app/models.py` for Student, Teacher, LearningMaterial, Lesson, Task, ProgressRecord according to `data-model.md`
- [ ] T006 Create SQLite database connection and simple migration script in `backend/app/db.py` (file path for DB: `backend/dev.db`)
- [ ] T007 Implement basic CRUD service layer scaffolding in `backend/app/crud.py` with stubs for materials, lessons, tasks, students
- [ ] T008 Implement a lightweight API client service in `frontend/src/services/api.js` to call backend endpoints (base URL `http://localhost:8000/api`)
- [ ] T009 Add logging and simple structured logs in `backend/app/main.py` (JSON or key=value lines) and error handling middleware in `backend/app/errors.py`

**Checkpoint**: After Phase 2, API endpoints and data models exist and developer can implement user stories independently.

---

## Phase 3: User Story 1 - Student dashboard (Priority: P1) 🎯 MVP

**Goal**: Deliver student dashboard showing profile, progress, tasks, and level-scoped materials.

**Independent Test**: Run backend and frontend locally, select `Student` in demo role selector, open `/student/dashboard` and verify data loads from `GET /api/student/{id}/dashboard`.

- [ ] T010 [US1] Implement backend endpoint `GET /api/student/{id}/dashboard` in `backend/app/api/student.py` returning profile, progress, tasks, and materials (match `contracts/api.md` schema)
- [ ] T011 [US1] Implement service function in `backend/app/crud.py` to assemble dashboard payload for a given student id
- [ ] T012 [US1] Create frontend page `frontend/src/pages/StudentDashboard.jsx` to render profile, progress summary, task list, and materials list
- [ ] T013 [US1] Add UI component `frontend/src/components/ProgressSummary.jsx` to display percent complete and completed units
- [ ] T014 [US1] Add UI component `frontend/src/components/TaskList.jsx` to list tasks and their statuses
- [ ] T015 [US1] Wire frontend API client (`frontend/src/services/api.js`) to call `GET /api/student/{id}/dashboard` and handle empty states
- [ ] T016 [US1] Add demo fixtures (sample students, tasks, materials) in `backend/fixtures/seed_data.py` and a `backend/scripts/load_seed.py` script for local testing

**Checkpoint**: Student dashboard fully functional and testable without other stories.

---

## Phase 4: User Story 2 - Teacher manages materials (Priority: P1)

**Goal**: Allow teachers to create, edit, and delete learning materials scoped by level.

**Independent Test**: As `Teacher` via demo selector, create a material for level B and verify it appears in `/api/materials?level=B` and in student dashboard for level B.

- [ ] T017 [US2] Implement backend endpoints for materials: `POST /api/teacher/materials`, `PUT /api/teacher/materials/{id}`, `DELETE /api/teacher/materials/{id}` in `backend/app/api/materials.py`
- [ ] T018 [US2] Implement CRUD functions in `backend/app/crud.py` for materials persistence and validation (required fields: title, assigned_level)
- [ ] T019 [US2] Create frontend page `frontend/src/pages/TeacherMaterials.jsx` with material creation/edit form and materials list
- [ ] T020 [US2] Add frontend component `frontend/src/components/MaterialEditor.jsx` and wire to API client for POST/PUT/DELETE
- [ ] T021 [US2] Validate required fields on frontend and show errors in `TeacherMaterials.jsx` (prevent publish with missing title or level)
- [ ] T022 [US2] Add integration check: created material is visible to students of the assigned level by verifying `GET /api/materials?level={level}`

**Checkpoint**: Teacher material management is functional and integrated with student views.

---

## Phase 5: User Story 3 - Teacher schedules or initiates video lessons (Priority: P2)

**Goal**: Teachers can schedule future lessons and start immediate lessons for a chosen level; students see upcoming lessons.

**Independent Test**: As `Teacher`, schedule a lesson for level A and confirm it appears in `GET /api/lessons?level=A` and in student upcoming lessons component.

- [ ] T023 [US3] Implement backend endpoints: `POST /api/lessons`, `GET /api/lessons?level={level}`, `POST /api/lessons/{id}/start` in `backend/app/api/lessons.py`
- [ ] T024 [US3] Implement persistence and status transitions for `Lesson` in `backend/app/crud.py` (scheduled -> live -> completed)
- [ ] T025 [US3] Create frontend page `frontend/src/pages/TeacherLessons.jsx` to schedule and start lessons
- [ ] T026 [US3] Create frontend component `frontend/src/components/LessonsList.jsx` to show upcoming lessons for a level and join button for live lessons
- [ ] T027 [US3] Wire join button to `lesson.join_url` placeholder; show appropriate empty-state message if no lessons scheduled

**Checkpoint**: Lesson scheduling and immediate start flows are operational and visible to students.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T028 [P] Update UI text and labels to Spanish across `frontend/src` files (initial release language per spec)
- [ ] T029 [P] Add accessibility checks to key views (StudentDashboard, TeacherMaterials, TeacherLessons) and fix keyboard navigation and semantic HTML in `frontend/src/components`
- [ ] T030 Update `specs/001-init-english-platform/quickstart.md` with any changed commands or ports
- [ ] T031 Create minimal README entries for `backend/` and `frontend/` with run instructions

---

## Dependencies & Execution Order

- Phase 1 (T001-T003) → must run first
- Phase 2 (T004-T009) → blocks all user stories until complete
- Phase 3 (T010-T016) → US1 (P1) MVP
- Phase 4 (T017-T022) → US2 (P1)
- Phase 5 (T023-T027) → US3 (P2)
- Phase 6 (T028-T031) → polish after stories

## Parallel Opportunities

- Tasks marked `[P]` can run in parallel (T003, T006, T009, T028)
- After Phase 2 completes, User Stories (Phase 3, 4, 5) can be implemented in parallel by different engineers

---

## Total tasks

- Total tasks listed: 31
- Per story: US1=7 tasks, US2=6 tasks, US3=5 tasks, Setup=3, Foundational=6, Polish=4

## Suggested MVP

- Implement Phase 1 + Phase 2 + Phase 3 (T001-T016). Deliver the Student dashboard as the minimal demonstrable MVP.

*** End of tasks.md
