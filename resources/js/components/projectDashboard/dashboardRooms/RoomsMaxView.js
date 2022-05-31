import React, {useState} from 'react'

const RoomsMaxView = (props) => {
  return (
    <div className="flex bg-white rounded-xl -mt-5 shadow-bottom">
        <div className="w-1/4 ml-5 mt-5 pb-5">
    	    <div className="font-bold">Beschreibung:</div>
            <label className="mt-5">{props.room.description}</label>
        </div>

        <div className="w-1/4 mt-5 pb-5 ml-4 flex flex-col justify-between ">
            <div>
                <div className="font-bold">Ausstattung:</div>
                <label>{props.room.equipment_info}</label>
            </div>
            <div className="">
                <div className="font-bold">Öffnungszeiten:</div>
                <label>{props.room.time.openend_on_weekends === "0" ? "Mo-Fr " : "Mo-So"}: {props.room.time.opening_time} - {props.room.time.closing_time} Uhr</label>
            </div>
        </div>

        <div className="w-1/4 mt-5 pb-5">
            <div className="font-bold">Zu finden:</div>
            <div>
               <label>Stadt: </label>
                <label>{props.room.address_info.city}</label> 
            </div>
            <div>
               <label>PLZ: </label>
                <label>{props.room.address_info.plz}</label> 
            </div>
            <div>
               <label>Adresse: </label>
                <label>{props.room.address_info.address}</label> 
            </div>
            <div>
               <label>Gebäude: </label>
                <label>{props.room.address_info.appartment}</label> 
            </div>
            <div>
               <label>Raum: </label>
                <label>{props.room.room_number}</label> 
            </div>
        </div>

        <div className="w-1/4 flex flex-col justify-end pb-5 items-end">
            <button className="bg-red h-8 w-28 rounded-xl text-white mr-12 hover:font-bold">Verlassen</button>
        </div>        
    </div>
  )
}

export default RoomsMaxView