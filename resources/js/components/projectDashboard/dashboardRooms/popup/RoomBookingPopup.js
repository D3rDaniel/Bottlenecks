import axios from 'axios';
import React, {useEffect, useState} from 'react'
import TextArea from '../../../forms/TextArea';
import DropDownSelect from '../../../forms/DropDownSelect'



function RoomBookingPopup(props) {

    

    const [date, setDate] = useState();
    const [room, setRoom] = useState();
    const [from, setFrom] = useState("08:00:00");
    const [to, setTo] = useState("09:00:00");

    const getRoom = (data) => {setRoom(data);}

    const handleSubmit = (event) => {
        event.preventDefault();
        const booking = {
            room_id: 1,
            user_id: props.user_id,
            reservation_date: date,
            start_time: from+":00",
            end_time:to+":00"
        }
        console.log(booking)
       
       const url = "http://127.0.0.1:8000/api/bookings"; 
       axios.post(url, booking, {
        headers:{
        'Accept': 'application/json',
          'Authorization': 'Bearer ' + props.token
        }
       })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        
    }
    

  return ( props.trigger) ? (
    <div className="w-screen h-screen rounded-lg bg-gray-400/[.7] fixed ">
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            
            <div className="w-full h-2/3">
                <form className="bg-white shadow-md rounded-lg w-full px-10 pt-12 pb-14 mb-4 mx-20" onSubmit={handleSubmit}>
                <h3 className="items-center mb-6 text-5xl font-body">Raum buchen</h3>

                        <div className="flex justify-center items-center">
                            <div className="w-1/2 px-4">
                                <div className="mb-4">
                                    <DropDownSelect title={"Raum auswählen"} onChange={getRoom} options={["muss", "noch", "dynamisch", "geladen", "werden"]}/>
                                </div>
                                <div className="mb-4 flex justify-center items-center">
                                    <label className='p-2 mr-4'>Datum:</label>
                                    <input type="date" onChange={e => {setDate(e.target.value)}}></input>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="px-1">
                                        <label className='p-2 mr-2'>Von:</label>
                                        <input type="time" value={from} onChange={e => {setFrom(e.target.value)}}></input>
                                    </div>
                                    <div className="px-1">
                                        <label className='p-2 mr-2'>Bis:</label>
                                        <input type="time" value={to} onChange={e => {setTo(e.target.value)}}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 px-4">
                                <TextArea  placeholder="Liste von Buchungen, welche noch dynamisch geladen werden müssen..."></TextArea>
                            </div>
                        </div>
                    
                    <div className="flex items-center justify-between">
                        <button onClick={props.onClick} className="bg-red hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="button">
                        Abbruch
                        </button>
                        <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="submit">
                        Erstellen
                        </button>
                        
                        
                    </div>
                </form>
            </div>
        </div>
    </div>
  ) : "";
}

export default RoomBookingPopup