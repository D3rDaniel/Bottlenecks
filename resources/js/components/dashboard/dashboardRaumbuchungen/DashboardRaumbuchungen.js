import React, {useState} from 'react'
import ProjectMinimumViewRaumbuchungen from './ProjectMinimumViewRaumbuchungen'
import SearchBarRaumbuchungen from './searchbar/SearchBarRaumbuchungens'

const buchungen = [
  {roomname: "Bücherrei", roomnumber: "019", created_at: "12.04.2022", roomsize: "12", day_of_booking: "04.06.2022", period: "12:00 - 14:00", 
  description: "blablaafohasfhadsfhdafjadsöfhdasöfhdaöfhdöafhadsofjködhfaoödfhaööööööööööööööööakdhfodhfköadhfadhfködashfödhgöiadfhgöiadfhad adökfhadsöofh aöfhoöadshf öasodfh ödas f.  ! ladfh öakdsfhaös hf.",
  equipment: "beamer", open_at:"Mo-Fr 9-12", 
  full_address: {city: "Hof", plz: "95028", address: "Alfons-Goppel-Platz 1", building: "B", room: "019"}}
]

function DashboardRaumbuchungen() {

  const [loadedRooms, setRooms] = useState([])
  const [filtered, setFiltered] = useState(false)
  const [filteredRooms, setFilteredRooms] = useState([])

  const sortElements = (event, rotate) =>{
    const IDTriggeredSortElement = event.target.id
    let orderedRooms;
    switch(IDTriggeredSortElement){
      case "0":
        if(rotate){
          orderedRooms = [...loadedRooms].sort((a,b) => (a.roomname > b.roomname) ? 1: ((b.roomname > a.roomname) ? -1 : 0))
        }else{
          orderedRooms = [...loadedRooms].sort((a,b) => (a.roomname > b.roomname) ? -1: ((b.roomname > a.roomname) ? 1 : 0))
        }
        break;
      case "1":
        if(rotate){
          orderedRooms = [...loadedRooms].sort((a,b) => (a.roomnumber > b.roomnumber) ? 1: ((b.roomnumber > a.roomnumber) ? -1 : 0))
        }else{
          orderedRooms = [...loadedRooms].sort((a,b) => (a.roomnumber > b.roomnumber) ? -1: ((b.roomnumber > a.roomnumber) ? 1 : 0))
        }
        break;
      case '2':
        if(rotate){
          orderedRooms = [...loadedRooms].sort((a,b) => (a.created_at > b.created_at) ? 1: ((b.created_at > a.created_at) ? -1 : 0))
        }else{
          orderedRooms = [...loadedRooms].sort((a,b) => (a.created_at > b.created_at) ? -1: ((b.created_at > a.created_at) ? 1 : 0))
        }
        break;
      case '3':
        if(rotate){
          orderedRooms = [...loadedRooms].sort((a,b) => (a.roomsize > b.roomsize) ? 1: ((b.roomsize > a.roomsize) ? -1 : 0))
        }else{
          orderedRooms = [...loadedRooms].sort((a,b) => (a.roomsize > b.roomsize) ? -1: ((b.roomsize > a.roomsize) ? 1 : 0))
        }
        break;
      case '4':
        if(rotate){
          orderedRooms = [...loadedRooms].sort((a,b) => (a.day_of_booking > b.day_of_booking) ? 1: ((b.day_of_booking > a.day_of_booking) ? -1 : 0))
        }else{
          orderedRooms = [...loadedRooms].sort((a,b) => (a.day_of_booking > b.day_of_booking) ? -1: ((b.day_of_booking > a.day_of_booking) ? 1 : 0))
        }
        break;
      case '5':
        if(rotate){
          orderedRooms = [...loadedRooms].sort((a,b) => (a.period > b.period) ? 1: ((b.period > a.period) ? -1 : 0))
        }else{
          orderedRooms = [...loadedRooms].sort((a,b) => (a.period > b.period) ? -1: ((b.period > a.period) ? 1 : 0))
        }
        break;
      default:
        console.log("default- shit")
    }
    setRooms(orderedRooms)
  }
  const filterElements = (inputValue, filtered) =>{
    setFiltered(filtered)
    let filteredRoomsBuffer
    filteredRoomsBuffer = [...loadedRooms].filter((room) => room.title.toLowerCase().includes(inputValue))
    setFilteredRooms(filteredRoomsBuffer)
  }
  return (
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBarRaumbuchungen sortElements={sortElements} filterElements={filterElements} />
        
        <div className='h-full w-full'>
           {
             /* filtered ? 

             filteredRooms.map((booking, index) => {
             return(
              <ProjectMinimumViewRaumbuchungen
              roomname={booking.roomname}
              roomnumber={booking.roomnumber}
              created_at={booking.created_at}
              roomsize={booking.roomsize}
              day_of_booking={booking.day_of_booking}
              period={booking.period}
              description={booking.description}
              equipment={booking.equipment}
              open_at={booking.open_at}
              full_address={booking.full_address}
              key={index} >
              </ProjectMinimumViewRaumbuchungen>
             )
           })

           :   */

             buchungen.map((booking, index) => {
             return(
              <ProjectMinimumViewRaumbuchungen
              roomname={booking.roomname}
              roomnumber={booking.roomnumber}
              created_at={booking.created_at}
              roomsize={booking.roomsize}
              day_of_booking={booking.day_of_booking}
              period={booking.period}
              description={booking.description}
              equipment={booking.equipment}
              open_at={booking.open_at}
              full_address={booking.full_address}
              key={index} >
              </ProjectMinimumViewRaumbuchungen>
             )
             
           })
           
           
           }
        </div>

    </div>
  )
}

export default DashboardRaumbuchungen