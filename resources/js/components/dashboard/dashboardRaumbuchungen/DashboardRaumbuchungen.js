import React, {useContext, useState, useEffect} from 'react'
import ProjectMinimumViewRaumbuchungen from './ProjectMinimumViewRaumbuchungen'
import SearchBarRaumbuchungen from './searchbar/SearchBarRaumbuchungens'
import UserContext from '../../../store/user-context'
import axios from 'axios'
import Loading from '../../../../images/icons/loading-spinner.png'


function DashboardRaumbuchungen(props) {

  const user = useContext(UserContext)

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedBookings, setBookings] = useState({})
  const [filtered, setFiltered] = useState(false)
  const [filteredBookings, setFilteredBookings] = useState([])

  

  const getBookings = () =>{
    setIsLoaded(false);
    const url = "http://127.0.0.1:8000/api/user/"+user.user_id+"/bookings";
    axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + props.token
      }
    })
      .then(function(response) {
        setIsLoaded(true);
        setBookings(response.data.bookings);  
        }).catch(function(response){
            setIsLoaded(true)
            setError(true)})
  }

  useEffect(() => {
    getBookings()
  },[] );


  const sortElements = (event, rotate) =>{
    const IDTriggeredSortElement = event.target.id
    let orderedBookings;
    switch(IDTriggeredSortElement){
      case "0":
        if(rotate){
          orderedBookings = [...loadedBookings].sort((a,b) => (a.room.title > b.room.title) ? 1: ((b.room.title > a.room.title) ? -1 : 0))
        }else{
          orderedBookings = [...loadedBookings].sort((a,b) => (a.room.title > b.room.title) ? -1: ((b.room.title > a.room.title) ? 1 : 0))
        }
        break;
      case "1":
        if(rotate){
          orderedBookings = [...loadedBookings].sort((a,b) => (a.room.room_number > b.room.room_number) ? 1: ((b.room.room_number > a.room.room_number) ? -1 : 0))
        }else{
          orderedBookings = [...loadedBookings].sort((a,b) => (a.room.room_number > b.room.room_number) ? -1: ((b.room.room_number > a.room.room_number) ? 1 : 0))
        }
        break;
      case '2':
        if(rotate){
          orderedBookings = [...loadedBookings].sort((a,b) => (a.room.created_at > b.room.created_at) ? 1: ((b.room.created_at > a.room.created_at) ? -1 : 0))
        }else{
          orderedBookings = [...loadedBookings].sort((a,b) => (a.room.created_at > b.room.created_at) ? -1: ((b.room.created_at > a.room.created_at) ? 1 : 0))
        }
        break;
      case '3':
        if(rotate){
          orderedBookings = [...loadedBookings].sort((a,b) => (a.room.capacity > b.room.capacity) ? 1: ((b.room.capacity > a.room.capacity) ? -1 : 0))
        }else{
          orderedBookings = [...loadedBookings].sort((a,b) => (a.room.capacity > b.room.capacity) ? -1: ((b.room.capacity > a.room.capacity) ? 1 : 0))
        }
        break;
      case '4':
        if(rotate){
          orderedBookings = [...loadedBookings].sort((a,b) => (a.reservation_date > b.reservation_date) ? 1: ((b.reservation_date > a.reservation_date) ? -1 : 0))
        }else{
          orderedBookings = [...loadedBookings].sort((a,b) => (a.reservation_date > b.reservation_date) ? -1: ((b.reservation_date > a.reservation_date) ? 1 : 0))
        }
        break;
      case '5':
        if(rotate){
          orderedBookings = [...loadedBookings].sort((a,b) => (a.start_time > b.start_time) ? 1: ((b.start_time > a.start_time) ? -1 : 0))
        }else{
          orderedBookings = [...loadedBookings].sort((a,b) => (a.start_time > b.start_time) ? -1: ((b.start_time > a.start_time) ? 1 : 0))
        }
        break;
      default:
        return;
    }
    setBookings(orderedBookings)
  }
  const filterElements = (inputValue, filtered) =>{
    setFiltered(filtered)
    let filteredBookingsBuffer
    filteredBookingsBuffer = [...loadedBookings].filter((booking) => booking.room.title.toLowerCase().includes(inputValue))
    setFilteredBookings(filteredBookingsBuffer)
  }



  if (error) {
    return <div className="m-auto text-red font-bold">Es ist ein Fehler aufgetreten!</div> 
  }else if(!isLoaded){
    return (<div className="m-auto flex flex-row">
    <img src={Loading} alt="loading" className='animate-spin h-5 w-5 mr-2 mt-0.5'/>
    <div className=" text-darkgray">Loading...</div>
  </div>)
  }else if(loadedBookings.length < 1){
    return (
  <>
    <div className="flex flex-col justify-center items-center w-full h-screen text-red font-bold">
      <h2>Aktuell keine Buchungen vorhanden</h2>
    </div>
  </>
    )
  }else {
    return (
      <div className="flex flex-col w-full m-1 ml-2">
          <SearchBarRaumbuchungen sortElements={sortElements} filterElements={filterElements} />
          
          <div className='h-full w-full'>
            {
              filtered ? 

              filteredBookings.map((booking, index) => {
              return(
                <ProjectMinimumViewRaumbuchungen
                id={booking.id}
                room_number={booking.room.room_number}
                title={booking.room.title}
                created_at={booking.room.created_at.substring(0,10)}
                capacity={booking.room.capacity}
                reservation_date={booking.reservation_date}
                start_time={booking.start_time.substring(0,5)}
                end_time={booking.end_time.substring(0,5)}

                description={booking.room.description}
                equipment_info={booking.room.equipment_info}
                opening_time={booking.room.opening_time.substring(0,5)}
                closing_time={booking.room.closing_time.substring(0,5)}
                address_info={booking.room.address_info}
                project={booking.room.project_id}
                key={index} 
                getData={getBookings}>
                </ProjectMinimumViewRaumbuchungen>
              )
            })

            :   
            loadedBookings.map((booking, index) => {
              return(
                <ProjectMinimumViewRaumbuchungen
                id={booking.id}
                room_number={booking.room.room_number}
                title={booking.room.title}
                created_at={booking.room.created_at.substring(0,10)}
                capacity={booking.room.capacity}
                reservation_date={booking.reservation_date}
                start_time={booking.start_time.substring(0,5)}
                end_time={booking.end_time.substring(0,5)}

                description={booking.room.description}
                equipment_info={booking.room.equipment_info}
                opening_time={booking.room.opening_time.substring(0,5)}
                closing_time={booking.room.closing_time.substring(0,5)}
                address_info={booking.room.address_info}
                project={booking.room.project_id}
                key={index} 
                getData={getBookings}>
                </ProjectMinimumViewRaumbuchungen>
              )
            })
            
            } 
          </div>

      </div>
    )
  }
}

export default DashboardRaumbuchungen