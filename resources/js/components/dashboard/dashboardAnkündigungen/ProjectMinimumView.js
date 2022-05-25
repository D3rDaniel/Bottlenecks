import React, { useEffect, useState } from 'react'
import Arrow from '../../../../images/icons/arrow-black.jpg'
import TaskMaximumView from './ProjectMaximumView'
import { Link } from 'react-router-dom'

const ProjectMinimumView = ({project, created_at, title, description}) => {

    const [rotate, setRotate] = useState(0);

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
            
            
            <label className={`w-1/6 pl-12`}>{project}</label>
            <label className={`w-1/5 pl-14`}>{created_at}</label>
            <label className="w-1/4 pl-5">{title}</label>


            <div  className="flex ml-auto">
                <img src={Arrow} alt="maxView" className={`h-5 w-5 mr-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>            </div>
            </div>
        {rotate ? <TaskMaximumView description={description} /> : null}
    </div>
    
  )
}


export default ProjectMinimumView