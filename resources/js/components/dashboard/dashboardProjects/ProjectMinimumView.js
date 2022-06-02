import React, { useEffect, useState } from 'react'
import Arrow from '../../../../images/icons/arrow-black.png'
import TaskMaximumView from './ProjectMaximumView'
import { Link } from 'react-router-dom'
import Progressbar from '../../../progressBar'

const ProjectMinimumView = (props) => {

    const [progressCompleted, setProgressCompleted] = useState("w-0%")
    const [rotate, setRotate] = useState(0);

    const fillProgressBar = () => {
        let progressString = Math.round(props.progress).toString();
        setProgressCompleted("w-"+ progressString + "%");
    }

    const rotateArrow = () => { 
        if(rotate){
            setRotate(false);
        }else{
            setRotate(true);
        }
    }

    //TestMethode 
    const test = () => {
        console.log(rotate);
    }

    useEffect(() => {
        fillProgressBar();
    });

  return (
    <div className="my-5 ml-1">
        <div className={`flex h-14 bg-white ${rotate ? null : "drop-shadow-md"} rounded-xl items-center`} >
            <label className="ml-16 pl-3 w-1/5">{props.title}</label>

            <label className="w-1/5 ml-3">{props.creator}</label>

            <div className="w-1/5 mr-5">
                {/* <div className="bg-gray-300 rounded-full h-4 text-xs w-5/6 text-center">
                    <div className={`${progressCompleted} bg-green-400 rounded-full`}>
                        {props.progress}%
                    </div>
                </div> */}
                <Progressbar progressPercentage = {props.progress} />
            </div>
            
            <label className={`w-1/5`}>{props.startDate}</label>

            <label className="w-1/5">{props.date}</label>

            <div  className="flex ml-auto">
                <button className="bg-blue w-28 h-6 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" ><Link to='/project'>Öffnen</Link></button>
                <img src={Arrow} alt="maxView" className={`h-7 w-7 mr-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>            </div>
            </div>
        {rotate ? <TaskMaximumView title={props.fullTitle} description={props.description}/> : null}
    </div>
    
  )
}


export default ProjectMinimumView