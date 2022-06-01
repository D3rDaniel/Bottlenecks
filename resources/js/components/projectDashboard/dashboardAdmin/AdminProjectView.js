import React , {useState} from 'react'

import Pencil from '../../../../images/icons/stift.png'
import Kreuz from '../../../../images/icons/kreuz.png'

const AdminProjectView = (props) => {

    const [editButton , setEditButton] = useState(false);

    const changeView = () => { editButton ? setEditButton(false) : setEditButton(true)}

  return (
    <div className="bg-white rounded-xl w-full h-1/3 drop-shadow-xl">
        <div className="flex flex-col h-5/6">
            {editButton ? 
                <div>
                    <input type="text" placeholder={props.project[0].title} className="font-bold ml-4 mt-2 outline-none w-11/12 p-1 rounded-md drop-shadow-md bg-gray-200 placeholder-gray-600"></input><br></br>
                    <textarea type="text" rows="4" className="ml-4 mt-4 outline-none w-11/12 mr-5 rounded-md drop-shadow-md bg-gray-200 placeholder-gray-600">{props.project[0].description}</textarea> 
                </div>
            :
                <div>
                    <div className="font-bold ml-4 mt-2">{props.project[0].title}</div>
                    <div className="ml-4 mt-4">{props.project[0].description}</div>   
                </div>
            }
        </div>
        <div className="flex justify-end items-center h-1/6">
            {editButton ?
                <button className="bg-lightorange rounded-xl h-8 w-48 text-white hover:font-bold  mb-2 mr-2" onClick={changeView}>Speichern</button>
            :   
                <div className="flex justify-center bg-lightorange rounded-xl h-8 w-36 mb-2 mr-2">
                    <img src={Pencil} alt="stift" className="h-5 w-5 mt-1 mr-3"></img>
                    <button className="text-white hover:font-bold" onClick={changeView}>Bearbeiten</button> 
                </div>
            }
            <div className="flex justify-center bg-red rounded-xl h-8 w-44 mb-2 mr-2">
                <img src={Kreuz} alt="Kreuz" className="h-5 w-5 mt-1.5 mr-3"></img>
                <button className="text-white hover:font-bold">Projekt löschen</button>
            </div>
        </div>
    </div>
  )
}

export default AdminProjectView