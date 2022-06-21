import React, { useEffect, useState } from 'react'
import Arrow from '../../../../images/icons/arrow-black.png'
import CompletionPopup from './CompletionPopup';
import TaskMaximumView from './ProjectMaximumViewOffeneTasks'

const ProjectMinimumViewOffeneTasks = (props) => {

    const [rotate, setRotate] = useState(0);
    const [popupTrigger, setPopupTrigger] = useState(false)

    const rotateArrow = () => { 
        if(rotate){
            setRotate(false);
        }else{
            setRotate(true);
        }
    }

  return (
    <div className="my-5 ml-1 z-0">
        <CompletionPopup id={props.id} deadline={props.deadline} trigger={popupTrigger} close={function(){setPopupTrigger(false)}}/>
        <div className={`flex justify-evenly h-14 bg-white ${rotate ? null : "drop-shadow-md"} rounded-xl items-center`} >
            
            <div className="flex justify-around w-4/5">
                <div className="">{props.title}</div>
                <div className="">{props.project}</div>
                <div className="">{props.deadline}</div>
                <div className="">{props.tag}</div>
                {/*<div className="">{props.room}</div>*/}
                <div className="">{props.priority}</div>
            </div>
            <div className=''>
                <div className='flex justify-between'>
                    <button className="bg-amber-300 w-36 h-6 px-3 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" >in Bearbeitung</button>
                    <button onClick={function(){setPopupTrigger(true)}} className="bg-blue w-28 h-6 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" >Abschließen</button>
                </div>
                
            </div>
            


            <div  className="flex ml-auto">
                <img src={Arrow} alt="maxView" className={`h-7 w-7 mr-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>            </div>
            </div>
        {rotate ? <TaskMaximumView id={props.id} description={props.description} title={props.fullTitle} deadline={props.deadline} /> : null}
    </div>
    
  )
}


export default ProjectMinimumViewOffeneTasks