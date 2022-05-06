import React from 'react'
import SearchBar from './searchbar/SearchBar'
import TaskMinimumView from './TaskMinimumView'

const tasks = [
  {title: "Task1", status: "abgeschlossen", prio: "Hoch", completedDate: "06.05.2022" , date: "09.05.2022"},
  {title: "Task2", status: "in Bearbeitung", prio: "Mittel", completedDate: "-" , date: "09.05.2022"},
  {title: "Task3", status: "pausiert", prio: "Gering", completedDate: "-", date: "09.05.2022"}
]

const DashboardTasks = () => {
  return(
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBar />
        
        <div className="h-full w-full">
          {tasks.map((task, index) => {
            return (
              <TaskMinimumView
                title={task.title}
                status={task.status}
                prio={task.prio}
                completedDate={task.completedDate}
                date={task.date}
                key={index}>
              </TaskMinimumView>
            )
          })}
        </div>
    </div>
  )
}

export default DashboardTasks