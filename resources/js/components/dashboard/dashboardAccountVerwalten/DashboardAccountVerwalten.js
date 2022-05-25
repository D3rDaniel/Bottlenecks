import React, {useState} from 'react'
import InputField from '../../forms/inputField'
import ChangeEmailAndPasswordButton from './ChangeEmailAndPasswordButton'
import ChangePasswordAndEmailPopup from './popup/ChangePasswordAndEmailPopup'

function DashboardAccountVerwalten() {
  const [popupTrigger, setPopupTrigger] = useState(false)
  const changePopupTriggerValue = () => {
    setPopupTrigger(!popupTrigger)
  }
  return (
    <div className="flex flex-col w-full m-1 ml-2">
        
        <div class="w-full h-full bg-white">
        <ChangePasswordAndEmailPopup trigger={popupTrigger} onClick={changePopupTriggerValue} />
          <h2 class="text-5xl pt-5 pl-9">Profil</h2>
          <div class="w-full">
            <form class="bg-white shadow-md rounded-lg w-720 px-10 pt-12 pb-14 mb-4">
              <div class="mb-4">
                <div class="flex">
                  <label class="pr-4" for="username">Nutzername:</label>
                  <InputField id="username" value="person123"></InputField>
                </div>
                
              </div>
              <div class="mb-4">
                  <label class="pr-4">Passwort:</label>
              </div>
              <div class="mb-6">
                <div class="flex">
                  <label class="pr-10" for="forename">Vorname:</label>
                  <InputField id="forename" value="Max"></InputField>
                </div>
                  
              </div>
              <div class="mb-6">
                <div class="flex">
                  <label class="pr-7" for="lastname">Nachname:</label>
                  <InputField class="w-36" id="lastname" value="Mustermann"></InputField>
                </div>
                  
              </div>
              <div class="mb-16">
              <label class="pr-4">Email:</label>
              </div>
              <div class="flex items-center justify-between">
                <button class="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="button">
                  Änderungen speichern
                </button>
                <ChangeEmailAndPasswordButton onClick={changePopupTriggerValue}/>
              </div>
            </form>
          </div>
          
        </div>

    </div>
  )
}

export default DashboardAccountVerwalten