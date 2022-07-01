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
  const [filtered, setFiltered] = useState(false)
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setIsLoaded(false);
    const url = "http://sl-vinf-bordbame.hof-university.de:80/api/project/"+props.projectID+"/tasks";

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
                if(response.data["tasks"][i].status ? response.data["tasks"][i].status.id == 2 : false) filteredTasks.push(response.data["tasks"][i]);
            }
            console.log("deadline filtered Tasks: ", filteredTasks)
            setTasks(filteredTasks)

          },(error) =>{
            setIsLoaded(true);
            setError(error);
          }
        )
    }, []);

    const filterElements = (inputValue, filtered) => {
      setFiltered(filtered)
      let filteredTasksBuffer
      filteredTasksBuffer = [...loadedTasks].filter((task) => task.title.toLowerCase().includes(inputValue))
      setFilteredTasks(filteredTasksBuffer)
    }
    const sortElements = (event, rotate) => {
      const IDTriggeredSortElement = event.target.id
      let orderedTasks;
      switch(IDTriggeredSortElement){
        case "0":
          if(rotate){
            orderedTasks = [...loadedTasks].sort((a,b) => (a.title > b.title) ? 1: ((b.title > a.title) ? -1 : 0))
          }else{
            orderedTasks = [...loadedTasks].sort((a,b) => (a.title > b.title) ? -1: ((b.title > a.title) ? 1 : 0))
          }
          break;
        case "1":
          if(rotate){
            orderedTasks = [...loadedTasks].sort((a,b) => (a.status.title > b.status.title) ? 1: ((b.status.title > a.status.title) ? -1 : 0))
          }else{
            orderedTasks = [...loadedTasks].sort((a,b) => (a.status.title > b.status.title) ? -1: ((b.status.title > a.status.title) ? 1 : 0))
          }
          break;
        case "2":
          if(rotate){
            orderedTasks = [...loadedTasks].sort((a,b) => (a.priority.title > b.priority.title) ? 1: ((b.priority.title > a.priority.title) ? -1 : 0))
          }else{
            orderedTasks = [...loadedTasks].sort((a,b) => (a.priority.title > b.priority.title) ? -1: ((b.priority.title > a.priority.title) ? 1 : 0))
          }
          break;
        case "3":
          if(rotate){
            orderedTasks = [...loadedTasks].sort((a,b) => (a.due_date > b.due_date) ? 1: ((b.due_date > a.due_date) ? -1 : 0))
          }else{
            orderedTasks = [...loadedTasks].sort((a,b) => (a.due_date > b.due_date) ? -1: ((b.due_date > a.due_date) ? 1 : 0))
          }
          break;
        default:
          return;
      }
      setTasks(orderedTasks)
    }
      
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
        <Searchbar filterElements={filterElements} sortElements={sortElements} />
        <div className="h-full w-full flex flex-col gap-10 mt-10">
        {
        filtered?
        <>
          <WeekView tasks={loadedTasks}/>
          <MonthView tasks={loadedTasks}/>  
        </>
          :
          <>
          <WeekView tasks={filteredTasks}/>
          <MonthView tasks={filteredTasks}/>  
          </>
          
        }
        {
          /*
          <WeekView tasks={loadedTasks}/>
          <MonthView tasks={loadedTasks}/>  
          */
        }
          
        </div>        
    </div>
  )}
}

export default dashboardDeadline