import React, { useEffect, useState } from 'react'
import Arrow from '../../../../images/icons/arrow-black.jpg'
import TaskMaximumView from './ProjectMaximumViewOffeneTasks'

const ProjectMinimumViewOffeneTasks = ({project, title, description, deadline, priority, tag, room}) => {

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
            
            <div class="flex justify-around w-4/5">
                <div className="">{title}</div>
                <div className="">{project}</div>
                <div className="">{deadline}</div>
                <div className="">{tag}</div>
                <div className="">{room}</div>
                <div className="">{priority}</div>
            </div>
            <div className='w-1/5'>
                <div className='flex justify-between'>
                    <button className="bg-amber-300 w-36 h-6 px-3 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" >{/*<Link to='/project'>Öffnen</Link>*/}in Bearbeitung</button>
                    <button className="bg-blue w-28 h-6 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" >{/*<Link to='/project'>Öffnen</Link>*/}Abschließen</button>
                </div>
                
            </div>
            


            <div  className="flex ml-auto">
                <img src={Arrow} alt="maxView" className={`h-5 w-5 mr-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>            </div>
            </div>
        {rotate ? <TaskMaximumView description={description} title={title} deadline={deadline} /> : null}
    </div>
    
  )
}


export default ProjectMinimumViewOffeneTasks