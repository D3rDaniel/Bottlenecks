import React, { useEffect, useState } from 'react'
import Arrow from '../../../../images/icons/arrow-black.jpg'
import TaskMaximumView from './ProjectMaximumViewAbgeschlosseneTasks'

const ProjectMinimumViewAbgeschlosseneTasks = (props) => {

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
            
            <div class="flex justify-around w-11/12 items-center">
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
                <button className="bg-blue w-28 h-6 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" >{/*<Link to='/project'>Öffnen</Link>*/}Öffnen</button>
            </div>
            


            <div  className="flex ml-auto">
                <img src={Arrow} alt="maxView" className={`h-5 w-5 mx-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>            </div>
            </div>
        {rotate ? <TaskMaximumView title={props.fullTitle} description={props.description} room={props.room} finish_comment={props.finish_comment}/> : null}
    </div>
    
  )
}


export default ProjectMinimumViewAbgeschlosseneTasks