import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Arrow from '../../../../images/icons/arrow-black.png'
import TaskMaximumView from './TaskMaximumView'
import CompletionPopup from '../../dashboard/dashboardOffeneTasks/CompletionPopup';

function TaskMinimumView (props) {


    const [prioColor, setPrioColor] = useState("text-black");
    const [rotate, setRotate] = useState(0);
    const [popupTrigger, setPopupTrigger] = useState(false)


    const changePrioColor = () => {
        switch (props.prio) {
            case "Hoch":    setPrioColor("text-red") 
                            break;
            case "Mittel":  setPrioColor("text-yellow-500") 
                            break;
            case "Gering":  setPrioColor("text-green-600") 
                            break;
            default: break;
        }
    }


    const openAgain = () => {
        const url = "http://sl-vinf-bordbame.hof-university.de:80/api/task/"+props.id;
        axios.put(url,{status_id: 2},
            {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(res => {
            console.log(props.refresh)
            props.refresh();
        })
        .catch(error => console.log("error: ", error))  
    }
    const rotateArrow = () => {rotate ? setRotate(false) : setRotate(true)}


    useEffect(() => {
        changePrioColor();
    });

  return (
    <div className="my-5 ml-8 mr-8">
        <CompletionPopup id={props.id} deadline={props.date} refresh={props.refresh} trigger={popupTrigger} close={function(){setPopupTrigger(false)}}/>
        <div className={`flex h-14 bg-white ${rotate ? null : "drop-shadow-md"} rounded-xl items-center`} >
            <label className="ml-12 w-1/5">{props.title}</label>

            <label className="w-1/5">{props.status.title}</label>
            
            <label className={`w-1/5 ${prioColor}`}>{props.prio}</label>

            <label className="w-1/5">{props.date}</label>

            <div  className="flex ml-auto">
            {   
                props.view == "TaskView" ?
                    (props.status.id == 1 ? 
                    <>
                    <button className="bg-cyan-400 w-32 h-6 rounded-xl mr-4 text-white hover:font-bold drop-shadow-lg" onClick={openAgain}>Rückgängig</button>
                    </>
                    :
                    props.status.id == 2 ?
                        <>
                        <button className="bg-blue w-32 h-6 rounded-xl mr-4 text-white hover:font-bold drop-shadow-lg" onClick={setPopupTrigger}>Abschließen</button>
                        </>
                        :
                        <>
                        <button className="bg-orange-400 w-32 h-6 rounded-xl mr-4 text-white hover:font-bold drop-shadow-lg" onClick={openAgain}>Rückgängig</button>
                        </>)
                    : null    
        }
                <img src={Arrow} alt="maxView" className={`h-7 w-7 ml-auto mr-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img> 

            </div>
        </div>
        {rotate ? <TaskMaximumView view={props.view} refresh={props.refresh} title={props.fullTitle} description={props.description} comment={props.comment} assignee={props.assignee} creator={props.creator} updated_at={props.updated_at} tag={props.tag} status={props.status} token={props.token} id={props.id} onClick={props.onClick}></TaskMaximumView> : null}
    </div>
    
  )
}


export default TaskMinimumView