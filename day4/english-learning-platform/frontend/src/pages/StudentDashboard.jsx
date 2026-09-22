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
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-medium">Bienvenido, {data.display_name}</h2>
        <span className="text-sm text-gray-600">Nivel: {data.level}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded"><ProgressSummary progress={data.progress} /></div>
        <div className="p-4 border rounded"><TaskList tasks={data.tasks} /></div>
      </div>
      <div className="p-4 border rounded">
        <h3 className="text-lg font-medium">Materiales</h3>
        {data.materials.length===0? <p className="text-sm text-gray-600">No hay materiales</p>: (
          <ul className="list-disc pl-5">{data.materials.map(m=><li key={m.id}><strong>{m.title}</strong> ({m.assigned_level})</li>)}</ul>
        )}
      </div>
    </div>
  )
}
