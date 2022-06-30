import React from 'react'
import axios from 'axios'

const TagElement = (props) => {

  const removeTag = () =>{
    const url = "http://sl-vinf-bordbame.hof-university.de:80/api/tag/"+props.id;

    axios.delete(url,{
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + props.token
      }
     })
    .then(function(response) {
       props.refresh();
    }).catch(function(response){
        console.log(response);
    })
  }
  
  return (
    <div className="font-bold mb-5 h-12 flex justify-between items-center bg-gray-300 rounded-xl drop-shadow-xl">
      <label className="font-bold ml-2">#{props.name}</label>
      <button className="bg-red w-28 h-6 rounded-xl mr-5 text-white hover:font-bold drop-shadow-lg" onClick={removeTag}>Entfernen</button>
    </div>
  )
}

export default TagElement