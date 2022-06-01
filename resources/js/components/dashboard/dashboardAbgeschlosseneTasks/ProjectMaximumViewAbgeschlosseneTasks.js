import React from 'react'

function ProjectMaximumViewAbgeschlosseneTasks (props) {
  return (
  <div className="flex bg-white rounded-xl -mt-5 shadow-bottom">
    <div className="ml-8 w-1/2 py-5">
        <h1 className="font-bold">{props.title}</h1>
        <div>{props.description}</div>
    </div>
    <div className="w-1/2 p-3 ">
        <div className="h-1/2 px-3">
          <h3 className="font-bold">Raum</h3>
          <label>{props.room}</label>
        </div>
        <div className="h-1/2 px-3">
          <h3 className="font-bold">Abschlusskommentar</h3>
          <label>{props.finish_comment}</label>
        </div>
    </div>
  </div>
  )
}

export default ProjectMaximumViewAbgeschlosseneTasks