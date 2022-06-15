import React, {useState} from 'react'
import axios from 'axios'

function DashboardAccountVerwalten(props) {

    const [firstName, setFirstName] = useState(props.user.user_firstName);
    const [lastName, setLastName] = useState(props.user.user_lastName);
    const [email, setEmail] = useState(props.user.user_email);

    const checkInputs = () => {
        firstName === props.user.user_firstName ? setFirstName(props.user.user_firstName) : "";
        lastName === props.user.user_lastName ? setLastName(props.user.user_lastName) : "";
        email === props.user.user_email ? setEmail(props.user.user_email) : "";
    }

    const changeInputs = () => {
        const url = "http://127.0.0.1:8000/api/user/"+props.user.user_id;

        checkInputs();
        
        const userData = {
            "fist_name" : firstName,
            "last_name" : lastName,
            "email" : email
        }

        axios.put(url, userData, {
            headers: { 
                'Accept': 'application/json',
                'Authorization' : 'Bearer ' + props.token
            }
        }).then(function(response) {
            alert("Benutzerdaten erfolgreich geändert");
            props.user.user_firstName = firstName;
            props.user.user_lastName = lastName;
            props.user.user_email = email;
        }).catch(function(error){
            alert(error.response.data.errors.email);
        });
    }
  
  return (
    <div className="flex flex-col w-full m-1 ml-2">
        
        <div className="w-full h-full bg-white">
          <h2 className="text-5xl pt-5 pl-9 pb-10">Profil</h2>

          <div className="w-full">
              <div className="mb-6 flex ml-3">
                  <label className="pr-4">Nutzername:</label>
                  <label className="pl-10 text-blue">{props.user.user_name}</label>
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