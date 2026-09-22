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
    <form onSubmit={submit}>
      <div>
        <label>Título</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} />
      </div>
      <div>
        <label>Nivel</label>
        <select value={level} onChange={e=>setLevel(e.target.value)}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>
      <div>
        <label>Descripción</label>
        <input value={description} onChange={e=>setDescription(e.target.value)} />
      </div>
      {error && <div style={{color:'red'}}>{error}</div>}
      <button type="submit">Crear</button>
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
    <div>
      <h2>Materiales (Profesor)</h2>
      <MaterialForm onCreate={onCreate} />
      <ul>
        {materials.map(m=> (
          <li key={m.id}>{m.title} ({m.assigned_level}) <button onClick={()=>remove(m.id)}>Eliminar</button></li>
        ))}
      </ul>
    </div>
  )
}
import React from 'react'

export default function TeacherMaterials(){
  return (
    <div>
      <h2>Gestión de materiales (Prototipo)</h2>
      <p>Interfaz mínima para crear/editar/eliminar materiales (por implementar)</p>
    </div>
  )
}
