import React from 'react'

const TaskMaximumView = ({title}) => {



  return (
    <div className="bg-white rounded-xl -mt-5 shadow-bottom">        
        <div className="ml-8 pt-5">
            <h1 className="font-bold">{title}</h1>
            <div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
        </div>

        <div className="flex ml-8 mr-8 pt-5">
            <div className="w-1/3">
                <h1 className="font-bold">bearbeitet von:</h1>
                <div>Person 1, Person 2, Person 3</div> 
            </div>
    
            <div className="w-1/3">
                <h1 className="font-bold">erstellt von: </h1>
                <label>Person 1</label>
            </div>

            <div className="w-1/3">
                <h1 className="font-bold">zuletzt aktualisiert:</h1>
                <div className="flex">
                    <label> <span className="font-bold">06.05.2022</span> von <span className="font-bold">Person2</span></label>
                </div>
            </div>
        </div>  
        
        <div className="flex justify-between">
            <div className="ml-8 pt-5 pb-2">
                <h1 className="font-bold">Tags:</h1>
                <div>#Tag1, #Tag2</div>
            </div> 
            <button className="bg-red w-36 h-6 rounded-xl mr-12  mb-4 mt-auto text-white hover:font-bold drop-shadow-lg">Task abbrechen</button>
        </div>
    </div>
  )
}

export default TaskMaximumView