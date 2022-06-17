import React from 'react'

function ProjectMaximumViewRaumbuchungen (props) {
  return (
    <div className='flex justify-center w-full bg-white -mt-2 shadow-bottom p-2'>
      <div className="flex justify-center w-11/12 mr-2">
      <div className="px-1 mr-3 w-2/4">
            <h1 className="font-bold pl-5">Beschreibung</h1>
            <div className="h-full w-full overflow-x-scroll overflow-y-hidden pl-5"><p>{props.description}</p></div>
        </div>
        <div className="px-1 mr-3 w-1/4">
            <div className="h-1/2 px-3 ">
              <h3 className="font-bold">Ausstattung:</h3>
              <label>{props.equipment_info}</label>
            </div>
            <div className="h-1/2 mb-2 px-3">
              <h3 className="font-bold">Öffnungszeiten:</h3>
              <label>{`${props.opening_time} - ${props.closing_time}`}</label>
            </div>
        </div>
        <div className='px-1 mr-3 w-1/4'>
          <h3 className="font-bold">Zu finden:</h3>
          <div className="flex flex-col px-1">
            <label>{props.address_info}</label>
          </div>
        </div>
    </div>
  <div className="w-1/12 pr-5 pt-5">
    <button className="bg-red hover:bg-blue-700 text-white font-bold py-2 px-2  rounded focus:outline-none focus:shadow-outline" type="button">
                      Buchung löschen
      </button>
  </div>
    </div>
  
  )
}

export default ProjectMaximumViewRaumbuchungen