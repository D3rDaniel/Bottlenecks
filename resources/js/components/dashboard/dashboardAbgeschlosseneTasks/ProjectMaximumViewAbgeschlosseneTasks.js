import React from 'react'

const ProjectMaximumViewAbgeschlosseneTasks = ({description, room, finish_comment}) => {
  return (
  <div className="flex bg-white rounded-xl -mt-5 shadow-bottom">
    <div className="ml-8 w-1/2 py-5">
        <h1 className="font-bold">Beschreibung</h1>
        <div>{description}</div>
    </div>
    <div className="w-1/2 p-3 ">
        <div className="h-1/2 px-3">
          <h3 className="font-bold">Raum</h3>
          <label>{room}</label>
        </div>
        <div className="h-1/2 px-3">
          <h3 className="font-bold">Abschlusskommentar</h3>
          <label>{finish_comment}</label>
        </div>
    </div>
  </div>
  )
}

export default ProjectMaximumViewAbgeschlosseneTasks