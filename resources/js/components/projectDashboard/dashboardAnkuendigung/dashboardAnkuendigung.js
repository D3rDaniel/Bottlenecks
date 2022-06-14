import {React, useState, useEffect} from 'react'

import Searchbar from './searchbar/SearchBar'
import MinView from './AnkuendigungMinimumView'
import Loading from '../../../../images/icons/loading-spinner.png'

const messages = [
    {subject : "Ankündigung 1" , creator : "Maximilian" , created_at :  "22.04.2022" , message : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."},
    {subject : "Ankündigung 2" , creator : "Frodo" , created_at :  "22.04.2022" , message : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."},
    {subject : "Ankündigung 2" , creator : "Hercules" , created_at :  "22.04.2022" , message : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."}
]
const dashboardAnkuendigung = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadedAnnouncements, setAnnouncements] = useState([]);

    useEffect(() => {
      setIsLoaded(false);
      const url = "http://127.0.0.1:8000/api/project/"+props.projectID+"/announcements";
  
      axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + props.token
        }
      })
        .then(function(response) {setIsLoaded(true);
          setAnnouncements(response.data["announcements"]);  
          },(error) =>{
            setIsLoaded(true);
            setError(error);})
    }, []);

      if (error) {
        let errormessage = error.message;
        if(error.message.includes("No announcements found")) errormessage = "Es gibt noch keine Ankündigungen"
          return <div className="m-auto text-red font-bold">Error: {errormessage}</div>
      }else if(!isLoaded){
          return (<div className="m-auto flex flex-row">
          <img src={Loading} alt="loading" className='animate-spin h-5 w-5 mr-2 mt-0.5'/>
          <div className=" text-darkgray">Loading...</div>
        </div>)
      }else if(loadedAnnouncements.length < 1){
        return <div className="m-auto text-red font-bold">Keine Ankündigungen gefunden</div>
    }else {

    return (
        <div className="flex flex-col w-full mx-1 my-2">
          <Searchbar />

          <div className="h-full w-full">
              {loadedAnnouncements.map((announcement, index) => {
                  return (
                      <MinView 
                          message = {announcement}
                          key = {index}
                      ></MinView>
                  )
              })}
          </div>
        </div>
    )}
}

export default dashboardAnkuendigung