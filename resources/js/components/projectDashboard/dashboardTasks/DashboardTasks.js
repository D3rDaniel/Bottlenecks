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
      setIsLoaded(true);
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
                  status = {task.status_id == 1 ? "Erledigt" : ((task.status_id == 2) ? "In Arbeit" : ((task.status_id == 3) ? "Pausiert" : "Fehlgeschlagen"))}
                  prio = {task.priority_id == 3 ? "Gering" : ((task.priority_id == 2) ? "Mittel" : "Hoch")}
                  completedDate = {(task.completed_date === null ? "not completed" : task.completed_date)}
                  date = {task.due_date}
                  update = {task.updated_at}
                  creator = {task.creator_user_id}
                  assignee = {task.assignee}
                  tag = {task.tag_id == null ? "keine Tag" : task.tag_id}
                  key={index}>
                </TaskMinimumView>
              )
            })}
          </div>
      </div>
    )}
}

export default DashboardTasks