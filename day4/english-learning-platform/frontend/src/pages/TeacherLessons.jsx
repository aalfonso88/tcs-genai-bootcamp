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
    <div>
      <h2>Lecciones (Profesor)</h2>
      <form onSubmit={create} aria-label="Formulario crear lección">
        <label htmlFor="lesson-title">Título</label>
        <input id="lesson-title" placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
        <label htmlFor="lesson-level">Nivel</label>
        <select id="lesson-level" value={level} onChange={e=>setLevel(e.target.value)}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <button type="submit">Programar</button>
      </form>
      <LessonsList lessons={lessons} onStart={start} />
    </div>
  )
}
