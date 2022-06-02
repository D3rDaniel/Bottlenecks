import React from 'react'

import Absolut from './absoluteView';
import InfoView from './InfoView';
import PieView from './PieView';

const project_overview = [
    {   title : "Projekt 1" , 
        description : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." ,
        due_date : "2022-06-10", 
        completed_tasks : 0 , 
        failed_tasks : 1, 
        paused_tasks : 2, 
        in_progress_tasks : 2, 
        progress_percentage : 34,
        members :   [   { username : "Jogy" , pivot : {can_create_tasks : "0" , can_assign_tasks : "0" , can_edit_tasks : "0" , can_create_tags : "0"}} ,
                        { username : "Freddy" , pivot : {can_create_tasks : "1" , can_assign_tasks : "1" , can_edit_tasks : "1" , can_create_tags : "1"}} 
                    ]
    }
]

const dashboardOverView = () => {
  return (
      <div className="w-screen h-screen m-2 drop-shadow-xl">
            <div className="font-bold pl-4 pt-3 bg-white w-full rounded-t-xl">Projektübersicht</div>
            <div className="flex w-full h-2/3 bg-white rounded-b-xl">
                <PieView tasks = {project_overview[0]} />
                <InfoView project = {project_overview[0]}/>             
            </div>
            <Absolut tasks = {project_overview[0]}/>
      </div>
    
  )
}

export default dashboardOverView