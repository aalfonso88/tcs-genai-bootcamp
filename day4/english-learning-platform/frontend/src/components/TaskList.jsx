import React from 'react'

export default function TaskList({ tasks }){
  if(!tasks || tasks.length===0) return (
    <div>
      <h3>Tareas</h3>
      <p>No hay tareas asignadas</p>
    </div>
  )

  return (
    <div>
      <h3>Tareas</h3>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>{t.title} — {t.status}</li>
        ))}
      </ul>
    </div>
  )
}
