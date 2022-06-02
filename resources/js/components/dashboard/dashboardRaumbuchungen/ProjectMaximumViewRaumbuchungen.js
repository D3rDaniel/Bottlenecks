import React from 'react'

function ProjectMaximumViewRaumbuchungen (props) {
  return (
    <div className='flex justify-center w-full bg-white rounded-xl shadow-bottom p-2'>
      <div className="flex justify-center w-11/12 mr-2">
        <div className="px-1 mr-3 w-2/4">
            <h1 className="font-bold">Beschreibung</h1>
            <div className="h-full w-full overflow-scroll">{props.description}</div>
        </div>
        <div className="px-1 mr-3 w-1/4">
            <div className="h-1/2 px-3 ">
              <h3 className="font-bold">Ausstattung:</h3>
              <label>{props.equipment}</label>
            </div>
            <div className="h-1/2 mb-2">
              <h3 className="font-bold">Öffnungszeiten:</h3>
              <label>{props.open_at}</label>
            </div>
        </div>
        <div className='px-1 mr-3 w-1/4'>
          <h3 className="font-bold">Zu finden:</h3>
          <div className="flex flex-col px-1">
            <label>Stadt:{props.full_address.city}</label>
            <label>PLZ:{props.full_address.plz}</label>
            <label>Adresse:{props.full_address.address}</label>
            <label>Gebäude:{props.full_address.building}</label>
            <label>Raum:{props.full_address.room}</label>
          </div>
        </div>
    </div>
  <div className="w-1/12">
    <button>Buchung löschen</button>
  </div>
    </div>
  
  )
}

export default ProjectMaximumViewRaumbuchungen