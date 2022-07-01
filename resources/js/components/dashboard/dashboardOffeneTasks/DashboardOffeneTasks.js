import { React, useState, useEffect } from 'react'
import SearchBarOffeneTasks from './searchbar/SearchBarOffeneTasks'
import ProjectMinimumViewOffeneTasks from './ProjectMinimumViewOffeneTasks'
import Loading from '../../../../images/icons/loading-spinner.png'
import axios from 'axios'

const elements = [
  {project: "Projekt aB",  title: "Title2", deadline: "25.05.2022", priority: "hoch", tag:"back-end", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", room: "A009"},
  {project: "Projekt WEED",  title: "Title420", deadline: "25.06.2022", priority: "mittel", tag:"front-end", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", room: "AB09"},
]


function DashboardOffeneTasks(props) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedTasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState(false)
  const [filteredTasks, setFilteredTasks] = useState([])

  const filterElements = (inputValue, filtered) => {
    setFiltered(filtered)
    let filteredTasksBuffer
    filteredTasksBuffer = [...loadedTasks].filter((task) => task.title.toLowerCase().includes(inputValue))
    setFilteredTasks(filteredTasksBuffer)
  }
  const sortElements = (event, rotate) =>{
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
              orderedTasks = [...loadedTasks].sort((a,b) => (a.project > b.project) ? 1: ((b.project > a.project) ? -1 : 0))
            }else{
              orderedTasks = [...loadedTasks].sort((a,b) => (a.project > b.project) ? -1: ((b.project > a.project) ? 1 : 0))
            }
            break;
          case '2':
            if(rotate){
              orderedTasks = [...loadedTasks].sort((a,b) => (a.deadline > b.deadline) ? 1: ((b.deadline > a.deadline) ? -1 : 0))
            }else{
              orderedTasks = [...loadedTasks].sort((a,b) => (a.deadline > b.deadline) ? -1: ((b.deadline > a.deadline) ? 1 : 0))
            }
            break;
          case '3':
            if(rotate){
              orderedTasks = [...loadedTasks].sort((a,b) => (a.tag > b.tag) ? 1: ((b.tag > a.tag) ? -1 : 0))
            }else{
              orderedTasks = [...loadedTasks].sort((a,b) => (a.tag > b.tag) ? -1: ((b.tag > a.tag) ? 1 : 0))
            }
            break;
          case '4':
            if(rotate){
              orderedTasks = [...loadedTasks].sort((a,b) => (a.room > b.room) ? 1: ((b.room > a.room) ? -1 : 0))
            }else{
              orderedTasks = [...loadedTasks].sort((a,b) => (a.room > b.room) ? -1: ((b.room > a.room) ? 1 : 0))
            }
            break;
          case '5':
            if(rotate){
              orderedTasks = [...loadedTasks].sort((a,b) => (a.priority > b.priority) ? 1: ((b.priority > a.priority) ? -1 : 0))
            }else{
              orderedTasks = [...loadedTasks].sort((a,b) => (a.priority > b.priority) ? -1: ((b.priority > a.priority) ? 1 : 0))
            }
            break;
          default:
        }
        setTasks(orderedTasks)
  }

    useEffect(() => {
        setIsLoaded(false);
        const url = "http://sl-vinf-bordbame.hof-university.de:80/api/user/tasks/in-progress";

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

  return (
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBarOffeneTasks sortElements={sortElements} filterElements={filterElements} />
        
        <div className="h-full w-full">
          {
            filtered?

            filteredTasks.map((task, index) => {
            return (
              <ProjectMinimumViewOffeneTasks
                title={(task.title.length > 30) ? task.title.substring(0,27)+'...' : task.title}
                fullTitle = {task.title}
                project={(task.project.title.length > 30) ? task.project.title.substring(0,27)+'...' : task.project.title}
                deadline={task.due_date}
                tag={task.tag ? task.tag.title : "kein Tag"}
                room={task.room == null ? "kein Raum angegeben" : task.room}
                priority={task.priority ? task.priority.title : "keine Priorität"}
                description={task.description}
                id={task.id}
                key={index}
                >
              </ProjectMinimumViewOffeneTasks>
            )
          })

          :
            
            loadedTasks.map((task, index) => {
            return (
              <ProjectMinimumViewOffeneTasks
                title={(task.title.length > 30) ? task.title.substring(0,27)+'...' : task.title}
                fullTitle = {task.title}
                project={(task.project.title.length > 30) ? task.project.title.substring(0,27)+'...' : task.project.title}
                deadline={task.due_date}
                tag={task.tag ? task.tag.title : "kein Tag"}
                room={task.room == null ? "kein Raum angegeben" : task.room}
                priority={task.priority ? task.priority.title : "keine Priorität"}
                description={task.description}
                id={task.id}
                key={index}
                >
              </ProjectMinimumViewOffeneTasks>
            )
          })
          
          }
        </div>

    </div>
  )}
}

export default DashboardOffeneTasks