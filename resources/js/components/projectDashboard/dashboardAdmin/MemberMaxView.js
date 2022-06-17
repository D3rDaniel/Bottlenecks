import React, {useState} from 'react'
import axios from 'axios'
import Kreuz from '../../../../images/icons/kreuz.png'

const MemberMaxView = (props) => {

    const [createTasks , setCreateTasks] = useState(props.member.pivot.can_create_tasks);
    const [assignTasks , setAssignTasks] = useState(props.member.pivot.can_create_tasks);
    const [editTasks , setEditTasks] = useState(props.member.pivot.can_create_tasks);
    const [createTags , setCreateTags] = useState(props.member.pivot.can_create_tasks);

/*     let createTasks = (props.member.pivot.can_create_tasks === 0) ? false : true;
    let assignTasks = (props.member.pivot.can_assign_tasks === "0") ? false : true;
    let editTasks = (props.member.pivot.can_edit_tasks === 0) ? false : true;
    let createTags = (props.member.pivot.can_create_tags === 0) ? false : true; */

    const handleCheckbox = (value, right) =>{
        value.target.checked === true ? value = 1 : value = 0;
        
        let changeData = {};
 
        switch(right){
            case 1: changeData = { can_create_tasks : value};
                    setCreateTasks(value);
                    break;
            case 2: changeData = { can_assign_tasks : value};
                    setAssignTasks(value);
                    break;
            case 3: changeData = { can_edit_tasks : value};
                    setEditTasks(value);
                    break;
            case 4: changeData = { can_create_tags : value};
                    setCreateTags(value);
                    break;
        }
        
        const url = "http://127.0.0.1:8000/api/project-member/"+props.member.pivot.id;
        axios.put(url, changeData , {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + props.token
            }
        }).then(function(response){
        }).catch(function(error){console.log(error);})
    }

    const deleteMember = () => {
        const url = "http://127.0.0.1:8000/api/project-member/"+props.member.pivot.id;

        axios.delete(url, {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + props.token
            }
        }).then(function() {
            alert("Mitglied wurde entfernt");
        }).catch(function(error){
            console.log(error.response.data);
        });
    }

  return (
    <div className="bg-gray-200 rounded-md -mt-5 shadow-bottom">
        <div className="mb-1 ml-4 pt-5"><label className="font-bold text-sm">Rechte</label></div>
        <div className="text-sm ml-4 pb-2 flex justify-between items-end">
            <div>
                <div>
                    <input type="checkbox" id="create Task" defaultChecked={createTasks} onChange={e => {handleCheckbox(e, 1)}}></input>
                    <label htmlFor="create Task" className="ml-2">Task erstellen</label>  
                </div>
    {/*         <div>
                    <input type="checkbox" id="assign Task" defaultChecked={assignTasks} onChange={e => {handleCheckbox(e.target.checked, 2)}}></input>
                    <label htmlFor="assign Task" className="ml-2">Task zuordnen</label>  
                </div> */}
                <div>
                    <input type="checkbox" id="edit Task" defaultChecked={editTasks} onChange={e => {handleCheckbox(e, 3)}}></input>
                    <label htmlFor="edit Task" className="ml-2">Task bearbeiten</label>  
                </div>
                <div>
                    <input type="checkbox" id="create Tag" defaultChecked={createTags} onChange={e => {handleCheckbox(e, 4)}}></input>
                    <label htmlFor="create Tag" className="ml-2">Tag erstellen</label>  
                </div>    
            </div>
            <div className="flex justify-center bg-red rounded-xl h-8 w-32 mr-3">
                <img src={Kreuz} alt="Kreuz" className="h-4 w-4 mt-2 mr-3"></img>
                <button className="text-white hover:font-bold" onClick={deleteMember}>Entfernen</button>
            </div> 
        </div>
    </div>
  )
}

export default MemberMaxView