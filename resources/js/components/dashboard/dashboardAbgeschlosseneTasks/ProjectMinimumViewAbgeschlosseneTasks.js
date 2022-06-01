import React, { useEffect, useState } from 'react'
import Arrow from '../../../../images/icons/arrow-black.jpg'
import TaskMaximumView from './ProjectMaximumViewAbgeschlosseneTasks'

const ProjectMinimumViewAbgeschlosseneTasks = ({project, created_at, title, description, deadline, finished_at, finished_state, priority, tag, finish_comment, room}) => {

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
        <div className={`flex justify-evenly h-14 bg-white ${rotate ? null : "drop-shadow-md"} rounded-xl items-center`} >
            
            <div className="flex justify-around w-11/12">
                <div className="">{title}</div>
                <div className="">{project}</div>
                <div className="">{created_at}</div>
                <div className="">{deadline}</div>
                <div className="">{finished_at}</div>
                <div className="">{priority}</div>
                <div className="">{tag}</div>
                <div className="">{finished_state}</div>
            </div>
            <div className='w-1/12'>
                <button className="bg-blue w-28 h-6 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" >{/*<Link to='/project'>Öffnen</Link>*/}Öffnen</button>
            </div>
            


            <div  className="flex ml-auto">
                <img src={Arrow} alt="maxView" className={`h-5 w-5 mr-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>            </div>
            </div>
        {rotate ? <TaskMaximumView description={description} room={room} finish_comment={finish_comment}/> : null}
    </div>
    
  )
}


export default ProjectMinimumViewAbgeschlosseneTasks