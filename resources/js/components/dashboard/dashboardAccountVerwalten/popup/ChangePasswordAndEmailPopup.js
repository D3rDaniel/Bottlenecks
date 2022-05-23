import React from 'react'
import InputField from '../../../forms/InputField'

function ChangeAccountPasswortAndEmail({trigger, onClick}) {
    return ( trigger) ? (
        <div class="w-screen h-screen rounded-lg bg-gray-400/[.7] fixed ">
            <div class="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                
                <div class="w-full">
                    <form class="bg-white shadow-md rounded-lg w-full px-10 pt-12 pb-14 mb-4 mx-20">
                        <h3 class="items-center mb-6 text-5xl font-body">Passwort oder Email ändern</h3>
                        <div class="mb-4">
                            <InputField id="oldPassword" placeholder="altes Passwort..."></InputField>
                        </div>
                        <div class="mb-6">
                            <InputField id="newPassword" placeholder="neues Passwort..."></InputField>
                        </div>
                        <div class="mb-6">
                            <InputField id="repeatnewPassword" placeholder="Passwort wiederholen..."></InputField>
                        </div>
                        <div class="mb-6">
                            <InputField id="email" placeholder="Email..."></InputField>
                        </div>
                        <div class="flex items-center justify-between">
                            <button onClick={onClick} class="bg-red hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="button">
                            Abbruch
                            </button>
                            <button class="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="button">
                            Erstellen
                            </button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
      ) : "";
}

export default ChangeAccountPasswortAndEmail