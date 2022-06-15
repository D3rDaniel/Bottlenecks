import React, {useState} from 'react'
import axios from 'axios'

function DashboardAccountVerwalten(props) {
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const changeInputs = () => {
        const url = "http://127.0.0.1:8000/api/user/"+props.user.user_id;

        axios.put(url, {
            headers: { 
                'Accept': 'application/json',
                'Authorization' : props.token
            }
        }).then(function(response) {
            console.log(response);
        }).catch(function(error){
            console.log(error);
        });
    }
  
  return (
    <div className="flex flex-col w-full m-1 ml-2">
        
        <div className="w-full h-full bg-white">
          <h2 className="text-5xl pt-5 pl-9 pb-10">Profil</h2>

          <div className="w-full">
              <div className="mb-6 flex ml-3">
                  <label className="pr-4" htmlFor="username">Nutzername:</label>
                  <input type="text" onChange={e => setUserName(e.target.value)} placeholder={props.user.user_name} className="bg-gray-50 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
              </div>

              <div className="mb-6 flex ml-3">
                  <label className="pr-10" htmlFor="forename">Vorname:</label>
                  <input onChange={e => setFirstName(e.target.value)} type="text" placeholder={props.user.user_firstName} className="bg-gray-50 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>                
              </div>
              <div className="mb-6 flex ml-3">
                  <label className="pr-7 " htmlFor="lastname">Nachname:</label>
                  <input onChange={e => setLastName(e.target.value)} type="text" placeholder={props.user.user_lastName} className="bg-gray-50 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input> 
              </div>

              <div className="mb-20 flex ml-3">
                <label className="pr-[72px]">Email:</label>
                <input onChange={e => setEmail(e.target.value)} type="text" placeholder={props.user.user_email} className="bg-gray-50 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
              </div>

              <div className="flex justify-center">
                <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" onClick={changeInputs}>Änderungen speichern</button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default DashboardAccountVerwalten