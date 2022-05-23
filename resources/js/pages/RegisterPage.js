import React from 'react'
import InputField from '../components/forms/inputField'
import Logo from '../../images/logo.jpg'
import {Link} from 'react-router-dom'

function RegisterPage() {
  return (
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="items-center"><img src= {Logo} alt="logo" className="h-16 w-16 mr-2 pl-2 float-left "></img></div>
        <div class="items-center"><h2 class="text-center pb-6 text-5xl">Registrieren</h2></div>
        <div class="w-full">
            <form class="bg-white shadow-md rounded-lg w-full px-10 pt-12 pb-14 mb-4">
            <div class="mb-4">
                <InputField id="name" placeholder="Name..."></InputField>
            </div>
            <div class="mb-6">
                <InputField id="email" placeholder="Email..."></InputField>
            </div>
            <div class="mb-4">
                <InputField id="username" placeholder="Username..."></InputField>
            </div>
            <div class="mb-4">
                <InputField id="password" placeholder="Passwort..."></InputField>
            </div>
            <div class="mb-4">
                <InputField id="password_again" placeholder="Passwort wiederholen..."></InputField>
            </div>
            <div class="flex items-center justify-end">
                <Link to='/login'><a class="inline-block align-baseline mr-16 font-bold text-sm text-blue-500 hover:text-blue" type="button">
                Bereits registriert?
                </a></Link>
                
                <button class="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="button">
                Registrieren
                </button>
                
            </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage