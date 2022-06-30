import React, {useEffect, useState, useContext} from 'react'
import InputField from '../../../forms/InputField';
import TextArea from '../../../forms/TextArea';
import UserContext from '../../../../store/user-context'
import ProjectContext from '../../../../store/project-context';
import axios from 'axios';

function NewRoomPopup(props) {
    const user = useContext(UserContext);
    const project = useContext(ProjectContext);

    const [name, setName] = useState();
    const [size, setSize] = useState();
    const [number, setNumber] = useState();
    const [open_at, setOpen_at] = useState();
    const [close_at, setClose_at] = useState();
    const [open_at_weekend, setOpen_at_weekend] = useState(0);
    const [description, setDescription] = useState();
    const [address, setAddress] = useState();
    const [equipment, setEquipment] = useState();

    const getName = (data) => {setName(data);}
    const getSize = (data) => {setSize(data);}
    const getNumber = (data) => {setNumber(data);}

    const getOpen_at_weekend = (event) => {
        if(event.target.checked){
            setOpen_at_weekend(1);
        }

        if(!event.target.checked){
            setOpen_at_weekend(0);
        }
    }

    const getDescription = (data) => {setDescription(data);}
    const getAddress = (data) => {setAddress(data);}
    const getEquipment = (data) => {setEquipment(data);}
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const room = {
            title: name,
            capacity: size,
            room_number: number,
            opening_time: open_at,
            closing_time: close_at,
            opened_on_weekends: open_at_weekend,
            address_info: address,
            description: description,
            equipment_info: equipment,
            project_id: project.project_id
        }

       const url = "http://sl-vinf-bordbame.hof-university.de:80/api/room"; 
        axios.post(url, room, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + user.user_token
            }
        })
        .then(res => {
            if(res.status === 201){
                props.onClick();
                props.refresh();
            }else{
                alert("Es ist etwas schief gelaufen");
                props.onClick();
                props.refresh();
            }
            
        })
        .catch(error => {
            alert("Bitte überprüfe deine Eingaben auf Richtigkeit. ")
        })
    }

  return ( props.trigger) ? (
    <div className="fixed top-0 right-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-10">
        <div className="relative bg-white shadow-md rounded-lg p-5 flex flex-col m-auto w-1/2">
            <h3 className="text-center text-xl font-bold mb-3">Raum erstellen</h3>
            <div className='flex flex-row pb-4'>
                <div className='flex flex-col w-3/5 pr-2'>
                    <div className='h-1/6 justify-center items-center'><InputField  onChange={getName} placeholder="Name..."></InputField></div>
                    <div className='h-1/6 justify-center items-center'><InputField  onChange={getSize} placeholder="Größe..."></InputField></div>
                    <div className='h-1/6 justify-center items-center'><InputField  onChange={getNumber} placeholder="Nummer..."></InputField></div>
                    <div className='flex flex-row h-1/6 items-center justify-center'>
                        <label className='my-auto mr-1 font-bold'>Öffnet um:</label>
                        <input type="time" onChange={e => {setOpen_at(e.target.value+":00")}}></input>
                    </div>
                    <div className='flex flex-row h-1/6 items-center justify-center'>
                        <label className='font-bold my-auto mr-1'>Schließt um:</label>
                        <input type="time" onChange={e => {setClose_at(e.target.value+":00")}}></input>
                    </div>
                    <div className='flex flex-row h-1/6 items-center justify-center'>
                        <label className="mr-2 my-auto" htmlFor='weekend_checkbox'>Offen am Wochenende</label>
                        <input id="weekend_checkbox" name="weekend_checkbox" type="checkbox" onChange={getOpen_at_weekend}/>
                    </div>
                </div>
                <div className='flex flex-col w-2/5 pl-4'>
                    <div className='pb-2'><TextArea onChange={getDescription} placeholder="Beschreibung..."></TextArea></div>
                    <div className='pt-2'><TextArea onChange={getEquipment} placeholder="Ausstattung..."></TextArea></div>
                </div>
            </div>
            <div className='flex flex-row'>
                <div className='w-2/3'><InputField  onChange={getAddress} placeholder="Adresse..."/></div>
                <button className='bg-red rounded-xl p-1 text-white ml-auto' onClick={props.onClick}>Abbrechen</button>
                <button className='bg-blue rounded-xl p-1 text-white mx-2' onClick={handleSubmit}>Erstellen</button>
            </div>
        </div>
    </div>
  ) : "";
}

export default NewRoomPopup