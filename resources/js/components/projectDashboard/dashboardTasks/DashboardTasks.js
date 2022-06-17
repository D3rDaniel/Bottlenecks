import {React, useState, useEffect} from 'react'
import SearchBar from './searchbar/SearchBar'
import TaskMinimumView from './TaskMinimumView'
import NewTaskPopup from './popup/NewTaskPopup'
import CreateTaskButton from './CreateTaskButton'
import Loading from '../../../../images/icons/loading-spinner.png'
import axios from 'axios'

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
  const [filtered, setFiltered] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setIsLoaded(false);
    const url = "http://127.0.0.1:8000/api/project/"+props.projectID+"/tasks";

    axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + props.token
      }
    })
      .then(function(response) {setIsLoaded(true);
        setTasks(response.data["tasks"]);  
        },(error) =>{
          setIsLoaded(true);
          setError(error);})
  }, []);

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
          orderedTasks = [...loadedTasks].sort((a,b) => (a.creator_user_id > b.creator_user_id) ? 1: ((b.creator_user_id > a.creator_user_id) ? -1 : 0))
        }else{
          orderedTasks = [...loadedTasks].sort((a,b) => (a.creator_user_id > b.creator_user_id) ? -1: ((b.creator_user_id > a.creator_user_id) ? 1 : 0))
        }
        break;
      default:
        console.log("default- shit")
    }
    setTasks(orderedTasks)
  }

  const filterElements = (inputValue, filtered) => {
    setFiltered(filtered)
    let filteredTasksBuffer
    filteredTasksBuffer = [...loadedTasks].filter((task) => task.title.toLowerCase().includes(inputValue))
    setFilteredRooms(filteredTasksBuffer)
  }
      
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
      return (
        <>
            <div className="m-auto text-red font-bold">
                 <h2>Keine Tasks gefunden</h2>
                 <CreateTaskButton popupTrigger={popupTrigger} onClick={changePopupTriggerValue}/>
              </div>
              <NewTaskPopup trigger={popupTrigger} onClick={changePopupTriggerValue} token={props.token} user_id={props.userID} project_id={props.projectID}/>
        </>
        )
  }else {

    return(
      <div className="flex flex-col w-full mx-1 my-2">
          <SearchBar sortElements={sortElements} filterElements={filterElements}/>

          <div className="h-full w-full overflow-y-scroll">
            {
              filtered?
              filteredTasks.map((task, index) => {
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
                  tag = {task.tag === null ? "keine Tag" : task.tag.title}
                  key={index}>
                </TaskMinimumView>
              )
            })
            
              :
              loadedTasks.map((task, index) => {
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
                  tag = {task.tag === null ? "keine Tag" : task.tag.title}
                  key={index}>
                </TaskMinimumView>
              )
            })
            
            }
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