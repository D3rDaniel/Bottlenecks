import {React, useState, useEffect, useContext} from 'react'
import axios from 'axios'

import Searchbar from './searchbar/SearchBar'
import MinView from './RoomsMinView'

import CreateRoomButton from './CreateRoomButton'
import NewRoomPopup from './popup/NewRoomPopup'
import Loading from '../../../../images/icons/loading-spinner.png'
import RoomBookingPopup from './popup/RoomBookingPopup'
import UserContext from '../../../store/user-context'
import ProjectContext from '../../../store/project-context'

const dashboardRooms = (props) => {

  const user = useContext(UserContext)
  const project = useContext(ProjectContext)

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
    const [filtered, setFiltered] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomName, setRoomName] = useState()
    const [roomID, setRoomID] = useState()
    const [roomBookings, setRoomBookings] = useState([])
    const [refresh, setRefresh] = useState(false)

    const getData = () =>{
      setRefresh(false)
      setIsLoaded(false);
      const url = "http://127.0.0.1:8000/api/project/"+props.projectID+"/rooms";
  
      axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + props.token
        }
      })
        .then(function(response) {setIsLoaded(true);
          setRooms(response.data["rooms"]); 
          }).catch(function(error){
              console.log("error of getrooms: ", error)
              setIsLoaded(true)
              setError(true)})
    }

    useEffect(() => {
      getData()
    },[project, refresh] );

    const sortElements = (event, rotate) => {
      const IDTriggeredSortElement = event.target.id
      let orderedRooms;
      switch(IDTriggeredSortElement){
        case "0":
          if(rotate){
            orderedRooms = [...loadedRooms].sort((a,b) => (a.title > b.title) ? 1: ((b.title > a.title) ? -1 : 0))
          }else{
            orderedRooms = [...loadedRooms].sort((a,b) => (a.title > b.title) ? -1: ((b.title > a.title) ? 1 : 0))
          }
          break;
        case "1":
          if(rotate){
            orderedRooms = [...loadedRooms].sort((a,b) => (a.room_number > b.room_number) ? 1: ((b.room_number > a.room_number) ? -1 : 0))
          }else{
            orderedRooms = [...loadedRooms].sort((a,b) => (a.room_number > b.room_number) ? -1: ((b.room_number > a.room_number) ? 1 : 0))
          }
          break;
        case "2":
          if(rotate){
            orderedRooms = [...loadedRooms].sort((a,b) => (a.created_at > b.created_at) ? 1: ((b.created_at > a.created_at) ? -1 : 0))
          }else{
            orderedRooms = [...loadedRooms].sort((a,b) => (a.created_at > b.created_at) ? -1: ((b.created_at > a.created_at) ? 1 : 0))
          }
          break;
        case "3":
          if(rotate){
            orderedRooms = [...loadedRooms].sort((a,b) => (a.capacity > b.capacity) ? 1: ((b.capacity > a.capacity) ? -1 : 0))
          }else{
            orderedRooms = [...loadedRooms].sort((a,b) => (a.capacity > b.capacity) ? -1: ((b.capacity > a.capacity) ? 1 : 0))
          }
          break;
        default:
          return;
      }
      setRooms(orderedRooms)
    }

    const filterElements = (inputValue, filtered) => {
      setFiltered(filtered)
      let filteredRoomsBuffer
      filteredRoomsBuffer = [...loadedRooms].filter((room) => room.title.toLowerCase().includes(inputValue))
      setFilteredRooms(filteredRoomsBuffer)
    }

    const getRoomName = (data) => {
      setRoomName(data)
    }
    const getRoomID = (data) => {
      setRoomID(data)
    }
    const getRoomBookings = (data) => {
      console.log("bookings_data: ", data)
      setRoomBookings(data)
    }

      if (error) {
          return <div className="m-auto text-red font-bold">Es ist ein Fehler aufgetreten!</div> 
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
          <NewRoomPopup refresh={function(){setRefresh(true)}} trigger={popupTrigger} onClick={changePopupTriggerValue} project_id={props.projectID} getData={getData}/>
        </>
        )
    }else {

  return (
    <div className="flex flex-col w-full mx-1 my-2">
        <Searchbar filterElements={filterElements} sortElements={sortElements}/>

        <div className="h-full w-full">
        {
              filtered?
              filteredRooms.map((room, index) => {
                return (
                    <MinView
                        id={room.id}
                        changePopupTriggerValueBooking={changePopupTriggerValueBooking} 
                        room = {room}
                        key = {index}
                        token={props.token}
                        getRoomName={getRoomName}
                        getRoomID={getRoomID}
                        getData={getData}
                        getRoomBookings={getRoomBookings}
                    ></MinView>
                )
            })
              
              :
              loadedRooms.map((room, index) => {
                return (
                    <MinView
                        id={room.id}
                        changePopupTriggerValueBooking={changePopupTriggerValueBooking} 
                        room = {room}
                        key = {index}
                        token={props.token}
                        getRoomID={getRoomID}
                        getRoomName={getRoomName}
                        getData={getData}
                        getRoomBookings={getRoomBookings}
                    ></MinView>
                )
            })
            
            }
        </div>
        <div className="w-full flex justify-end">
            <CreateRoomButton popupTrigger={popupTrigger} onClick={changePopupTriggerValue} />  
        </div>
        <NewRoomPopup refresh={function(){setRefresh(true)}} trigger={popupTrigger} onClick={changePopupTriggerValue} />
        <RoomBookingPopup token={props.token} trigger={popupTriggerBooking} onClick={changePopupTriggerValueBooking} user_id={user.user_id} roomName={roomName} roomID={roomID} bookings={roomBookings}/>
    </div>
  )}
}

export default dashboardRooms