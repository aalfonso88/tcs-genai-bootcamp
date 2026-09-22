# API Contracts (sketch)

## Endpoints

### GET /api/student/{id}/dashboard
Returns student profile, progress, tasks, and materials for the student's level.

Response: 200
{
  "id": 1,
  "display_name": "Student Name",
  "level": "A",
  "progress": { "completed_units": 5, "percent_complete": 40.0 },
  "tasks": [ { "id": 1, "title": "Task 1", "status": "todo" } ],
  "materials": [ { "id": 10, "title": "Intro", "assigned_level": "A", "content_url": "url" } ]
}

### POST /api/teacher/materials
Create a new LearningMaterial. Body: { title, description, content, assigned_level }

Response: 201 Created with created resource

### GET /api/lessons?level=A
List scheduled and upcoming lessons for level A.

Response: 200
[
  { "id": 5, "title": "Lesson 1", "level": "A", "scheduled_at": "2026-10-01T10:00:00Z", "join_url": "url" }
]
