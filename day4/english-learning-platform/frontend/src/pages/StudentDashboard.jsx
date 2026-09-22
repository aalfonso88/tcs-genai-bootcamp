import React, {useEffect, useState} from 'react'
import api from '../services/api'
import ProgressSummary from '../components/ProgressSummary'
import TaskList from '../components/TaskList'

export default function StudentDashboard(){
  const [data, setData] = useState(null)

  useEffect(()=>{
    // demo: use student id 1
    api.get('/student/1/dashboard').then(r=>setData(r))
  },[])

  if(!data) return <div role="status" aria-live="polite">Cargando...</div>

  return (
    <div>
      <h2>Bienvenido, {data.display_name}</h2>
      <p>Nivel: {data.level}</p>
      <ProgressSummary progress={data.progress} />
      <TaskList tasks={data.tasks} />
      <div>
        <h3>Materiales</h3>
        {data.materials.length===0? <p>No hay materiales</p>: (
          <ul>{data.materials.map(m=><li key={m.id}><strong>{m.title}</strong> ({m.assigned_level})</li>)}</ul>
        )}
      </div>
    </div>
  )
}
