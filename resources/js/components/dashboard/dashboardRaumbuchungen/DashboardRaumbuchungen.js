import React from 'react'
import ProjectMinimumViewRaumbuchungen from './ProjectMinimumViewRaumbuchungen'
import SearchBar from './searchbar/SearchBarRaumbuchungens'

const buchungen = [
  {roomname: "Bücherrei", roomnumber: "019", created_at: "12.04.2022", roomsize: "12", day_of_booking: "04.06.2022", period: "12:00 - 14:00", 
  description: "blablaafohasfhadsfhdafjadsöfhdasöfhdaöfhdöafhadsofjködhfaoödfhaööööööööööööööööakdhfodhfköadhfadhfködashfödhgöiadfhgöiadfhad adökfhadsöofh aöfhoöadshf öasodfh ödas f.  ! ladfh öakdsfhaös hf.",
  equipment: "beamer", open_at:"Mo-Fr 9-12", 
  full_address: {city: "Hof", plz: "95028", address: "Alfons-Goppel-Platz 1", building: "B", room: "019"}}
]

function DashboardRaumbuchungen() {
  return (
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBar />
        
        <div className='h-full w-full'>
           {buchungen.map((booking, index) => {
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
             
           })}
        </div>

    </div>
  )
}

export default DashboardRaumbuchungen