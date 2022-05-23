import React from 'react'
import SearchBar from '../dashboardProjects/searchbar/SearchBar'
import ProjectMinimumView from '../dashboardProjects/ProjectMinimumView'
const tasks = [
  {project: "Projekt aB", created_at: "01.01.2022" , title: "Message 1", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},
  {project: "Projekt 420", created_at: "20.04.2022" , title: "Message 2", description: "afasdfafdöafhöosdSMOKEWEEDEVERYDAYjöadfhaöNOTREALLY"},
]

const DashboardAnkündigungen = () => {
  return(
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBar />
        
        <div className="h-full w-full">
          {tasks.map((project, index) => {
            return (
              <ProjectMinimumView
                title={project.title}
                creator={project.creator}
                progress={project.progress}
                startDate={project.startDate}
                date={project.date}
                key={index}>
              </ProjectMinimumView>
            )
          })}
        </div>

    </div>
  )
}

export default DashboardAnkündigungen