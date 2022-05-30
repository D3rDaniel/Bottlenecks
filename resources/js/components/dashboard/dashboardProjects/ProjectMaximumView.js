import React from 'react'

const ProjectMaximumView = (props) => {
  return (
  <div className="flex bg-white rounded-xl -mt-5 shadow-bottom">
    <div className="ml-8 w-1/2 py-5">
        <h1 className="font-bold">{props.title}</h1>
        <div>{props.description}</div>
    </div>
    <div className="ml-auto mt-5 w-1/4">
    </div> 
    <button className="bg-red w-28 h-6 rounded-xl mr-12  mb-4 mt-auto text-white hover:font-bold drop-shadow-lg">Verlassen</button>
  </div>
  )
}

export default ProjectMaximumView