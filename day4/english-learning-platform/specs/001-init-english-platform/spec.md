# Feature Specification: Init English Platform

**Feature Branch**: `feat/progress-sdd-english-platform`

**Created**: 2026-09-22

**Status**: Draft

**Input**: User description: "Create the initial version of an English e-learning platform for teachers and students. The platform supports English levels A through C, with role-based experiences for teachers and students. Students can view their profile, learning progress, tasks and materials, while teachers can manage learning materials and initiate or schedule video lessons for a specific English level. The initial version should remain limited to these requirements and should not include authentication or features beyond the described scope. GIT_BRANCH_NAME=feat/progress-sdd-english-platform"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Student dashboard (Priority: P1)

A student can view their profile, learning progress, assigned tasks, and available learning materials for their English level (A, B, or C).

**Why this priority**: Direct learner benefit — core value proposition for students.

**Independent Test**: As a student with level A/B/C, open the dashboard and verify profile, progress chart, task list, and available materials are visible and correspond to the selected level.

**Acceptance Scenarios**:

1. **Given** a student assigned to level A, **When** they open the dashboard, **Then** they see their name, current level, progress summary (completed units, percent complete), and a list of tasks and materials for level A.
2. **Given** a student with no tasks assigned, **When** they view tasks, **Then** the UI indicates "No tasks assigned" and shows recommended materials for their level.
3. **Given** the application is running without authentication, **When** the user selects "Student" in the demonstration role selector, **Then** the application displays the student experience and its available functionality.

---

### User Story 2 - Teacher manages materials (Priority: P1)

A teacher can upload or remove learning materials scoped to a specific English level (A, B, or C).

**Why this priority**: Enables content authoring required for learning delivery.

**Independent Test**: As a teacher, upload a new material for level B and verify it appears in the materials list for level B and is accessible to students of level B.

**Acceptance Scenarios**:

1. **Given** a teacher on the materials page, **When** they create a material with title and content and assign it to level C, **Then** the material appears in level C materials and is listed for students in level C.
2. **Given** an existing material, **When** the teacher deletes it, **Then** it is no longer visible to students.
3. **Given** the application is running without authentication, **When** the user selects "Teacher" in the demonstration role selector, **Then** the application displays the teacher experience and its available functionality.

---

### User Story 3 - Teacher schedules or initiates video lessons (Priority: P2)

A teacher can schedule or immediately start a video lesson for learners of a chosen level (A, B, or C). Scheduling creates an entry visible to students for that level.

**Why this priority**: Supports synchronous teaching; scheduling enables planning.

**Independent Test**: As a teacher, schedule a video lesson for level A and verify it appears in the level A calendar/list for students.

**Acceptance Scenarios**:

1. **Given** a teacher schedules a lesson for level B on 2026-10-01 10:00, **When** students of level B view upcoming lessons, **Then** the scheduled lesson is listed with date/time and join button.
2. **Given** a teacher starts an immediate lesson, **When** students join during the scheduled window, **Then** they see the lesson entry and join control.

---

### Edge Cases

- A student is assigned to an unsupported level (not A/B/C): show an error message and prompt to contact the teacher.
- A teacher schedules overlapping lessons for the same level: system warns and requires confirmation.
- Materials with missing content fields: UI prevents publishing until required fields are completed.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide separate experiences for `student` and `teacher` personas. Authentication is out of scope for this initial version, and the active persona is selected through the temporary demonstration role selector defined in FR-009.
- **FR-002**: Students MUST be able to view their profile information and current English level (A/B/C).
- **FR-003**: Students MUST be able to view a learning progress summary (percent complete, completed units) scoped to their level.
- **FR-004**: Students MUST be able to view assigned tasks and access learning materials for their level.
- **FR-005**: Teachers MUST be able to upload and remove learning materials and assign them to a specific level (A/B/C).
- **FR-006**: Teachers MUST be able to schedule a future video lesson and initiate an immediate lesson for a chosen level; scheduled lessons MUST be visible to students of that level.
- **FR-007**: The system MUST provide clear UI feedback for empty states (no tasks, no upcoming lessons, no materials).
- **FR-008**: All user-facing texts and labels MUST be provided in Spanish for the initial release.
- **FR-009**: The application MUST provide a temporary demonstration role selector in the footer that allows switching between the student and teacher experiences without authentication. Changing the selected role MUST dynamically update the available navigation and functionality to reflect the selected role. The role selector is a demonstration mechanism only and MUST NOT be considered an authentication or authorization mechanism.

### Key Entities *(include if feature involves data)*

- **Student**: display name, level (A/B/C), progress summary (completed_units, percent_complete), assigned_tasks.
- **Teacher**: display name, managed_levels, authored_materials, scheduled_lessons.
- **LearningMaterial**: id, title, description, content_url or body, assigned_level, created_at, updated_at.
- **Lesson**: id, title, level, scheduled_at (nullable for immediate lessons), status.
- **Task**: id, title, description, material_id (optional), due_date (optional), status.
- **ProgressRecord**: student_id, material_id, completed_units, last_updated.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A student can access their dashboard and see profile, progress, tasks, and materials for their assigned level within 3 clicks (or screen views).
- **SC-002**: Teachers can create and publish a learning material for a chosen level and it becomes visible to students of that level within one minute.
- **SC-003**: Teachers can schedule a lesson and it appears on students' upcoming lessons list for the specified level.

## Assumptions

- Authentication and account creation are explicitly out of scope for this initial version; the environment provides user identity and role for UI rendering.
- The platform will initially support English levels A, B, and C only.
- Video lesson handling is represented via join button; full video conferencing integration is out of scope for v1.
- Internationalization beyond Spanish is out of scope for the initial release.
