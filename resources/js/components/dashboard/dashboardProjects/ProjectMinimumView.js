import React, { useEffect, useState } from 'react'
import Arrow from '../../../../images/icons/arrow-black.jpg'
import TaskMaximumView from './ProjectMaximumView'

const ProjectMinimumView = ({title, creator, progress, startDate, date}) => {

    const [progressCompleted, setProgressCompleted] = useState("w-0%")
    const [rotate, setRotate] = useState(0);

    const fillProgressBar = () => {
        let progressString = Math.round(progress).toString();
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
    <div className="my-5 ml-8">
        <div className={`flex h-14 bg-white ${rotate ? null : "drop-shadow-md"} rounded-xl items-center`} >
            <div className="ml-12 w-1/5">
                {title}
            </div>

            <div className="w-1/5">
                {creator}
            </div>

            <div className="w-1/5">
                <div className="bg-gray-300 rounded-full h-4 text-xs w-5/6 text-center">
                    <div className={`${progressCompleted} bg-green-400 rounded-full`}>
                        {progress}%
                    </div>
                </div>
            </div>
            
            <div className={`w-1/5`}>
                {startDate}
            </div>

            <div className="w-1/5" onClick={test}>
                {date}
            </div>

            <img src={Arrow} alt="maxView" className={`h-5 w-5 mr-3 ml-auto hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>
        </div>
        {rotate ? <TaskMaximumView /> : null}
    </div>
    
  )
}


export default ProjectMinimumView