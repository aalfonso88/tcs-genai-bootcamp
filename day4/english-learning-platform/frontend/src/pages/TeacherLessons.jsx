import React, {useEffect, useState} from 'react'
import LessonsList from '../components/LessonsList'

export default function TeacherLessons(){
  const [lessons, setLessons] = useState([])
  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('A')
  const [time, setTime] = useState('09:00')

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
      <form onSubmit={create} aria-label="Formulario crear lección" className="mt-3 grid grid-cols-3 gap-2 items-center">
        <input id="lesson-title" placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} className="border rounded px-2 py-1 col-span-1 bg-gray-700 text-gray-100" />
        <div>
          <label className="block text-sm">Classroom Level</label>
          <select id="lesson-level" value={level} onChange={e=>setLevel(e.target.value)} className="border rounded px-2 py-1 bg-gray-700 text-gray-100">
            <option value="A">Level A</option>
            <option value="B">Level B</option>
            <option value="C">Level C</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Hora</label>
          <select id="lesson-time" value={time} onChange={e=>setTime(e.target.value)} className="border rounded px-2 py-1 bg-gray-700 text-gray-100">
            {Array.from({length:10}).map((_,i)=>{
              const h=9+i; const v = (h<10? '0'+h : h)+':00'; return <option key={v} value={v}>{v}</option>
            })}
          </select>
        </div>
        <div className="col-span-3">
          <button type="submit" className="bg-sky-600 text-white px-3 py-1 rounded">Programar</button>
        </div>
      </form>
      <div className="mt-4"><LessonsList lessons={lessons} onStart={start} /></div>
    </div>
  )
}
