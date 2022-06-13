import {React, useState, useEffect} from 'react'

import SearchBar from './searchbar/SearchBar'
import TaskMinimumView from './TaskMinimumView'
import NewTaskPopup from './popup/NewTaskPopup'
import CreateTaskButton from './CreateTaskButton'
import Loading from '../../../../images/icons/loading-spinner.png'

const tasks = [
  {title: "Task1", status: "abgeschlossen", prio: "Hoch", completedDate: "06.05.2022" , date: "09.05.2022"},
  {title: "Task2", status: "in Bearbeitung", prio: "Mittel", completedDate: "-" , date: "09.05.2022"},
  {title: "Task3", status: "pausiert", prio: "Gering", completedDate: "-", date: "09.05.2022"}
]

function DashboardTasks(props) {

  const [popupTrigger, setPopupTrigger] = useState(false)
  const changePopupTriggerValue = () => {
    setPopupTrigger(!popupTrigger);
  }

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
          setTasks(data["tasks"]);
          },(error) =>{
            setIsLoaded(true);
            setError(error);
          }
        )
    }, []);
      
    if (error) {
      errormessage = error.message;
      if(error.message.includes("No tasks found")) errormessage = "Keine Tasks gefunden";
        return <div className="m-auto text-red font-bold">Error: {errormessage}</div>
    }else if(!isLoaded){
        return (<div className="m-auto flex flex-row">
        <img src={Loading} alt="loading" className='animate-spin h-5 w-5 mr-2 mt-0.5'/>
        <div className=" text-darkgray">Loading...</div>
      </div>)
    }else if(loadedTasks.length < 1){
      return <div className="m-auto text-red font-bold">Keine Tasks gefunden</div>
  }else {

    return(
      <div className="flex flex-col w-full mx-1 my-2">
          <SearchBar />

          <div className="h-full w-full">
            {loadedTasks.map((task, index) => {
              return (
                <TaskMinimumView
                  title={(task.title.length > 27) ? task.title.substring(0,24)+'...' : task.title}
                  fullTitle = {task.title}
                  description = {task.description}
                  comment = {(task.completion_comment === null ? "noch nicht abgeschlossen" : task.completion_comment)}
                  status = {task.status.title}
                  prio = {task.priority.title}
                  completedDate = {(task.completed_date === null ? "not completed" : task.completed_date)}
                  date = {task.due_date}
                  updated_at = {task.updated_at.substring(0,10)}
                  creator = {task.creator.username}
                  assignee = {task.assignee}
                  tag = {task.tag.title == null ? "keine Tag" : task.tag.title}
                  key={index}>
                </TaskMinimumView>
              )
            })}
          </div>

          <div className="w-full flex justify-end">
            {/*<div className="bg-blue rounded-xl h-10 w-44 flex items-center mr-10 mb-3 hover:cursor-pointer hover:font-bold">
                <img src={Plus} alt="plus" className="h-6 w-6 mx-2"></img>
                <button className="text-white rounded-xl">Task erstellen</button>           
            </div> */}
            <CreateTaskButton popupTrigger={popupTrigger} onClick={changePopupTriggerValue} />  
        </div>
        <NewTaskPopup trigger={popupTrigger} onClick={changePopupTriggerValue}/>
      </div>
    )}
}

export default DashboardTasks