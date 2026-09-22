import React from 'react'

export default function LessonsList({lessons, onStart}){
  if(!lessons || lessons.length===0) return (
    <div>
      <h3>Lecciones</h3>
      <p>No hay lecciones programadas</p>
    </div>
  )

  return (
    <div>
      <h3>Lecciones</h3>
      <ul>
        {lessons.map(l=> (
          <li key={l.id}>{l.title} — {l.level} — {l.status} {l.status==='scheduled' && <button onClick={()=>onStart(l.id)}>Iniciar</button>}</li>
        ))}
      </ul>
    </div>
  )
}
