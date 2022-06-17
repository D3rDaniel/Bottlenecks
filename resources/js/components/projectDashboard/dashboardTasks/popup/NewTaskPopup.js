import axios from 'axios';
import React, {useEffect, useState} from 'react'
import DatePicker from 'react-date-picker';
import DropDownSelect from '../../../forms/DropDownSelect';
import InputField from '../../../forms/InputField';
import TextArea from '../../../forms/TextArea';

function NewTaskPopup(props) {

    const [worker, setWorker] = useState();
    const [room, setRoom] = useState();
    const [priority, setPriority] = useState();
    const [tag, setTag] = useState();
    const [title, setTitle] = useState();
    const [deadline, setDeadline] = useState();
    const [description, setDescription] = useState();

    const getRoom = (data) => {setRoom(data);}
    const getWorker = (data) => {setWorker(data);}
    const getPriority = (data) => {setPriority(data);}
    const getTag = (data) => {setTag(data);}
    const getTitle = (data) => {setTitle(data);}
    const getDeadline = (data) => {setDeadline(data);}
    const getDescription = (data) => {setDescription(data);}
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {
            title: title,
            deadline: deadline,
            worker: worker,
            room: room,
            priority: priority,
            tag: tag,
            description: description
        }
        console.log(task)

        const example = {
            assignee_user_id: 2,
            project_id: 51,
            title: "Test",
            description: "Test description bla 420 smoke weed",
            due_date: "2022-06-09",
            due_time: "12:14"
        }
       
       const url = "http://127.0.0.1:8000/api/task/"
       axios.post(url, example , {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.token
        }
       })
        .then(res => {
            if(res.status === 201){
                alert("Task wurder erfolgreich erstellt!");
            }else{
                alert("Es ist etwas schief gelaufen");
            }
            
        })
        .catch(error => console.log(error))
        
    }
    

  return ( props.trigger) ? (
    <div className="w-screen h-screen rounded-lg bg-gray-400/[.7] fixed ">
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            
            <div className="w-full">
                <form className="bg-white shadow-md rounded-lg w-full px-10 pt-12 pb-14 mb-4 mx-20" onSubmit={handleSubmit}>
                <h3 className="items-center mb-6 text-5xl font-body">Task erstellen</h3>

                    <div className="flex justify-between p-6">
                        <div className="w-1/2 h-full p-6">
                            <div className="mb-4">
                                <InputField id="projectTitle" onChange={getTitle} placeholder="Titel..."></InputField>
                            </div>
                            <div className="mb-6">
                                <label className="p-2 mr-4">Deadline: </label>
                                <DatePicker onChange={getDeadline} value={deadline} />
                            </div>
                            <div className="mb-6">
                                <DropDownSelect title={"Bearbeiter auswählen"} onChange={getWorker} options={["muss", "noch", "dynamisch", "geladen", "werden"]}/>
                            </div>
                        </div>
                        <div className="w-1/2 h-full p-6">
                            <div className="mb-4">
                                <DropDownSelect title={"Raum auswählen"} onChange={getRoom} options={["muss", "noch", "dynamisch", "geladen", "werden"]}/>
                            </div>
                            <div className="mb-6">
                                <DropDownSelect title={"Tag auswählen"} onChange={getTag} options={["muss", "noch", "dynamisch", "geladen", "werden"]}/>
                            </div>
                            <div className="mb-6">
                                <DropDownSelect title={"Priorität auswählen"} onChange={getPriority} options={["Hoch", "Mittel", "Niedrig"]}/>
                            </div>
                        </div>
                    </div>
                    
                    
                    
                    <div className="mb-6">
                        <TextArea id="description" onChange={getDescription} placeholder="Beschreibung..."></TextArea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button onClick={props.onClick} className="bg-red hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="button">
                        Abbruch
                        </button>
                        <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="submit">
                        Erstellen
                        </button>
                        
                        
                    </div>
                </form>
            </div>
        </div>
    </div>
  ) : "";
}

export default NewTaskPopup