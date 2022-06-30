import React from 'react'
import Logo from '../../../../images/logo.jpg'

function DashboardInfo() {
  return (
    <div className='h-full w-full px-10 pt-6 bg-white'>
        <div className="mb-6">
          <div className="p-2 mb-6">
            <img src= {Logo} alt="logo" className="h-16 w-16 mr-2 pl-2"></img>
            <p className="mb-2 text-orange-500">Version 1.0</p>
          </div>
            <p className="mb-2">Entwickler</p>
            <p className="mb-2">Johannes Matus</p>
            <p className="mb-2">Eugen Kudraschow</p>
            <p className="mb-2">Daniel Vogel</p>
            <p className="mb-2">Dejan Fraas</p>
            <p className="mb-2">Sebastian Bär</p>
        </div>
        <div >
            <p className="mb-2">Sommersemester 2022</p>
            <p className="mb-2">Hochschule Hof</p>
            <p className="mb-2">Informatik</p>
        </div>
    </div>
  )
}

export default DashboardInfo