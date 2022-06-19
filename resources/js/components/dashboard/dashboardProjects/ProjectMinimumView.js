import React, { useEffect, useState, useContext } from 'react'
import Arrow from '../../../../images/icons/arrow-black.png'
import TaskMaximumView from './ProjectMaximumView'
import { Link, useNavigate } from 'react-router-dom'
import Progressbar from '../../../progressBar'
import ProjectContext from '../../../store/project-context'
import axios from 'axios'

const ProjectMinimumView = (props) => {


    const projectCtx = useContext(ProjectContext);
    const navigate = useNavigate();

    function handleOpenProject(){
        projectCtx.select(props.id, props.fullTitle, props.creator);
        navigate("/project")
    }

    const [creatorUser, setCreatorUser] = useState();
    const [progressCompleted, setProgressCompleted] = useState("w-0%")
    const [rotate, setRotate] = useState(0);

    const fillProgressBar = () => {
        let progressString = Math.round(props.progress).toString();
        setProgressCompleted("w-"+ progressString + "%");
    }

    const getUsernameFromUserID = () => {
        const url = "http://127.0.0.1:8000/api/user/"+props.creator+"/name"; //api not done yet prob.
        axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + props.token
              }
        })
        .then(res => setCreatorUser(res))
    }

    const rotateArrow = () => { 
        if(rotate){
            setRotate(false);
        }else{
            setRotate(true);
        }
    }

    useEffect(() => {
        fillProgressBar();
        getUsernameFromUserID(); //wait for api
    });

  return (
    <div className="my-5 ml-1">
        <div className={`flex h-14 bg-white ${rotate ? null : "drop-shadow-md"} rounded-xl items-center`} >
            <label className="ml-16 pl-3 w-1/5">{props.title}</label>

            <label className="w-1/5 ml-3">{props.creator}</label>

            <div className="w-1/5 mr-5">
                <Progressbar progressPercentage = {props.progress} />
            </div>
            
            <label className={`w-1/5`}>{props.startDate}</label>

            <label className="w-1/5">{props.date}</label>

            <div  className="flex ml-auto">
                <button type='button' onClick={handleOpenProject} className="bg-blue w-28 h-6 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" ><Link to='/project'>Öffnen</Link></button>
                <img src={Arrow} alt="maxView" className={`h-7 w-7 mr-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>            </div>
            </div>
        {rotate ? <TaskMaximumView title={props.fullTitle} description={props.description}/> : null}
    </div>
    
  )
}


export default ProjectMinimumView