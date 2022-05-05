import React from 'react'
import SearchBar from './searchbar/SearchBar'
import TaskMinimumView from './TaskMinimumView'

const tasks = [
  {title: "Frontend", progress: 70, prio: "Hoch", date: "09.05.2022"},
  {title: "Backend", progress: 50, prio: "Mittel", date: "09.05.2022"},
  {title: "API", progress: 30, prio: "Gering", date: "09.05.2022"}
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
                progress={task.progress}
                prio={task.prio}
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