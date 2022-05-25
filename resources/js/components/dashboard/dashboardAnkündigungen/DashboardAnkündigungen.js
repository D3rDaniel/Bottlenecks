import React from 'react'
import ProjectMinimumView from './ProjectMinimumView'
import SearchBarAnkündigungen from './searchbar/SearchBarAnkündigungen'
const tasks = [
  {project: "Projekt aB", created_at: "01.01.2022" , title: "Message 1", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},
  {project: "Projekt 420", created_at: "20.04.2022" , title: "Message 2", description: "afasdfafdöafhöosdSMOKEWEEDEVERYDAYjöadfhaöNOTREALLY"},
]

const DashboardAnkündigungen = () => {
  return(
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBarAnkündigungen />
        
        <div className="h-full w-full">
          {tasks.map((task, index) => {
            return (
              <ProjectMinimumView
                project={task.project}
                created_at={task.created_at}
                title={task.title}
                description={task.description}
                key={index}>
              </ProjectMinimumView>
            )
          })}
        </div>

    </div>
  )
}

export default DashboardAnkündigungen