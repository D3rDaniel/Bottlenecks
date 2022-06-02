import axios from 'axios';
import React, {useEffect, useState} from 'react'
import InputField from '../../../forms/InputField';
import TextArea from '../../../forms/TextArea';

function RoomBookingPopup({trigger, onClick}) {

    const [date, setDate] = useState();
    const [room, setRoom] = useState();
    const [from, setFrom] = useState();
    const [to, setTo] = useState();

    const getDate = (data) => {setDate(data);}
    const getRoom = (data) => {setRoom(data);}
    const getFrom = (data) => {setFrom(data);}
    const getTo = (data) => {setTo(data);}

    const handleSubmit = (event) => {
        event.preventDefault();
        const booking = {
            room: room,
            date: date,
            from: from,
            to: to,
        }
        console.log(booking)
       /*
       const url = "http://127.0.0.1:8000/api/room/booking"; 
       axios.post(url, {booking})
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        */
    }
    

  return ( trigger) ? (
    <div className="w-screen h-screen rounded-lg bg-gray-400/[.7] fixed ">
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            
            <div className="w-full">
                <form className="bg-white shadow-md rounded-lg w-full px-10 pt-12 pb-14 mb-4 mx-20" onSubmit={handleSubmit}>
                <h3 className="items-center mb-6 text-5xl font-body">Raum buchen</h3>

                        <div className="flex justify-center items-center h-screen">
                            <div className="w-1/2 px-4">
                                <div className="mb-4"><DropDownSelect title={"Raum auswählen"} onChange={getRoom} options={["muss", "noch", "dynamisch", "geladen", "werden"]}/></div>
                                <div className="mb-4"><InputField  onChange={getDate} placeholder="Datum..."></InputField></div>
                                <div className="flex justify-center items-center">
                                    <div className="px-1"><InputField  onChange={getFrom} placeholder="Von..."></InputField></div>
                                    <div className="px-1"><InputField  onChange={getTo} placeholder="Bis..."></InputField></div>
                                </div>
                            </div>
                            <div className="w-1/2 px-4">
                                <TextArea  placeholder="Liste von Buchungen, welche noch dynamisch geladen werden müssen..."></TextArea>
                            </div>
                        </div>
                    
                    <div className="flex items-center justify-between">
                        <button onClick={onClick} className="bg-red hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="button">
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