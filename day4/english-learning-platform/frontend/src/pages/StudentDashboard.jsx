import React, {useEffect, useState} from 'react'
import api from '../services/api'
import ProgressSummary from '../components/ProgressSummary'
import TaskList from '../components/TaskList'

export default function StudentDashboard(){
  const [data, setData] = useState(null)

  useEffect(()=>{
    // demo: fetch first available student dynamically
    api.get('/student/').then(students=>{
      const id = (students && students.length>0) ? students[0].id : 1
      api.get(`/student/${id}/dashboard`).then(r=>setData(r))
    }).catch(()=> api.get('/student/1/dashboard').then(r=>setData(r)))
  },[])

  if(!data) return <div role="status" aria-live="polite">Cargando...</div>

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-medium">Bienvenido, {data.display_name}</h2>
        <span className="text-sm text-gray-400">Nivel: {data.level}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded bg-gray-800"><ProgressSummary progress={data.progress} /></div>
        <div className="p-4 border rounded bg-gray-800"><TaskList tasks={data.tasks} /></div>
      </div>
      <div className="p-4 border rounded bg-gray-800">
        <h3 className="text-lg font-medium">Materiales</h3>
        {data.materials.length===0? <p className="text-sm text-gray-600">No hay materiales</p>: (
          <ul className="list-disc pl-5">{data.materials.map(m=><li key={m.id}><strong>{m.title}</strong> ({m.assigned_level})</li>)}</ul>
        )}
      </div>
    </div>
  )
}
