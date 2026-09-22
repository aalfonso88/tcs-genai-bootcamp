# Sync Impact Report

Version change: 0.1.0 -> 0.2.0

Modified principles:

- Learner-First: simplified to focus on clear learning value and explicit project scope.
- Accessibility (A11y): retained with prototype-appropriate expectations.
- Privacy & Safety: simplified to data minimization; authentication remains out of scope.
- Quality & Testing: changed from mandatory test-first development to functional correctness and optional automated testing for the initial version.
- Observability & Versioning: replaced by Maintainable Architecture and Incremental Development to avoid unnecessary production-oriented requirements.

Added principles:

- Simplicity and Controlled Scope
- Maintainable Architecture
- Incremental Development

Removed/replaced sections:

- Production-oriented observability, SLOs, CI gating and mandatory review requirements were removed from the initial governance requirements.
- Production-level compliance requirements were reduced to prototype-appropriate constraints.

Constraints updated:

- React frontend
- Python backend
- SQLite persistence
- No authentication
- Simulated file uploads
- No unnecessary external services

Rationale:

The constitution was adjusted to align the governance principles with the educational purpose and deliberately limited scope of the first version of the project. The goal is to demonstrate Spec-Driven Development without introducing production-oriented complexity that is not required by the exercise.

---

# English Learning Platform Constitution

## Core Principles

### Learner-First

All product and engineering decisions MUST prioritize a clear and useful learning experience.

- Features MUST provide clear value to either learners or teachers.
- The first version MUST remain focused on the explicitly defined learning workflows.
- Functionality that is not required by the current specification SHOULD NOT be introduced unnecessarily.

### Simplicity and Controlled Scope

The project MUST prioritize simplicity, clarity, and a minimal viable implementation.

- The first version MUST be limited to the requirements defined in the specification.
- Technical solutions SHOULD favor simple and understandable implementations over premature optimization.
- The project MUST NOT introduce unnecessary infrastructure, integrations, authentication, scalability mechanisms, or production-oriented complexity.
- Future enhancements MAY be considered later, but MUST NOT expand the scope of the initial implementation.

### Accessibility and Usability

The application SHOULD provide a clear and accessible user experience.

- Interfaces SHOULD use semantic structure and clear navigation.
- The application SHOULD support responsive layouts for common desktop and mobile screen sizes.
- Interactive elements SHOULD provide clear labels and understandable feedback.
- Accessibility SHOULD be considered during implementation without introducing unnecessary complexity for the prototype.

### Privacy and Data Minimization

The application SHOULD avoid unnecessary collection or exposure of personal information.

- Only data required by the current functionality SHOULD be stored.
- Sensitive information MUST NOT be introduced unless explicitly required by the specification.
- Authentication and advanced authorization mechanisms are OUT OF SCOPE for the initial version.

### Maintainable Architecture

The application MUST maintain a clear separation between frontend and backend responsibilities.

- React SHOULD be responsible for the user interface and client-side interaction.
- Python SHOULD provide the backend API and application logic.
- SQLite SHOULD provide local persistence for the initial version.
- Components and modules SHOULD have clear and focused responsibilities.
- Technical decisions SHOULD favor readability and maintainability over abstraction for its own sake.

### Incremental Development

The project MUST be developed incrementally according to the Spec-Driven Development workflow.

- The specification defines WHAT the application should accomplish.
- The implementation plan defines HOW the specified functionality will be implemented.
- Tasks SHOULD be derived from the approved specification and implementation plan.
- Changes to requirements SHOULD be reflected in the corresponding specification and planning artifacts before implementation whenever practical.
- New functionality SHOULD NOT be added merely because it could be useful if it is outside the current scope.

### Quality and Testing

The initial version MUST prioritize functional correctness and a working end-to-end experience.

- Automated tests are NOT REQUIRED as part of the initial implementation unless explicitly introduced by a later specification or task.
- Core application logic SHOULD nevertheless be implemented in a way that allows testing to be introduced later.
- Manual verification of the main user workflows SHOULD be performed before considering the initial version complete.

## Constraints

- The initial version targets modern web browsers.
- The application MUST use React for the frontend.
- The application MUST use Python for the backend.
- SQLite MUST be used as the persistence mechanism for the initial version.
- Authentication is OUT OF SCOPE for the initial version.
- File uploads are simulated and do not require actual file-storage functionality.
- The implementation MUST remain restricted to the requirements defined in the current specification.
- External services SHOULD NOT be introduced unless they are explicitly required by the specification.

## Development Workflow

- Development follows the Spec-Driven Development workflow provided by Spec Kit.
- The main artifacts are the constitution, specification, implementation plan, tasks, and implementation.
- Each stage SHOULD be reviewed before moving to the next stage.
- The implementation SHOULD follow the approved specification and plan rather than introducing unrelated functionality.
- The project SHOULD remain small enough to understand as a learning example of Spec-Driven Development.

## Governance

Changes to this constitution SHOULD be made through the project's version-controlled Spec Kit constitution file.

- Changes MUST include a clear rationale.
- New principles or significant changes to existing principles SHOULD be reflected in the constitution version.
- The constitution SHOULD evolve only when the project's scope, objectives, or development methodology require it.

**Version**: 0.2.0  
**Ratified**: 2026-09-22  
**Last Amended**: 2026-09-22