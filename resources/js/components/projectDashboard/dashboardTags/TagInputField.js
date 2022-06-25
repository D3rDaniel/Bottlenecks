import axios from 'axios'
import React, { useState } from 'react'

import Plus from '../../../../images/icons/plus.png'

const TagInputField = (props) => {
  
  const [tag, setTag] = useState("");

  const addTagToProject = () => {
    const url = "http://127.0.0.1:8000/api/tag";

    const data = {
      "project_id" : props.projectID,
      "title" : tag
    }

    axios.post(url, data , {
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + props.token
      }
     })
    .then(function(response) {
        props.getData()
    }).catch(function(response){
      alert("Etwas ist schief gelaufen, versuche es erneut")
    })
  }

  return (
    <div className="flex drop-shadow-md">
        <input type="text" placeholder="Titel..."  onChange={ e => {setTag(e.target.value)}} className="bg-customgray w-full rounded-l-md pl-3 h-8 outline-none"></input>
        <div className="bg-blue rounded-r-md w-40 flex items-center hover:cursor-pointer">
            <img src={Plus} alt="plus" className="h-6 w-6 mx-2"></img>
            <button className="text-white hover:font-bold" onClick={addTagToProject}>Neuer Tag</button>
        </div>
    </div>
    
  )
}

export default TagInputField