import React from 'react'

const TaskMaximumView = () => {
  return (
    <div className="bg-white rounded-xl -mt-5 shadow-bottom">
        <div className="flex">
            <div className="ml-8 pt-5">
                <h1 className="font-bold">Titel-Task</h1>
                <div>test.sdf..sdf.sfd.fsd.sfd</div>
            </div>
            <div className="ml-auto mr-72 pt-5">
                <h1 className="font-bold">Personen:</h1>
                <div>Person 1, Person 2, Person 3</div>
            </div>  
        </div>

        <div>
            <div className="ml-8 pt-5 pb-2">
                <h1 className="font-bold">Tags:</h1>
                <div>#Tag1, #Tag2</div>
            </div> 
        </div>

    </div>
  )
}

export default TaskMaximumView