import {React, useState} from 'react'
import InputField from '../components/forms/InputField'
import Logo from '../../images/logo.jpg'
import {Link} from 'react-router-dom'

function RegisterPage() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [pwdConfirm, setPwdConfirm] = useState("")

  return (
    <div className="m-auto bg-white rounded-xl w-1/3 p-5">
        <div className='flex flex-row border-b-2 border-blue mb-5 pb-2'>
            <img src= {Logo} alt="logo" className='w-12 h-fit'></img>
            <div className="font-bold text-3xl mt-auto mb-auto">Registrieren</div>
        </div>
            <form className="p-5">
                <div className='mb-4 flex flex-row'>
                    <div className="pr-1">
                    <InputField id="first_name" placeholder="Vorname" onChange={setFirstName}></InputField>
                </div>
                <div className="pl-1">
                    <InputField id="last_name" placeholder="Nachname" onChange={setLastName}></InputField>
                </div>
                </div>
                
                <div className="mb-2">
                    <InputField id="email" placeholder="E-Mail" onChange={setEmail}></InputField>
                </div>
                <div className="mb-6">
                    <InputField id="username" placeholder="Nutzername" onChange={setUserName}></InputField>
                </div>
                <div className="mb-2">
                    <InputField id="password" placeholder="Passwort" onChange={setPassword}></InputField>
                </div>
                <div className="mb-6">
                    <InputField id="pwd_confirm" placeholder="Passwort bestätigen" onChange={setPwdConfirm}></InputField>
                </div>
                <div className="flex items-center justify-between">
                    <Link to="/Login" className='text-blue underline'>Du bist bereits registriert?</Link>
                    <button className="bg-blue hover:bg-darkblue text-white font-bold py-2 px-4 rounded-xl" type="button" onClick={function(){console.log(email + " " + password)}}>
                    Registrieren
                    </button>
                </div>
            </form>
    </div>
  )
}

export default RegisterPage