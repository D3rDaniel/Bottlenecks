import React from 'react'

const ProjectMaximumViewOffeneTasks = ({title, description, deadline}) => {
  return (
  <div className="flex bg-white rounded-xl -mt-5 shadow-bottom">
    <div className="ml-8 w-1/2 py-5">
        <h1 className="font-bold">{title}</h1>
        <div>{description}</div>
    </div>
      <div className="flex justify-center w-1/2 p-3 pt-8">
        <div className="w-1/2 h-1/2 px-3">
          <h3 className="font-bold">Deadline</h3>
          <label>{deadline}</label>
        </div>
        <div className="h-1/2 px-3">
          <h3 className="font-bold">Abgeschlossen am</h3>
          <label>offene Abgeschlossen? lol, müssen wir ändern</label>
        </div>
      </div>
      <div className="flex w-1/2 p-3 items-end">
        <div className='flex justify-between items-end'>
          <button className="bg-amber-500 w-36 h-6 px-3 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" >{/*<Link to='/project'>Öffnen</Link>*/}Bearbeiten</button>
          <button className="bg-red w-28 h-6 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" >{/*<Link to='/project'>Öffnen</Link>*/}Löschen</button>
        </div>
      </div>
        
  </div>
  )
}

export default ProjectMaximumViewOffeneTasks