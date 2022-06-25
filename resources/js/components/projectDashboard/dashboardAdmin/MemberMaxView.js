import React, {useState , useEffect} from 'react'
import axios from 'axios'

const MemberMaxView = (props) => {
    const url = "http://127.0.0.1:8000/api/project-member/"+props.member.pivot.id;

    const [createTasks , setCreateTasks] = useState(props.member.pivot.can_create_tasks);
    const [editTasks , setEditTasks] = useState(props.member.pivot.can_edit_tasks);
    const [createTags , setCreateTags] = useState(props.member.pivot.can_create_tags);
 
    const handleCheckbox = (value, right) =>{
        value.target.checked === true ? value = 1 : value = 0;
        
        let changeData = {};
 
        switch(right){
            case 1: changeData = { can_create_tasks : value};
                    setCreateTasks(value);
                    break;
            case 2: changeData = { can_edit_tasks : value};
                    setEditTasks(value);
                    break;
            case 3: changeData = { can_create_tags : value};
                    setCreateTags(value);
                    break;
        }
        
        axios.put(url, changeData , {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + props.token
            }
        }).then(function(response){
        }).catch(function(error){console.log(error);})
    }

    const deleteMember = () => {
        axios.delete(url, {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + props.token
            }
        }).then(function() {
            props.getData()
        }).catch(function(error){
            console.log(error.response.data);
        });
    }

  return (
    <div className="bg-gray-200 rounded-md -mt-5 shadow-bottom">
        <div className="mb-1 ml-4 pt-5"><label className="font-bold text-sm">Rechte</label></div>
        <div className="text-sm ml-4 pb-2">
            <div>
                <div>
                    <input type="checkbox" id="create Task" defaultChecked={createTasks} onChange={e => {handleCheckbox(e, 1)}}></input>
                    <label htmlFor="create Task" className="ml-2">Task erstellen</label>  
                </div>
                <div>
                    <input type="checkbox" id="edit Task" defaultChecked={editTasks} onChange={e => {handleCheckbox(e, 2)}}></input>
                    <label htmlFor="edit Task" className="ml-2">Task bearbeiten</label>  
                </div>
                <div>
                    <input type="checkbox" id="create Tag" defaultChecked={createTags} onChange={e => {handleCheckbox(e, 3)}}></input>
                    <label htmlFor="create Tag" className="ml-2">Tag erstellen</label>  
                </div>    
            </div>
            <div className="flex justify-end h-8 mt-5" onClick={deleteMember}>
                <button className="text-white  mx-2 w-1/3 bg-red border border-black rounded-md">entfernen</button>
            </div> 
        </div>
    </div>
  )
}

export default MemberMaxView