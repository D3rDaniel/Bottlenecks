import React, {useState, useEffect} from 'react'

import Arrow from '../../../../images/icons/arrow-black.png'
import MaxView from './RoomsMaxView'
import BookingButton from './BookingButton'

const RoomsMinView = (props) => {

    const [popupTriggerBooking, setPopupTriggerBooking] = useState(false)
    const [roomBookings, setRoomBookings] = useState([])
    const changePopupTrigger = () => {
        props.getRoomName(props.room.title)
        props.getRoomID(props.room.id)
        props.changePopupTriggerValueBooking(!popupTriggerBooking)
        //laden der Buchungen pro Raum und Rückgabewert wird an Parent dashboardRooms übergeben, damit an PopuP RoomBooking übergebn werden kann
        props.getRoomBookings(roomBookings)
    }
    const getBookings = () =>{
        const urlBookings = "http://127.0.0.1:8000/api/room/"+props.room.id+"/bookings"; 

        axios.get(urlBookings, {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + props.token
            }
          })
            .then(function(response) {
                setRoomBookings(response.data.bookings); 
              }).catch(function(response){
                  console.log("error: ", response)})
    }
    useEffect(() =>{
        getBookings()
    },[])

    const [rotate, setRotate] = useState(0);

    const rotateArrow = () => { rotate ? setRotate(false) : setRotate(true) }

    return (
    <div className="my-5 ">
        <div className={`flex h-14 bg-white ${rotate ? null : "drop-shadow-md"} rounded-xl items-center`} >

            <div className="flex justify-around w-4/5 items-center">
                <div className="w-1/6 pl-2">{props.room.title}</div>
                <div className="w-1/6 pl-2">{props.room.room_number}</div>
                <div className="w-1/6 pl-2">{props.room.created_at.substring(0,10)}</div>
                <div className="w-1/6 pl-22">{props.room.capacity}</div>
            </div>
            <div className='w-1/5'>
                <BookingButton  className="mr-5" onClick={changePopupTrigger}/>
            </div>

            <div className="flex  my-auto">
                <img src={Arrow} alt="maxView" className={`h-7 w-7 mr-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>
            </div>
        </div>
        {rotate ? <MaxView room={props.room} token={props.token} getData={props.getData}></MaxView> : null}
    </div>
    )
}

export default RoomsMinView