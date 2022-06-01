import React from 'react'

import ProjectView from './AdminProjectView'
import AnkuendigungView from './AdminAnkuendigungView'
import MemberView from './MemberView'

const dashboardAdmin = () => {

    const project_overview = [
        {title : "Projekt 1" , description : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." , 
            members :   [   { username : "Jogy" , pivot : {can_create_tasks : "0" , can_assign_tasks : "0" , can_edit_tasks : "0" , can_create_tags : "0"}} ,
                            { username : "Freddy" , pivot : {can_create_tasks : "1" , can_assign_tasks : "1" , can_edit_tasks : "1" , can_create_tags : "1"}} 
                        ]
        }
    ]

  return (
    <div className="h-screen w-screen flex justify-center items-center ml-10 mr-5">
        <div className="flex flex-col justify-center h-full w-full mr-5 gap-10">
            <ProjectView project = {project_overview}/>
            <AnkuendigungView />
        </div>
        
        <MemberView members = {project_overview[0].members}/>
    </div>
  )
}

export default dashboardAdmin