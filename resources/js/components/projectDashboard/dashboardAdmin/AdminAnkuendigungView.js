import React, {useState} from 'react'
import axios from 'axios';

import Megaphone from '../../../../images/icons/megaphone.png'

const AdminAnkuendigungView = (props) => {
    const [subject , setSubject] = useState("");
    const [message , setMessage] = useState("");

    const handleAnnouncement = () => {
        const url = "http://sl-vinf-bordbame.hof-university.de:80/api/announcements";

        const announcment = {
            subject : subject,
            message : message,
            user_id : props.userID,
            project_id : props.projectID
        }

        axios.post(url, announcment, {
            headers: { 
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + props.token
            }
        }).then(function(response) {
            alert("Ankündigung veröffentlicht");
        }).catch(function(error){
            console.log(error.response.data);
        });
    }

  return (
    <div className="bg-white rounded-xl w-full h-1/3 drop-shadow-xl">
        <div className="flex flex-col h-5/6">
            <div className="font-bold ml-4 mt-2">Ankündigung erstellen</div>
            <div>
                <input type="text" placeholder="Titel.." onChange={e => {setSubject(e.target.value)}} className="font-bold ml-4 mt-2 outline-none w-11/12 bg-gray-200 p-1 rounded-md drop-shadow-md placeholder-gray-600"></input><br></br>
                <textarea type="text" rows="3" onChange={e => {setMessage(e.target.value)}} className="ml-4 mt-2 outline-none w-11/12 mr-5 rounded-md drop-shadow-md bg-gray-200 pl-1"></textarea>
            </div>
        </div>
        <div className="flex justify-end items-center h-1/6">
            <div className="flex justify-center bg-blue rounded-xl h-8 w-48 mb-2 mr-2">
                <img src={Megaphone} alt="Megaphone" className="h-5 w-5 mt-1.5 mr-3"></img>
                <button className="text-white hover:font-bold" onClick={handleAnnouncement}>Veröffentlichen</button>
            </div>
        </div>
    </div>
  )
}

export default AdminAnkuendigungView