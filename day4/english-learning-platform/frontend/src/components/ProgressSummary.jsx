import React from 'react'

export default function ProgressSummary({ progress }){
  if(!progress) return (
    <div>
      <h3>Progreso</h3>
      <p>No hay datos de progreso</p>
    </div>
  )

  return (
    <div>
      <h3>Progreso</h3>
      <p>{progress.completed_units} unidades completadas — {progress.percent_complete}%</p>
    </div>
  )
}
