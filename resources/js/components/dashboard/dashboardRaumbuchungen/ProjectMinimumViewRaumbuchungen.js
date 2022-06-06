import React, { useEffect, useState } from 'react'
import Arrow from '../../../../images/icons/arrow-black.png'
import TaskMaximumView from './ProjectMaximumViewRaumbuchungen'

const ProjectMinimumViewRaumbuchungen = (props) => {

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
            
            <div className="flex justify-around w-11/12 items-center">
                <div className="w-1/6 pl-5">{props.roomname}</div>
                <div className="w-1/6 pl-5">{props.roomnumber}</div>
                <div className="w-1/6 pl-5">{props.created_at}</div>
                <div className="w-1/6 pl-12">{props.roomsize}</div>
                <div className="w-1/6 pl-12">{props.day_of_booking}</div>
                <div className="w-1/6 pl-12">{props.period}</div>
            </div>
            <div className='w-1/12'>
                <button className="bg-blue w-28 h-6 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" >{/*<Link to='/project'>Öffnen</Link>*/}Öffnen</button>
            </div>
            


            <div  className="flex ml-auto">
                <img src={Arrow} alt="maxView" className={`h-7 w-7 mx-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>            </div>
            </div>
        {rotate ? <TaskMaximumView description={props.description} equipment={props.equipment} open_at={props.open_at} full_address={props.full_address} /> : null}
    </div>
    
  )
}


export default ProjectMinimumViewRaumbuchungen