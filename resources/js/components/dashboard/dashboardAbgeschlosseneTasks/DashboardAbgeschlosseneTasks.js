import { React, useState, useEffect } from 'react'
import SearchBarAbgeschlosseneTasks from './searchbar/SearchBarAbgeschlosseneTasks'
import ProjectMinimumView from './ProjectMinimumViewAbgeschlosseneTasks'
import Loading from '../../../../images/icons/loading-spinner.png'

const elements = [
  {project: "Projekt aB", created_at: "01.01.2022" , title: "Title2", deadline: "25.05.2022", finished_at:"24.05.2022", priority: "hoch", tag:"back-end", finished_state:"abgeschlossen", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", room: "A009", finish_comment: "War ganz easy, Abschlusskommentar"},
  {project: "Projekt 420", created_at: "01.03.2022" , title: "Title2", deadline: "25.06.2022", finished_at:"24.05.2022", priority: "niedrig", tag:"front-end", finished_state:"abgebrochen", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", room: "B015", finish_comment: "Macht garkeinen Bock, Abschlusskommentar"},
]

function DashboardAbgeschlosseneTasks(props) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedTasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState(false)
  const [filteredTasks, setFilteredTasks] = useState([])


    useEffect(() => {
        setIsLoaded(false);
        const url = "http://127.0.0.1:8000/api/user/"+props.userID+"/tasks/completed";

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
                console.log("default- shit")
            }
            setTasks(orderedTasks)
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
        return <div className="m-auto text-red font-bold">Keine Tasks gefunden</div>
    }else {

  return (
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBarAbgeschlosseneTasks sortElements={sortElements} filterElements={filterElements} />
        
        <div className="h-full w-full">
          {
            filtered?
            filteredTasks.map((task, index) => {
            return (
              <ProjectMinimumView
                title={(task.title.length > 28) ? task.title.substring(0,25)+'...' : task.title}
                fullTitle = {task.title}                
                project={(task.project.title.length > 28) ? task.project.title.substring(0,25)+'...' : task.project.title}
                created_at={task.created_at.substring(0,10)}
                deadline={task.due_date}
                finished_at={task.completed_date == null ? "kein Datum" : task.completed_date}
                priority={task.priority.title}
                tag={task.tag.title}
                finished_state={task.status.title}
                description={task.description}
                finish_comment={task.completion_comment == null ? "kein Kommentar angegeben" : task.completion_comment}
                room={task.room == null ? "kein Raum angegeben" : task.room}
                key={index}>
              </ProjectMinimumView>
            )
          })
          :
            
            loadedTasks.map((task, index) => {
            return (
              <ProjectMinimumView
                title={(task.title.length > 28) ? task.title.substring(0,25)+'...' : task.title}
                fullTitle = {task.title}                
                project={(task.project.title.length > 28) ? task.project.title.substring(0,25)+'...' : task.project.title}
                created_at={task.created_at.substring(0,10)}
                deadline={task.due_date}
                finished_at={task.completed_date == null ? "kein Datum" : task.completed_date}
                priority={task.priority.title}
                tag={task.tag.title}
                finished_state={task.status.title}
                description={task.description}
                finish_comment={task.completion_comment == null ? "kein Kommentar angegeben" : task.completion_comment}
                room={task.room == null ? "kein Raum angegeben" : task.room}
                key={index}>
              </ProjectMinimumView>
            )
          })
          
          
          }
        </div>

    </div>
  )}
}

export default DashboardAbgeschlosseneTasks