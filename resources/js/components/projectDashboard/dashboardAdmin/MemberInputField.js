import React, {useState} from 'react'
import axios from 'axios'

const MemberInputField = (props) => {
    const [member , setMember] = useState("");

    const addMember = () =>{
        const url= "http://127.0.0.1:8000/api/project/add-new-user"

        const memberData = {
            username : member,
            project_id : props.projectID,
            can_create_tasks : 0,
            can_edit_tasks : 0,
            can_create_tags : 0,
            can_create_announcements : 0
        }

        axios.post(url, memberData, {
            headers: { 
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + props.token
            }
        }).then(function(response) {
            props.getData()
        }).catch(function(error){
            console.log(error);
            alert("Bitte nur gütlige Nutzernamen eingeben!");
        });
    }

  return (
    <div className="mx-2 mb-2 flex drop-shadow-md">
    <input type="text" placeholder="Nutzernamen eingeben..." onChange={e => {setMember(e.target.value)}} className="bg-gray-200 placeholder-gray-600 w-full rounded-md pl-3 h-8 outline-none"></input>
    <div className="bg-blue rounded-r-md w-40 flex items-center justify-center hover:cursor-pointer">
        <button className="text-white hover:font-bold min-w-max text-sm" onClick={addMember}>hinzufügen</button>
    </div>
</div>
  )
}

export default MemberInputField