import React from 'react'

import InputField from '../components/forms/InputField'
import Logo from '../../images/logo.jpg'

function LoginPage() {
  return (
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="items-center"><img src= {Logo} alt="logo" className="h-16 w-16 mr-2 pl-2 float-left "></img></div>
        <div class="items-center"><h2 class="text-center pb-6 text-5xl">Anmelden</h2></div>
        <div class="w-full">
            <form class="bg-white shadow-md rounded-lg w-720 px-10 pt-1 pb-14 mb-4">
            <div class="mb-4">
                <InputField id="email" placeholder="Email"></InputField>
            </div>
            <div class="mb-6">
                <InputField id="password" placeholder="Passwort"></InputField>
            </div>
            <div class="flex items-center justify-between">
                <a class="inline-block align-baseline font-bold text-sm mr-16 text-blue-500 hover:text-blue-800" href="#">
                Passwort vergessen?
                </a>
                <button class="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="button">
                Login
                </button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage