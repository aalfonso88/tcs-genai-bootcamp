import React, {useEffect, useState} from 'react'
import api from '../services/api'

export default function StudentDashboard(){
  const [data, setData] = useState(null)

  useEffect(()=>{
    // demo: use student id 1
    api.get('/student/1/dashboard').then(r=>setData(r))
  },[])

  if(!data) return <div>Cargando...</div>

  return (
    <div>
      <h2>Bienvenido, {data.display_name}</h2>
      <p>Nivel: {data.level}</p>
      <div>
        <h3>Progreso</h3>
        <p>{data.progress.completed_units} unidades completadas — {data.progress.percent_complete}%</p>
      </div>
      <div>
        <h3>Tareas</h3>
        {data.tasks.length===0 ? <p>No hay tareas asignadas</p> : (
          <ul>{data.tasks.map(t=><li key={t.id}>{t.title} — {t.status}</li>)}</ul>
        )}
      </div>
      <div>
        <h3>Materiales</h3>
        {data.materials.length===0? <p>No hay materiales</p>: (
          <ul>{data.materials.map(m=><li key={m.id}>{m.title} ({m.assigned_level})</li>)}</ul>
        )}
      </div>
    </div>
  )
}
