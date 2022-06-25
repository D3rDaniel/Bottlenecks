import {React, useContext} from 'react'
import UserContext from '../../../store/user-context';

const ProjectMaximumViewOffeneTasks = (props) => {

  const userCtx = useContext(UserContext)

  const closeTask = () => {
    const url = "http://127.0.0.1:8000/api/task/"+props.id;
    axios.put(url,{status_id: 4},
        {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userCtx.user_token
        }
    })
    .then(res => {
        if(res.status == 201) alert("Task erfolgreich abgeschlossen")
    })
    .catch(error => console.log("error: ", error))  
  }

  return (
  <div className="flex bg-white rounded-xl -mt-5 shadow-bottom">
    <div className="ml-8 w-1/2 py-5">
        <h1 className="font-bold">{props.title}</h1>
        <div>{props.description}</div>
    </div>
      <div className="flex justify-center w-1/2 p-3 pt-8">
        <div className="w-1/2 h-1/2 px-3">
          <h3 className="font-bold">Deadline</h3>
          <label>{props.deadline}</label>
        </div>
      </div>
      <div className="flex w-1/2 p-3 items-end">
        <div className='flex justify-end items-end'>
          {/*<button className="bg-amber-500 w-36 h-6 px-3 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" >Bearbeiten</button>*/}
          <button onClick={closeTask} className="bg-red w-40 h-6 rounded-xl text-white hover:font-bold drop-shadow-lg" >Task Abbrechen</button>
        </div>
      </div>
        
  </div>
  )
}

export default ProjectMaximumViewOffeneTasks