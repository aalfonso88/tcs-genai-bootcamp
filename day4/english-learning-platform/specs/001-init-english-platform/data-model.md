# Data Model

Entities derived from `spec.md` and basic fields.

- Student
  - id: integer
  - display_name: string
  - level: enum [A,B,C]

- Teacher
  - id: integer
  - display_name: string

- LearningMaterial
  - id: integer
  - title: string
  - description: string
  - content: text (markdown) OR content_url: string
  - assigned_level: enum [A,B,C]
  - created_at: datetime
  - updated_at: datetime

- Lesson
  - id: integer
  - title: string
  - level: enum [A,B,C]
  - scheduled_at: datetime (nullable)
  - duration_minutes: integer (optional)
  - join_url: string (optional placeholder)
  - status: enum [scheduled, live, completed, cancelled]

- Task
  - id: integer
  - title: string
  - description: string
  - material_id: integer (nullable)
  - due_date: date (nullable)
  - status: enum [todo, in_progress, done]

- ProgressRecord
  - id: integer
  - student_id: integer
  - material_id: integer
  - completed_units: integer
  - percent_complete: float
  - last_updated: datetime
