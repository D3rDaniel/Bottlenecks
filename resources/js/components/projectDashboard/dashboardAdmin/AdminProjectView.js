import React , {useState} from 'react'
import axios from 'axios'

import Pencil from '../../../../images/icons/stift.png'
import Kreuz from '../../../../images/icons/kreuz.png'
import { useNavigate } from 'react-router-dom'

const AdminProjectView = (props) => {
    const navigate = useNavigate();

    const [editButton , setEditButton] = useState(false);
    const [newDueDate , setNewDueDate] = useState(props.project.due_date);
    const [newTitle, setNewTitle] = useState(props.project.title);
    const [newDescription, setNewDescription] = useState(props.project.description);

    const changeView = () => { editButton ? setEditButton(false) : setEditButton(true)}

    const handleNewData = () => {
        changeView();
        const url = "http://127.0.0.1:8000/api/project/"+props.project.id;

        const projectData = {
            title : newTitle,
            description : newDescription,
            due_date : newDueDate
        }

        axios.put(url, projectData, {
            headers: { 
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + props.token
            }
        }).then(function(response) {
            alert("Projektdaten erfolgreich geändert");
        }).catch(function(error){
            console.log(error.response.data);
        });
    }

    const deleteProject = () =>{
        const url = "http://127.0.0.1:8000/api/project/"+props.project.id;

        axios.delete(url, {
            headers: { 
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + props.token
            }
        }).then(function() {
            alert("Projekt wurde erfolgreich gelöscht");
            navigate('/');
        }).catch(function(error){
            console.log(error.response);
        });
    }


  return (
    <div className="bg-white rounded-xl w-full h-1/3 drop-shadow-xl">
        <div className="flex flex-col h-5/6">
            {editButton ? 
                <div>
                    <input type="text" placeholder={newTitle} onChange={e => {setNewTitle(e.target.value)}} className="font-bold ml-4 mt-2 outline-none w-11/12 p-1 rounded-md drop-shadow-md bg-gray-200 placeholder-gray-600"></input><br></br>
                    <textarea type="text" rows="4" placeholder={newDescription} onChange={e => {setNewDescription(e.target.value)}} className="ml-4 mt-4 outline-none w-11/12 mr-5 rounded-md drop-shadow-md bg-gray-200 placeholder-gray-600"></textarea> 
                </div>
            :
                <div>
                    <div className="font-bold ml-4 mt-2">{newTitle}</div>
                    <div className="ml-4 mt-4">{newDescription}</div>   
                </div>
            }
        </div>
        <div className="flex justify-between items-center h-1/6">
            <div className="flex">
                <div className="font-bold ml-4 mr-2">Fertigstellung bis:</div>
                {editButton ? <input type="date" onChange={e => {setNewDueDate(e.target.value)}}></input> : <div>{newDueDate}</div>}
            </div>
            <div className="flex">
                {editButton ?
                    <button className="bg-lightorange rounded-xl h-8 w-48 text-white hover:font-bold  mb-2 mr-2" onClick={handleNewData}>Speichern</button>
                :   
                    <div className="flex justify-center bg-lightorange rounded-xl h-8 w-36 mb-2 mr-2">
                        <img src={Pencil} alt="stift" className="h-5 w-5 mt-1 mr-3"></img>
                        <button className="text-white hover:font-bold" onClick={changeView}>Bearbeiten</button> 
                    </div>
                }
                <div className="flex justify-center bg-red rounded-xl h-8 w-44 mb-2 mr-2">
                    <img src={Kreuz} alt="Kreuz" className="h-5 w-5 mt-1.5 mr-3"></img>
                    <button className="text-white hover:font-bold" onClick={deleteProject} >Projekt löschen</button>
                </div>    
            </div>
        </div>
    </div>
  )
}

export default AdminProjectView