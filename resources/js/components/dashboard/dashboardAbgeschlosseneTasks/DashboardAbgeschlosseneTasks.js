import React from 'react'
import SearchBar from './searchbar/SearchBarAbgeschlosseneTasks'
import ProjectMinimumView from './ProjectMinimumViewAbgeschlosseneTasks'

const elements = [
  {project: "Projekt aB", created_at: "01.01.2022" , title: "Title2", deadline: "25.05.2022", finished_at:"24.05.2022", priority: "hoch", tag:"back-end", finished_state:"abgeschlossen", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", room: "A009", finish_comment: "War ganz easy, Abschlusskommentar"},
  {project: "Projekt 420", created_at: "01.03.2022" , title: "Title2", deadline: "25.06.2022", finished_at:"24.05.2022", priority: "niedrig", tag:"front-end", finished_state:"abgebrochen", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", room: "B015", finish_comment: "Macht garkeinen Bock, Abschlusskommentar"},
]

function DashboardAbgeschlosseneTasks() {
  return (
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBar />
        
        <div className="h-full w-full">
          {elements.map((element, index) => {
            return (
              <ProjectMinimumView
                title={element.title}
                project={element.project}
                created_at={element.created_at}
                deadline={element.deadline}
                finished_at={element.finished_at}
                priority={element.priority}
                tag={element.tag}
                finished_state={element.finished_state}
                description={element.description}
                finish_comment={element.finish_comment}
                room={element.room}
                key={index}>
              </ProjectMinimumView>
            )
          })}
        </div>

    </div>
  )
}

export default DashboardAbgeschlosseneTasks