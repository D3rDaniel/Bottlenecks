import React from 'react'

import Searchbar from './searchbar/SearchBar'
import MinView from './RoomsMinView'

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

const dashboardRooms = () => {
  return (
    <div className="flex flex-col w-full mx-1 my-2">
        <Searchbar />

        <div className="h-full w-full">
            {rooms.map((room, index) => {
                return (
                    <MinView 
                        room = {room}
                        key = {index}
                    ></MinView>
                )
            })}
        </div>
    </div>
  )
}

export default dashboardRooms