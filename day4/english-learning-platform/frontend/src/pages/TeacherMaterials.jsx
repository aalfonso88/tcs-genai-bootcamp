import React, {useEffect, useState} from 'react'
import api from '../services/api'

function MaterialForm({onCreate}){
  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('A')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)

  async function submit(e){
    e.preventDefault()
    if(!title){ setError('El título es obligatorio'); return }
    try{
      const res = await fetch('http://localhost:8000/api/materials/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, assigned_level: level, description})
      })
      if(!res.ok){ const txt = await res.text(); setError(txt); return }
      const json = await res.json()
      setTitle(''); setDescription(''); onCreate(json)
    }catch(err){ setError(String(err)) }
  }

  return (
    <form onSubmit={submit} aria-label="Formulario crear material" className="space-y-3">
      <div>
        <label htmlFor="mat-title" className="block text-sm font-medium">Título</label>
        <input id="mat-title" value={title} onChange={e=>setTitle(e.target.value)} aria-required="true" className="mt-1 block w-full border rounded px-2 py-1 bg-gray-700 text-gray-100" />
      </div>
      <div>
        <label htmlFor="mat-level" className="block text-sm font-medium">Classroom Level</label>
        <select id="mat-level" value={level} onChange={e=>setLevel(e.target.value)} className="mt-1 border rounded px-2 py-1 bg-gray-700 text-gray-100">
          <option value="A">Level A</option>
          <option value="B">Level B</option>
          <option value="C">Level C</option>
        </select>
      </div>
      <div>
        <label htmlFor="mat-desc" className="block text-sm font-medium">Descripción</label>
        <input id="mat-desc" value={description} onChange={e=>setDescription(e.target.value)} className="mt-1 block w-full border rounded px-2 py-1 bg-gray-700 text-gray-100" />
      </div>
      {error && <div role="alert" className="text-red-600">{error}</div>}
      <button type="submit" className="bg-sky-600 text-white px-3 py-1 rounded">Crear</button>
    </form>
  )
}

export default function TeacherMaterials(){
  const [materials, setMaterials] = useState([])

  useEffect(()=>{ fetchMaterials() },[])

  async function fetchMaterials(){
    const res = await fetch('http://localhost:8000/api/materials')
    const json = await res.json()
    setMaterials(json)
  }

  function onCreate(mat){
    setMaterials(prev=>[...prev, mat])
  }

  async function remove(id){
    await fetch(`http://localhost:8000/api/materials/${id}`, { method: 'DELETE' })
    setMaterials(prev=>prev.filter(m=>m.id!==id))
  }

  return (
    <div className="p-4 border rounded bg-gray-800">
      <h2 className="text-xl font-medium">Materiales</h2>
      <div className="mt-3"><MaterialForm onCreate={onCreate} /></div>
      <ul className="mt-4 space-y-2">
        {materials.map(m=> (
          <li key={m.id} className="flex justify-between items-center">
            <div><strong>{m.title}</strong> <span className="text-sm text-gray-400">({m.assigned_level})</span></div>
            <button aria-label={`Eliminar ${m.title}`} onClick={()=>remove(m.id)} className="text-sm text-red-400">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
