import React, { useEffect, useState } from 'react'
import Arrow from '../../../../images/icons/arrow-black.jpg'
import TaskMaximumView from './TaskMaximumView'

const TaskMinimumView = ({title, status, prio, completedDate, date}) => {

    const [prioColor, setPrioColor] = useState("text-black");
    const [rotate, setRotate] = useState(0);

    const changePrioColor = () => {
        switch (prio) {
            case "Hoch":    setPrioColor("text-red") 
                            break;
            case "Mittel":  setPrioColor("text-yellow-500") 
                            break;
            case "Gering":  setPrioColor("text-green-600") 
                            break;
            default: break;
        }
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
        changePrioColor();
    });

  return (
    <div className="my-5 ml-8 mr-8">
        <div className={`flex h-14 bg-white ${rotate ? null : "drop-shadow-md"} rounded-xl items-center`} >
            <label className="ml-12 w-1/5">{title}</label>

            <label className="w-1/5">{status}</label>
            
            <label className={`w-1/5 ${prioColor}`}>{prio}</label>

            <label className="w-1/5">{completedDate}</label>

            <label className="w-1/5">{date}</label>

            <div  className="flex ml-auto">
                <button className="bg-blue w-32 h-6 rounded-xl mr-4 text-white hover:font-bold drop-shadow-lg">Abschließen</button>
                <img src={Arrow} alt="maxView" className={`h-5 w-5 mr-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>            </div>
            </div>
        {rotate ? <TaskMaximumView title={title}></TaskMaximumView> : null}
    </div>
    
  )
}


export default TaskMinimumView