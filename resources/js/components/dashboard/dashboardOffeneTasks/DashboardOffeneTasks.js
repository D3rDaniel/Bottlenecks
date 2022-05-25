import React from 'react'
import SearchBar from './searchbar/SearchBarOffeneTasks'
import ProjectMinimumViewOffeneTasks from './ProjectMinimumViewOffeneTasks'

const elements = [
  {project: "Projekt aB",  title: "Title2", deadline: "25.05.2022", priority: "hoch", tag:"back-end", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", room: "A009"},
  {project: "Projekt WEED",  title: "Title420", deadline: "25.06.2022", priority: "mittel", tag:"front-end", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", room: "AB09"},
]


function DashboardOffeneTasks() {
  return (
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBar />
        
        <div className="h-full w-full">
          {elements.map((element, index) => {
            return (
              <ProjectMinimumViewOffeneTasks
                title={element.title}
                project={element.project}
                deadline={element.deadline}
                tag={element.tag}
                room={element.room}
                priority={element.priority}
                description={element.description}
                key={index}>
              </ProjectMinimumViewOffeneTasks>
            )
          })}
        </div>

    </div>
  )
}

export default DashboardOffeneTasks