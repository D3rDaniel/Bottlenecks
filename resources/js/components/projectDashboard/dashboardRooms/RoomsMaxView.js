import axios from 'axios'
import React, {useState} from 'react'

const RoomsMaxView = (props) => {

    const handleSubmit = (event) => {
        const url = "http://sl-vinf-bordbame.hof-university.de:80/api/room/"+props.room.id

        axios.delete(url, {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + props.token
            }
          })
          .then(res => {
            if(res.status == 200) {
                alert("Erfolgreich gelöscht")
                props.getData()
            }
            if(res.status == 401) alert("Keine Berechtigung")
          })
          .catch(error => console.log(error))
    }

    let city = props.room.address_info;
    let building = city.substring(0,city.indexOf(','));
    let helper = [...building].reverse().join("");
    helper = helper.substring(0,helper.indexOf(' '))
    let plz = [...helper].reverse().join("");
    city = city.replace(building+',', '');
    building = building.substring(0,building.length-helper.length)

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
                <label>{props.room.opened_on_weekends === "0" ? "Mo-Fr " : "Mo-So"}: {props.room.opening_time} - {props.room.closing_time} Uhr</label>
            </div>
        </div>

        <div className="w-1/4 mt-5 pb-5">
            <div className="font-bold">Zu finden:</div>
            <div>
               <label>Adresse: </label>
                <label>{city}</label> 
            </div>
            <div>
               <label>Stadt: </label>
                <label>{plz}</label> 
            </div>
            <div>
               <label>PLZ: </label>
                <label>{building}</label> 
            </div>
            <div>
            </div>
            <div>
               <label>Raum: </label>
                <label>{props.room.room_number}</label> 
            </div>
        </div>

        <div className="w-1/4 flex flex-col justify-end pb-5 items-end">
            <button className="bg-red h-8 w-28 rounded-xl text-white mr-12 hover:font-bold" onClick={handleSubmit}>Löschen</button>
        </div>        
    </div>
  )
}

export default RoomsMaxView