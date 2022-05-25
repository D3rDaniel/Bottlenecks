import React from 'react'

const ProjectMaximumView = ({description}) => {
  return (
  <div className="flex bg-white rounded-xl -mt-5 shadow-bottom">
    <div className="ml-8 w-1/2 py-5">
        <h1 className="font-bold">Beschreibung</h1>
        <div>{description}</div>
    </div>
  </div>
  )
}

export default ProjectMaximumView