import {React, useState, useEffect} from 'react'
import SearchBar from './searchbar/SearchBar'
import TaskMinimumView from './TaskMinimumView'

const tasks = [
  {title: "Task1", status: "abgeschlossen", prio: "Hoch", completedDate: "06.05.2022" , date: "09.05.2022"},
  {title: "Task2", status: "in Bearbeitung", prio: "Mittel", completedDate: "-" , date: "09.05.2022"},
  {title: "Task3", status: "pausiert", prio: "Gering", completedDate: "-", date: "09.05.2022"}
]

function DashboardTasks(props) {

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
      return <div>Error: {error.message}</div>
  }else if(!isLoaded){
      return <div>Loading..</div>
  }else {

    return(
      <div className="flex flex-col w-full m-1 ml-2">
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
      </div>
    )}
}

export default DashboardTasks