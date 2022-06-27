import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Arrow from '../../../../images/icons/arrow-black.png'
import TaskMaximumView from './ProjectMaximumViewAbgeschlosseneTasks'
import UserContext from '../../../store/user-context'
import ProjectContext from '../../../store/project-context'
import axios from 'axios'

const ProjectMinimumViewAbgeschlosseneTasks = (props) => {

    const [rotate, setRotate] = useState(0);

    const userCtx = useContext(UserContext);
    const projectCtx = useContext(ProjectContext);

    const navigate = useNavigate();

    const handleOpenProject = (id) => {
        const url = "http://127.0.0.1:8000/api/project/"+id;

        axios.get(url, {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + userCtx.user_token
            }
          })
            .then(function(response) {
                let project = response.data["project"]
              if(project){
                projectCtx.select(project.id, project.title, project.creator.username);
                navigate('/project');
            }
            else alert("Es ist ein Fehler beim Öffnen des dazugehörigem Projektes aufgetreten");
        });
        
    }

    const rotateArrow = () => { 
        if(rotate){
            setRotate(false);
        }else{
            setRotate(true);
        }
    }

  return (
    <div className="my-5 ml-1">
        <div className={`flex h-14 bg-white ${rotate ? null : "drop-shadow-md"} rounded-xl items-center`} >
            
            <div className="flex justify-around w-11/12 items-center">
                <div className="w-1/6 pl-5">{props.title}</div>
                <div className="w-1/6 pl-5">{props.project}</div>
                {/* <div className="">{props.created_at}</div> */}
                {/* <div className="">{props.deadline}</div> */}
                <div className="w-1/6 pl-12">{props.finished_at}</div>
                <div className="w-1/6 pl-12">{props.priority}</div>
                <div className="w-1/6 pl-12">{props.tag}</div>
                <div className="w-1/6 pl-12">{props.finished_state}</div>
            </div>
            <div className='w-1/12'>
                <button className="bg-blue w-28 h-6 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" type="button" onClick={function(){handleOpenProject(props.project_id)}}>Öffnen</button>
            </div>
            


            <div  className="flex ml-auto">
                <img src={Arrow} alt="maxView" className={`h-7 w-7 mx-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>            </div>
            </div>
        {rotate ? <TaskMaximumView title={props.fullTitle} description={props.description} room={props.room} finish_comment={props.finish_comment}/> : null}
    </div>
    
  )
}


export default ProjectMinimumViewAbgeschlosseneTasks