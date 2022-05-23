import React from 'react'

function ChangeEmailAndPasswordButton({onClick}) {
  return (
    <button class="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="button"
    onClick={onClick}>
                  Passwort / Email ändern
    </button>
  )
}

export default ChangeEmailAndPasswordButton