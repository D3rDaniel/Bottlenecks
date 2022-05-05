import React from 'react'
import SearchBar from './searchbar/SearchBar'
import ProjectMinimumView from './ProjectMinimumView'

const tasks = [
  {title: "Frontend", creator: "Hans Jürgen" , progress: 70, startDate: "01.05.2022", date: "09.05.2022"},
  {title: "Backend", creator: "Max Muster" ,  progress: 50, startDate: "01.05.2022" , date: "09.05.2022"},
  {title: "API", creator: "Men Rexona" , progress: 30, startDate: "01.05.2022" , date: "09.05.2022"}
]

const DashboardProjects = () => {
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

export default DashboardProjects