import React from 'react'

import Searchbar from './searchbar/SearchBar'

const dashboardAnkuendigung = () => {
  return (
      <div className="w-5/6 h-screen m-1 ml-2">
        <Searchbar />
        <div className="h-full w-full">Ankündigung</div>
      </div>
  )
}

export default dashboardAnkuendigung