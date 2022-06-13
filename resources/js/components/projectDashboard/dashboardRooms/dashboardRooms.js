import {React, useState, useEffect} from 'react'

import Searchbar from './searchbar/SearchBar'
import MinView from './RoomsMinView'

import CreateRoomButton from './CreateRoomButton'
import NewRoomPopup from './popup/NewRoomPopup'
import Loading from '../../../../images/icons/loading-spinner.png'
import RoomBookingPopup from './popup/RoomBookingPopup'

const rooms = [
    {title : "Dösraum" , 
    room_number : "100" , 
    created_at : "11.05.2022" ,
    capacity : "20" , 
    equipment_info : "Bett" , 
    time : {opening_time : "12:00" , closing_time : "13:00" , openend_on_weekends : "0"} , 
    address_info : {city : "Hof" , plz : "95028" , address : "Hofstr. 1" , appartment : "B"} ,
    description : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At"} ,

    {title : "Actionraum" , 
    room_number : "223" , 
    created_at : "11.05.2022" ,
    capacity : "42" , 
    equipment_info : "Stühle" , 
    time : {opening_time : "12:00" , closing_time : "13:00" , openend_on_weekends : "1"} , 
    address_info : {city : "Naila" , plz : "12345" , address : "Hofstr. 1" , appartment : "A"} ,
    description : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At"} ,

    {title : "T-Raum" , 
    room_number : "666" , 
    created_at : "11.05.2022" ,
    capacity : "235" , 
    equipment_info : "Tafel" , 
    time : {opening_time : "12:00" , closing_time : "13:00" , openend_on_weekends : "0"} , 
    address_info : {city : "Bayreuth" , plz : "11111" , address : "Baystr. 1" , appartment : "C"} ,
    description : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At"}
]

const dashboardRooms = (props) => {

  const [popupTrigger, setPopupTrigger] = useState(false)
  const [popupTriggerBooking, setPopupTriggerBooking] = useState(false)
  const changePopupTriggerValue = () => {
    setPopupTrigger(!popupTrigger);
  }
  const changePopupTriggerValueBooking = () => {
    setPopupTriggerBooking(!popupTriggerBooking);
  }

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadedRooms, setRooms] = useState([]);

    useEffect(() => {
        setIsLoaded(false);
        const url = "http://127.0.0.1:8000/api/project/"+props.projectID+"/rooms";
        fetch(url, {
          headers: {
            'Accept': 'application/json',
          }
        })
          .then(response => response.json())
          .then((data) => {
            setIsLoaded(true);
            setRooms(data["rooms"]);
            },(error) =>{
              setIsLoaded(true);
              setError(error);
            }
          )
      }, []);

      if (error) {
        errormessage = error.message;
        if(error.message.includes("No rooms found")) errormessage = "Keine Räume gefunden";
          return <div className="m-auto text-red font-bold">Error: {errormessage}</div> 
      }else if(!isLoaded){
          return (<div className="m-auto flex flex-row">
          <img src={Loading} alt="loading" className='animate-spin h-5 w-5 mr-2 mt-0.5'/>
          <div className=" text-darkgray">Loading...</div>
        </div>)
      }else if(loadedRooms.length < 1){
        return (
        <>
          <div className="flex flex-col justify-center items-center w-full h-screen text-red font-bold">
            <h2>Keine Räume gefunden</h2>
            <CreateRoomButton popupTrigger={popupTrigger} onClick={changePopupTriggerValue} />  
          </div>
          <NewRoomPopup trigger={popupTrigger} onClick={changePopupTriggerValue} />
        </>
        )
    }else {

  return (
    <div className="flex flex-col w-full mx-1 my-2">
        <Searchbar />

        <div className="h-full w-full">
            {loadedRooms.map((room, index) => {
                return (
                    <MinView
                        changePopupTriggerValueBooking={changePopupTriggerValueBooking} 
                        room = {room}
                        key = {index}
                    ></MinView>
                )
            })}
        </div>
        <div className="w-full flex justify-end">
            <CreateRoomButton popupTrigger={popupTrigger} onClick={changePopupTriggerValue} />  
        </div>
        <NewRoomPopup trigger={popupTrigger} onClick={changePopupTriggerValue} />
        <RoomBookingPopup trigger={popupTriggerBooking} onClick={changePopupTriggerValueBooking} />
    </div>
  )}
}

export default dashboardRooms