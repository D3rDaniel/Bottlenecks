import { React, useState, useEffect } from 'react'
import SearchBar from './searchbar/SearchBarOffeneTasks'
import ProjectMinimumViewOffeneTasks from './ProjectMinimumViewOffeneTasks'

const elements = [
  {project: "Projekt aB",  title: "Title2", deadline: "25.05.2022", priority: "hoch", tag:"back-end", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", room: "A009"},
  {project: "Projekt WEED",  title: "Title420", deadline: "25.06.2022", priority: "mittel", tag:"front-end", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", room: "AB09"},
]


function DashboardOffeneTasks(props) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedTasks, setTasks] = useState([]);

    useEffect(() => {
        setIsLoaded(false);
        const url = "http://127.0.0.1:8000/api/user/"+props.userID+"/tasks/in-progress";

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
          return <div>Error: {error.message}</div>
      }else if(!isLoaded){
          return <div>Loading..</div>
      }else {

  return (
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBar />
        
        <div className="h-full w-full">
          {loadedTasks.map((task, index) => {
            return (
              <ProjectMinimumViewOffeneTasks
                title={(task.title.length > 30) ? task.title.substring(0,27)+'...' : task.title}
                fullTitle = {task.title}
                project={(task.project.title.length > 30) ? task.project.title.substring(0,27)+'...' : task.project.title}
                deadline={task.due_date}
                tag={task.tag.title}
                room={task.room == null ? "kein Raum angegeben" : task.room}
                priority={task.priority.title}
                description={task.description}
                key={index}
                >
              </ProjectMinimumViewOffeneTasks>
            )
          })}
        </div>

    </div>
  )}
}

export default DashboardOffeneTasks