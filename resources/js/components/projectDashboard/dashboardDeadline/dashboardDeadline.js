import React, {useEffect, useState} from 'react'
import Loading from '../../../../images/icons/loading-spinner.png'
import axios from 'axios'

import Searchbar from '../dashboardTasks/searchbar/SearchBar'
import WeekView from './WeekView'
import MonthView from './MonthView'

const dashboardDeadline = (props) => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedTasks, setTasks] = useState([]);

  useEffect(() => {
    setIsLoaded(false);
    const url = "http://127.0.0.1:8000/api/project/"+props.projectID+"/tasks";

    axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + props.token
      }
    })
      .then(function(response) {
          setIsLoaded(true);

            let filteredTasks = []
            for(let i = 0; i < response.data["tasks"].length; i++){
                if(response.data["tasks"][i].completed_date == null) filteredTasks.push(response.data["tasks"][i]);
            }

            setTasks(filteredTasks)

          },(error) =>{
            setIsLoaded(true);
            setError(error);
          }
        )
    }, []);
      
    if (error) {
      errormessage = error.message;
      if(error.message.includes("No tasks found")) errormessage = "Keine Tasks gefunden";
      if(error.message.includes("Project not found.")) errormessage = "Projekt konnte nicht gefunden werden";
        return <div className="m-auto text-red font-bold">Error: {errormessage}</div>
    }else if(!isLoaded){
        return (<div className="m-auto flex flex-row">
        <img src={Loading} alt="loading" className='animate-spin h-5 w-5 mr-2 mt-0.5'/>
        <div className=" text-darkgray">Loading...</div>
      </div>)
    }else if(loadedTasks.length < 1){
      return <div className="m-auto text-red font-bold">Keine Tasks gefunden</div>
  }else {
    
  return (
    <div className="flex flex-col w-full mx-2 my-2">
        <Searchbar />
        <div className="h-full w-full flex flex-col gap-10 mt-10">
            <WeekView tasks={loadedTasks}/>
            <MonthView tasks={loadedTasks}/>   
        </div>        
    </div>
  )}
}

export default dashboardDeadline