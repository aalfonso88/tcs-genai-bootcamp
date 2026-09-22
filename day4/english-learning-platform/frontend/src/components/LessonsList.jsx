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
      <h3 className="text-lg font-medium text-slate-100">Lecciones</h3>
      <ul className="mt-2 space-y-2">
        {lessons.map(l=> (
          <li key={l.id} className="flex justify-between items-center border rounded p-2 bg-slate-700">
            <div>
                <div className="font-medium text-slate-100">{l.title}</div>
                <div className="text-sm text-slate-300">{l.level} — {l.status}{l.scheduled_at ? ` — ${new Date(l.scheduled_at).toLocaleString()}` : ''}</div>
                {l.status==='completed' && <div className="text-sm text-emerald-300 mt-1">Completada ✓</div>}
            </div>
            <div>
              {l.status==='scheduled' && <button className="bg-teal-500 text-slate-900 px-2 py-1 rounded hover:opacity-90 transition" onClick={()=>onStart(l.id)}>Iniciar</button>}
              {l.status==='live' && <a className="text-teal-300 hover:underline" href={l.join_url || '#'} target="_blank" rel="noreferrer">Unirse</a>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
