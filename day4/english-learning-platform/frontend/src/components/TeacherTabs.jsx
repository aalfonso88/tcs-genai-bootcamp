import React, {useState} from 'react'
import TeacherMaterials from '../pages/TeacherMaterials'
import TeacherLessons from '../pages/TeacherLessons'

export default function TeacherTabs(){
  const [tab, setTab] = useState('materials')
  return (
    <div>
      <div role="tablist" aria-label="Teacher sections" className="flex gap-2 mb-4">
        <button role="tab" aria-selected={tab==='materials'} onClick={()=>setTab('materials')}
          className={`px-3 py-1 rounded ${tab==='materials'? 'bg-sky-600 text-white':'bg-gray-800 text-gray-200'}`}>
          Materiales
        </button>
        <button role="tab" aria-selected={tab==='lessons'} onClick={()=>setTab('lessons')}
          className={`px-3 py-1 rounded ${tab==='lessons'? 'bg-sky-600 text-white':'bg-gray-800 text-gray-200'}`}>
          Lecciones
        </button>
      </div>

      <div className="space-y-4">
        {tab==='materials' ? <TeacherMaterials /> : <TeacherLessons />}
      </div>
    </div>
  )
}
