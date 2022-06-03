import React, {useEffect, useState} from 'react'
import Loading from '../../../../images/icons/loading-spinner.png'

import Searchbar from '../dashboardTasks/searchbar/SearchBar'
import WeekView from './WeekView'
import MonthView from './MonthView'

const checkWorkingTasks = () => {
    let workingTasks = [];

    for(let i = 0; i < loadedTasks.length; i++){
        if(loadedTasks[i].status.id !== 1){
            workingTasks.push(loadedTasks[i]);
        }
    };
    setTasksInWorking(workingTasks);
}

const tasks = [
    {title: "Task1", status: "abgeschlossen", prio: "Hoch", completedDate: "06.05.2022" , date: "2022-05-09"},
    {title: "Task2", status: "in Bearbeitung", prio: "Mittel", completedDate: "-" , date: "2022-05-09"},
    {title: "Task3", status: "in Bearbeitung", prio: "Mittel", completedDate: "-" , date: "2022-05-31"},
    {title: "Task4", status: "abgeschlossen", prio: "Gering", completedDate: "20.05.2022", date: "2022-05-09"},
    {title: "Task5", status: "in Bearbeitung", prio: "Gering", completedDate: "-", date: "2022-06-05"},
    {title: "Task6", status: "in Bearbeitung", prio: "Gering", completedDate: "-", date: "2022-06-06"},
    {title: "Task7", status: "in Bearbeitung", prio: "Gering", completedDate: "-", date: "2022-06-07"},
    {title: "Task8", status: "in Bearbeitung", prio: "Gering", completedDate: "-", date: "2022-06-08"},
    {title: "Task9", status: "in Bearbeitung", prio: "Gering", completedDate: "-", date: "2022-07-07"},
    {title: "Task10", status: "in Bearbeitung", prio: "Gering", completedDate: "-", date: "2022-07-09"},
    {title: "Task11", status: "in Bearbeitung", prio: "Gering", completedDate: "-", date: "2022-07-09"}
  ]

const dashboardDeadline = (props) => {
    const [tasksInWorking, setTasksInWorking] = useState([]);

    const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedTasks, setTasks] = useState([]);

  useEffect(() => {
      setIsLoaded(false);
      const url = "http://127.0.0.1:8000/api/project/"+props.projectID+"/tasks";
      fetch(url, {
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(response => response.json())
        .then((data) => {
          setIsLoaded(true);

            let filteredTasks = []
            for(let i = 0; i < data["tasks"].length; i++){
                if(data["tasks"][i].completed_date == null) filteredTasks.push(data["tasks"][i]);
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