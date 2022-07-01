import {React, useState, useEffect} from 'react'
import SearchBar from './searchbar/SearchBar'
import TaskMinimumView from './TaskMinimumView'
import NewTaskPopup from './popup/NewTaskPopup'
import CreateTaskButton from './CreateTaskButton'
import Loading from '../../../../images/icons/loading-spinner.png'
import axios from 'axios'
import { BsChevronCompactLeft } from 'react-icons/bs'

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

  const getTasks = () =>{
    setRefresh(false)
    setIsLoaded(false);
    console.log("project-id-from_dashTasks: ", props.projectID)
    const url = "http://sl-vinf-bordbame.hof-university.de:80/api/project/"+props.projectID+"/tasks";

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
  }

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedTasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [refresh,setRefresh] = useState(false)

  useEffect(() => {
    getTasks();
  }, [refresh]);

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

  const filterElements = (inputValue, filtered) => {
    setFiltered(filtered)
    let filteredTasksBuffer
    filteredTasksBuffer = [...loadedTasks].filter((task) => task.title.toLowerCase().includes(inputValue))
    setFilteredTasks(filteredTasksBuffer)
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
              <NewTaskPopup refresh={function(){setRefresh(true)}} trigger={popupTrigger} onClick={changePopupTriggerValue} token={props.token} user_id={props.userID} project_id={props.projectID}/>
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
                  id={task.id}
                  title={(task.title.length > 27) ? task.title.substring(0,24)+'...' : task.title}
                  fullTitle = {task.title}
                  description = {task.description}
                  comment = {(task.completion_comment === null ? "-ohne Kommentar-" : task.completion_comment)}
                  status = {task.status !== null? task.status : "kein status"}
                  prio = {task.priority !== null ? task.priority.title : "keine Priorität"}
                  completedDate = {(task.completed_date === null ? "nicht abgeschlossen" : task.completed_date)}
                  date = {task.due_date}
                  updated_at = {task.updated_at.substring(0,10)}
                  creator = {task.creator.username}
                  assignee = {task.assignee}
                  tag = {task.tag === null ? "-kein Tag-" : task.tag.title}
                  key={index}
                  token={props.token}
                  refresh={function(){setRefresh(true)}}
                  >
                </TaskMinimumView>
              )
            })
            
              :
              loadedTasks.map((task, index) => {
              return (
                <TaskMinimumView
                  id={task.id}
                  title={(task.title.length > 27) ? task.title.substring(0,24)+'...' : task.title}
                  fullTitle = {task.title}
                  description = {task.description}
                  comment = {(task.completion_comment === null ? "-ohne Kommentar-" : task.completion_comment)}
                  status = {task.status !== null? task.status : "kein status"}
                  prio = {task.priority !== null ? task.priority.title : "keine Priorität"}
                  completedDate = {(task.completed_date === null ? "not completed" : task.completed_date)}
                  date = {task.due_date}
                  updated_at = {task.updated_at.substring(0,10)}
                  creator = {task.creator.username}
                  assignee = {task.assignee}
                  tag = {task.tag === null ? "keine Tag" : task.tag.title}
                  key={index}
                  token={props.token}
                  refresh={function(){setRefresh(true)}}
                  view="TaskView"
                  >
                </TaskMinimumView>
              )
            })
            
            }
          </div>

          <div className="w-full flex justify-end">
            <CreateTaskButton popupTrigger={popupTrigger} onClick={changePopupTriggerValue} />  
        </div>
        <NewTaskPopup refresh={function(){setRefresh(true)}} token={props.token} trigger={popupTrigger} onClick={changePopupTriggerValue} user_id={props.userID} project_id={props.projectID}/>
      </div>
    )}
}

export default DashboardTasks