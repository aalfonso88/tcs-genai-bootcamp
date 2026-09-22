import React, {useEffect, useState} from 'react'
import LessonsList from '../components/LessonsList'

export default function TeacherLessons(){
  const [lessons, setLessons] = useState([])
  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('A')

  useEffect(()=>{ fetchLessons() },[])

  async function fetchLessons(){
    const res = await fetch('http://localhost:8000/api/lessons')
    const json = await res.json()
    setLessons(json)
  }

  async function create(e){
    e.preventDefault()
    const res = await fetch('http://localhost:8000/api/lessons/', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({title, level})
    })
    if(res.ok){ const j = await res.json(); setLessons(prev=>[...prev,j]); setTitle('') }
    else { const txt = await res.text(); console.error('Error crear lección', txt) }
  }

  async function start(id){
    const res = await fetch(`http://localhost:8000/api/lessons/${id}/start`, { method: 'POST' })
    if(res.ok){ const j = await res.json(); setLessons(prev=>prev.map(p=>p.id===j.id?j:p)) }
  }

  return (
    <div className="p-4 border rounded bg-white">
      <h2 className="text-xl font-medium">Lecciones (Profesor)</h2>
      <form onSubmit={create} aria-label="Formulario crear lección" className="mt-3 flex gap-2 items-center">
        <input id="lesson-title" placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} className="border rounded px-2 py-1" />
        <select id="lesson-level" value={level} onChange={e=>setLevel(e.target.value)} className="border rounded px-2 py-1">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Programar</button>
      </form>
      <div className="mt-4"><LessonsList lessons={lessons} onStart={start} /></div>
    </div>
  )
}
