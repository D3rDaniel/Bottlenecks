import React from 'react'

const ProjectMaximumView = () => {
  return (
  <div className="flex bg-white rounded-xl -mt-5 shadow-bottom">
    <div className="ml-8 w-1/2 py-5">
        <h1 className="font-bold">Projekt-Titel</h1>
        <div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
    </div>
    <div className="ml-auto mt-5 w-1/4">
        <h1 className="font-bold">Personen:</h1>
        <div>Person 1, Person 2, Person 3</div>
    </div> 
    <button className="bg-red w-28 h-6 rounded-xl mr-12  mb-4 mt-auto text-white hover:font-bold drop-shadow-lg">Verlassen</button>
  </div>
  )
}

export default ProjectMaximumView