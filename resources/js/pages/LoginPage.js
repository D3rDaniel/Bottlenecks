import {React, useContext, useState} from 'react';
import InputField from '../components/forms/InputField';
import Logo from '../../images/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../store/user-context';
import axios from 'axios';



function LoginPage() {

    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    function checkInput(){
        let emailIsValid = String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );

        let passwordIsValid = (password.length >= 8)

        if(emailIsValid && passwordIsValid) return true
        else {
            return true
        }
    }

    function handleLogin(){
        if(checkInput()){
            const loginData = {
                "email" : email,
                "password" : password
            }

            const url = "http://sl-vinf-bordbame.hof-university.de:80/api/login";
            axios.post(url, loginData).then(function(response){
                if(response.data.success == true) {
                    userCtx.login(response.data.username.id, response.data.username.username, response.data.username.email, response.data.username.first_name, response.data.username.last_name, response.data.bearer_token);
                    navigate('/');
                }
                else alert("Anmeldung fehlgeschlagen!");
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response)
                    if(error.response.status == 401){
                        setError(true)
                        alert("Anmeldung fehlgeschlagen, falsches Password.")
                    } 
                    if(error.response.status == 422) {
                        setError(true)
                        alert("Anmeldung fehlgeschlagen, kein Benutzer mit dieser Email gefunden.")
                    }
                }
                
            })
        }
        else alert("Eingabe ist ung??ltig!");
    }

  return (
    <div className="m-auto bg-white rounded-xl w-1/3 p-5">
        <div className='flex flex-row border-b-2 border-blue mb-5 pb-2'>
            <img src= {Logo} alt="logo" className='w-12 h-fit'></img>
            <div className="font-bold text-3xl mt-auto mb-auto">Anmelden</div>
        </div>
            <form className=" p-5">
                <div className="mb-4">
                    <InputField id="email" placeholder="Email" onChange={setEmail}></InputField>
                </div>
                <div className="mb-6">
                    <InputField error={error} id="password" placeholder="Passwort" onChange={setPassword} type="password"></InputField>
                </div>
                <div className="flex items-center justify-between">
                    <Link to="/Register" className='text-blue underline'>Du hast noch keinen Account?</Link>
                    <button className="bg-blue hover:bg-darkblue text-white font-bold py-2 px-4 rounded-xl" type="button" onClick={handleLogin}>
                    Login
                    </button>
                </div>
            </form>
    </div>
  )
}

export default LoginPage