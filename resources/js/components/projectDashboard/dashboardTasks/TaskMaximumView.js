import React from 'react'

function TaskMaximumView(props){



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
                    <label> <span className="font-bold">{props.update}</span></label>
                </div>
            </div>
        </div>  
        
        <div className="flex justify-between">
            <div className="ml-8 pt-5 pb-2">
                <h1 className="font-bold">Tag:</h1>
                <div>{props.tag}</div>
            </div> 
            <button className="bg-red w-36 h-6 rounded-xl mr-12  mb-4 mt-auto text-white hover:font-bold drop-shadow-lg">Task abbrechen</button>
        </div>
    </div>
  )
}

export default TaskMaximumView