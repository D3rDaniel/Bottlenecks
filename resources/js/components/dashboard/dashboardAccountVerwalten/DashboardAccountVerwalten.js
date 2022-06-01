import React, {useState} from 'react'
import InputField from '../../forms/InputField'
import ChangeEmailAndPasswordButton from './ChangeEmailAndPasswordButton'
import ChangePasswordAndEmailPopup from './popup/ChangePasswordAndEmailPopup'

function DashboardAccountVerwalten() {
  const [popupTrigger, setPopupTrigger] = useState(false)
  const changePopupTriggerValue = () => {
    setPopupTrigger(!popupTrigger)
  }
  return (
    <div className="flex flex-col w-full m-1 ml-2">
        
        <div className="w-full h-full bg-white">
        <ChangePasswordAndEmailPopup trigger={popupTrigger} onClick={changePopupTriggerValue} />
          <h2 className="text-5xl pt-5 pl-9">Profil</h2>
          <div className="w-full">
            <form className="bg-white shadow-md rounded-lg w-720 px-10 pt-12 pb-14 mb-4">
              <div className="mb-4">
                <div className="flex">
                  <label className="pr-4" htmlFor="username">Nutzername:</label>
                  <InputField id="username" value="person123"></InputField>
                </div>
                
              </div>
              <div className="mb-4">
                  <label className="pr-4">Passwort:</label>
              </div>
              <div className="mb-6">
                <div className="flex">
                  <label className="pr-10" htmlFor="forename">Vorname:</label>
                  <InputField id="forename" value="Max"></InputField>
                </div>
                  
              </div>
              <div className="mb-6">
                <div className="flex">
                  <label className="pr-7" htmlFor="lastname">Nachname:</label>
                  <InputField className="w-36" id="lastname" value="Mustermann"></InputField>
                </div>
                  
              </div>
              <div className="mb-16">
              <label className="pr-4">Email:</label>
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="button">
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