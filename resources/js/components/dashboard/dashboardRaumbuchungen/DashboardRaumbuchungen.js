import React from 'react'
import SearchBar from './searchbar/SearchBarRaumbuchungens'

function DashboardRaumbuchungen() {
  return (
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBar />
        
        <div>
          Raumbuchungen 
        </div>

    </div>
  )
}

export default DashboardRaumbuchungen