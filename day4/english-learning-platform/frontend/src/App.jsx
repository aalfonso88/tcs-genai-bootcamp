import React, {useState} from 'react'
import StudentDashboard from './pages/StudentDashboard'
import TeacherTabs from './components/TeacherTabs'

export default function App(){
  const [role, setRole] = useState('student')
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">English Room</h1>
        </header>
        <main className="min-h-[60vh] bg-white rounded-md shadow-sm p-6">
          {role === 'student' ? <StudentDashboard /> : (
            <TeacherTabs />
          )}
        </main>
        <footer className="fixed right-6 bottom-6 bg-gray-800 p-3 rounded-md shadow flex items-center gap-2">
          <label htmlFor="role-select" className="mr-2">Rol:</label>
          <select id="role-select" value={role} onChange={e=>setRole(e.target.value)} aria-label="Selector de rol" className="border px-2 py-1 rounded bg-gray-700 text-gray-100">
            <option value="student">Estudiante</option>
            <option value="teacher">Profesor</option>
          </select>
        </footer>
      </div>
    </div>
  )
}
