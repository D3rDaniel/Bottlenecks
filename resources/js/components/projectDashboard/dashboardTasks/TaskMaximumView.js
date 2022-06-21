import React from 'react'
import axios from 'axios';

function TaskMaximumView(props){

    const closeTask = () =>{
        const url = "http://127.0.0.1:8000/api/task/"+props.id;
        axios.delete(url,{
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(res => {
            console.log("res-close-delete: ", res)
            if(res.status == 201) alert("Task erfolgreich gelöscht")
            props.onClick() //rerender parent-component if possible 
        })
        .catch(error => console.log("error: ", error))    
    }

  return (
    <div className="bg-white rounded-xl -mt-5 shadow-bottom">        
        <div className="ml-8 pt-5">
            <h1 className="font-bold">{props.title}</h1>
            <div>{props.description}</div>
        </div>

        <div className="flex ml-8 mr-8 pt-5">
            <div className="w-1/3">
                <h1 className="font-bold">bearbeitet von:</h1>
                <div>{props.assignee["username"]}</div> 
            </div>
    
            <div className="w-1/3">
                <h1 className="font-bold">erstellt von: </h1>
                <label>{props.creator}</label>
            </div>

            <div className="w-1/3">
                <h1 className="font-bold">zuletzt aktualisiert:</h1>
                <div className="flex">
                    <label> <span className="font-bold">{props.updated_at}</span></label>
                </div>
            </div>
        </div>  
        
        <div className={props.status.id == 1? "flex" : "flex justify-between"}>
            <div className="ml-8 pt-5 pb-2 w-1/3">
                <h1 className="font-bold">Tag:</h1>
                <div>{props.tag}</div>
            </div>
            {props.status.id == 1 ?
            <div className="pt-5 pb-2 w-1/3">
                <h1 className='font-bold'>Abschlusskommentar:</h1>
                <div>{props.comment}</div>
            </div> : null}
            <div className="mr-12  mb-4 mt-auto">
                {props.status.id !== 1? <button className="bg-red w-36 h-6 rounded-xl text-white hover:font-bold drop-shadow-lg" onClick={closeTask}>Task abbrechen</button> : null }
            </div>
        </div>
    </div>
  )
}

export default TaskMaximumView