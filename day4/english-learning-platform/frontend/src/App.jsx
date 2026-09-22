import React, {useState} from 'react'
import StudentDashboard from './pages/StudentDashboard'
import TeacherMaterials from './pages/TeacherMaterials'
import TeacherLessons from './pages/TeacherLessons'

export default function App(){
  const [role, setRole] = useState('student')
  return (
    <div>
        <h1>Plataforma de Inglés</h1>
      <div style={{minHeight: '70vh'}}> 
        {role === 'student' ? <StudentDashboard /> : (
          <div>
            <TeacherMaterials />
            <TeacherLessons />
          </div>
        )}
      </div>
      <footer style={{position:'fixed',right:10,bottom:10}}>
          <label htmlFor="role-select">Rol:</label>
          <select id="role-select" value={role} onChange={e=>setRole(e.target.value)} aria-label="Selector de rol">
          <option value="student">Estudiante</option>
          <option value="teacher">Profesor</option>
        </select>
      </footer>
    </div>
  )
}
