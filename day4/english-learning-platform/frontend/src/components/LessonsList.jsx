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
      <h3 className="text-lg font-medium">Lecciones</h3>
      <ul className="mt-2 space-y-2">
        {lessons.map(l=> (
          <li key={l.id} className="flex justify-between items-center border rounded p-2">
            <div>
                <div className="font-medium">{l.title}</div>
                <div className="text-sm text-gray-400">{l.level} — {l.status}</div>
            </div>
            <div>
              {l.status==='scheduled' && <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={()=>onStart(l.id)}>Iniciar</button>}
              {l.status==='live' && <a className="text-blue-600" href={l.join_url || '#'} target="_blank" rel="noreferrer">Unirse</a>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
