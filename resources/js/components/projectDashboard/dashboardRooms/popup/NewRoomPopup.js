import React, {useEffect, useState} from 'react'
import InputField from '../../../forms/InputField';
import TextArea from '../../../forms/TextArea';
import TimeChooser from '../../../forms/TimeChooser';

function NewRoomPopup({trigger, onClick}) {

    const [name, setName] = useState();
    const [size, setSize] = useState();
    const [number, setNumber] = useState();
    const [open_at, setOpen_at] = useState();
    const [close_at, setClose_at] = useState();
    const [open_at_weekend, setOpen_at_weekend] = useState(false);
    const [description, setDescription] = useState();
    const [address, setAddress] = useState();
    const [equipment, setEquipment] = useState();

    const getName = (data) => {setName(data);}
    const getSize = (data) => {setSize(data);}
    const getNumber = (data) => {setNumber(data);}
    const getOpen_at = (data) => {setOpen_at(data); }
    const getClose_at = (data) => {setClose_at(data);}
    const getOpen_at_weekend = (event) => {
        if(event.target.checked){
            setOpen_at_weekend(true);
            console.log("should be true")
        }
        if(!event.target.checked){
            setOpen_at_weekend(false);
            console.log("should be false")
        }
    }
    const getDescription = (data) => {setDescription(data);}
    const getAddress = (data) => {setAddress(data);}
    const getEquipment = (data) => {setEquipment(data);}
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const room = {
            name: name,
            size: size,
            number: number,
            open_at: open_at,
            close_at: close_at,
            open_at_weekend: open_at_weekend,
            address: address,
            description: description,
            equipment: equipment,
        }
        console.log(room)
       /*
       const url = "http://127.0.0.1:8000/api/room/"; 
       axios.post(url, {room})
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
                <h3 className="items-center mb-6 text-5xl font-body">Raum erstellen</h3>

                        <div className="w-full h-full p-6">
                            <div className="flex justify-between p-4 mb-4">
                                <div><InputField  onChange={getName} placeholder="Name..."></InputField></div>
                                <div className="px-1"><InputField  onChange={getSize} placeholder="Größe..."></InputField></div>
                                <div className="px-1"><InputField  onChange={getNumber} placeholder="Nummer..."></InputField></div>
                            </div>
                            <div className="flex justify-center items-center p-4 mb-4">
                               {/* <div className="pr-3"><InputField  onChange={getOpen_at} placeholder="Öffnet um..."></InputField></div>
                                <div className="pl-3"><InputField  onChange={getClose_at} placeholder="Schließt um..."></InputField></div> */ }
                                <label className='p-2 mr-4'>Öffent um:</label>
                                <TimeChooser pickTime={getOpen_at} value={open_at}/>
                                <label className='p-2 mr-4'>Schließt um:</label>
                                <TimeChooser pickTime={getClose_at} value={close_at}/>
                            </div>
                            <div className="flex justify-center items-center  p-4 mb-4">
                                <input className="mr-6" id="weekend_checkbox" name="weekend_checkbox" type="checkbox" onChange={getOpen_at_weekend}/>
                                <label  htmlFor='weekend_checkbox'>Offen am Wochenende</label>
                            </div>
                            <div className="p-4 mb-4">
                                <InputField  onChange={getAddress} placeholder="Adresse..."></InputField>
                            </div>
                        </div>
                        <div className="flex justify-between p-6">
                            <div className="w-1/2 h-full p-6">
                                <TextArea onChange={getDescription} placeholder="Beschreibung..."></TextArea>
                            </div>
                            <div className="w-1/2 h-full p-6">
                                <TextArea onChange={getEquipment} placeholder="Ausstattung..."></TextArea>
                            </div>
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

export default NewRoomPopup