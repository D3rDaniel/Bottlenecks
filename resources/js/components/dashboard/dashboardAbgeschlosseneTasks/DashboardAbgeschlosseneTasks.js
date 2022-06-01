import { React, useState, useEffect } from 'react'
import SearchBar from './searchbar/SearchBarAbgeschlosseneTasks'
import ProjectMinimumView from './ProjectMinimumViewAbgeschlosseneTasks'

const elements = [
  {project: "Projekt aB", created_at: "01.01.2022" , title: "Title2", deadline: "25.05.2022", finished_at:"24.05.2022", priority: "hoch", tag:"back-end", finished_state:"abgeschlossen", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", room: "A009", finish_comment: "War ganz easy, Abschlusskommentar"},
  {project: "Projekt 420", created_at: "01.03.2022" , title: "Title2", deadline: "25.06.2022", finished_at:"24.05.2022", priority: "niedrig", tag:"front-end", finished_state:"abgebrochen", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", room: "B015", finish_comment: "Macht garkeinen Bock, Abschlusskommentar"},
]

function DashboardAbgeschlosseneTasks(props) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedTasks, setTasks] = useState([]);

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
          })}
        </div>

    </div>
  )}
}

export default DashboardAbgeschlosseneTasks