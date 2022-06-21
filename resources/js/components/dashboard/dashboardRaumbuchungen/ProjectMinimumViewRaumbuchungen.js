import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Arrow from '../../../../images/icons/arrow-black.png'
import TaskMaximumView from './ProjectMaximumViewRaumbuchungen'
import UserContext from '../../../store/user-context'
import ProjectContext from '../../../store/project-context'
import axios from 'axios'

const ProjectMinimumViewRaumbuchungen = (props) => {

    const [rotate, setRotate] = useState(0);

    const userCtx = useContext(UserContext);
    const projectCtx = useContext(ProjectContext);

    const navigate = useNavigate();

    const rotateArrow = () => { 
        if(rotate){
            setRotate(false);
        }else{
            setRotate(true);
        }
    }

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
                projectCtx.select(project.id, project.title, project.creator_user_id);
                alert("project set with id " + projectCtx.project_id + " data: " + project)
                navigate('/project/rooms');
            }
            else alert("Es ist ein Fehler beim Öffnen des dazugehörigem Projektes aufgetreten");
        });
        
    }

  return (
    <div className="my-5 ml-1">
        <div className={`flex h-14 bg-white ${rotate ? null : "drop-shadow-md"} rounded-xl items-center`} >
            
            <div className="flex justify-around w-11/12 items-center">
                <div className="w-1/6 pl-20">{props.title}</div>
                <div className="w-1/6 pl-20">{props.room_number}</div>
                <div className="w-1/6 pl-16">{props.created_at}</div>
                <div className="w-1/6 pl-20">{props.capacity}</div>
                <div className="w-1/6 pl-12">{props.reservation_date}</div>
                <div className="w-1/6 pl-12">{`${props.start_time} - ${props.end_time}` }</div>
            </div>
            <div className='w-1/12'>
                <button type="button" onClick={function(){handleOpenProject(props.project)}} className="bg-blue w-28 h-6 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" >{/*<Link to='/project'>Öffnen</Link>*/}Öffnen</button>
            </div>
            <div  className="flex ml-auto">
                <img src={Arrow} alt="maxView" className={`h-7 w-7 mx-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>            </div>
            </div>
        {rotate ? <TaskMaximumView description={props.description} equipment_info={props.equipment_info}
                                opening_time={props.opening_time} closing_time={props.closing_time} address_info={props.address_info} id={props.id} token={props.token} onClick={props.onClick}/> : null}
    </div>
    
  )
}


export default ProjectMinimumViewRaumbuchungen