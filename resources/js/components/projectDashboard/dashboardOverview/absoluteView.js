import React from 'react'

const absoluteView = (props) => {
  return (
    <div className="w-52 bg-white rounded-xl mt-3 drop-shadow-xl pl-2">
        <div className="font-bold">Aufgaben - absolut:</div>
        <div>Abgeschlossen: <label className="font-bold">{props.tasks.completed_tasks}</label></div>
        <div>in Bearbeitung: <label className="font-bold">{props.tasks["in-progress_tasks"]}</label></div>
        <div>Abgebrochen: <label className="font-bold">{props.tasks.failed_tasks}</label></div>
        <div>Pausiert: <label className="font-bold">{props.tasks.paused_tasks}</label></div>
    </div>
  )
}

export default absoluteView