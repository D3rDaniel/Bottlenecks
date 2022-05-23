import React from 'react'
import {BsFillPlusCircleFill} from 'react-icons/bs'

function CreateProjectButton({onClick, popupTrigger}) {
  return (
    <button className="bg-blue text-white w-40 h-8 m-2 mt-7 pt-0.5 px-2 flex align-center justify-center
                      hover:border-2 rounded-xl border-black hover:font-bold hover:cursor-pointer "
                      onClick={onClick}
    ><BsFillPlusCircleFill class="mt-1 mr-2"/>Neues Projekt</button>
  )
}

export default CreateProjectButton