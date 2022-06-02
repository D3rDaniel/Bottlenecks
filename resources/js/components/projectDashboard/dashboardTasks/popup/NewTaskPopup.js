import axios from 'axios';
import React, {useEffect, useState} from 'react'
import DropDownSelect from '../../../forms/DropDownSelect';
import InputField from '../../../forms/InputField';
import TextArea from '../../../forms/TextArea';

function NewTaskPopup({trigger, onClick}) {

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

    { /* test if states are adapted
        useEffect(() => {   
        console.log("Worker:", worker)
        console.log("Room:", room)
        console.log("Priority:", priority)
        console.log("Tag:", tag)
        console.log("Title:", title)
        console.log("Deadline:", deadline)
        console.log("Description:", description)
        },[worker, room, priority, tag, title, deadline, description])
    */}
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {
            title: title,
            deadline: deadline,
            worker: worker,
            room: room,
            priority: priority,
            tag: tag
        }
        console.log(task)
       /*
       const url = "http://127.0.0.1:8000/api/project-member/"+props.ID; 
       axios.post(url, {task})
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        */
    }
    

  return ( trigger) ? (
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
                                <InputField id="projectDeadline" onChange={getDeadline} placeholder="Deadline..."></InputField>
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
                        <button onClick={onClick} className="bg-red hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="button">
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