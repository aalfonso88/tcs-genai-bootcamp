import React, {useState} from 'react'
import StudentDashboard from './pages/StudentDashboard'
import TeacherMaterials from './pages/TeacherMaterials'

export default function App(){
  const [role, setRole] = useState('student')
  return (
    <div>
      <h1>Plataforma de Inglés (Prototipo)</h1>
      <div style={{minHeight: '70vh'}}> 
        {role === 'student' ? <StudentDashboard /> : <TeacherMaterials />}
      </div>
      <footer style={{position:'fixed',right:10,bottom:10}}>
        <label>Rol: </label>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="student">Estudiante</option>
          <option value="teacher">Profesor</option>
        </select>
      </footer>
    </div>
  )
}
