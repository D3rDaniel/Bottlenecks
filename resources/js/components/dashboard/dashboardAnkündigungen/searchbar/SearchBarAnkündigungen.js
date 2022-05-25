import React from 'react'
import SearchField from '../../dashboardProjects/searchbar/SearchField'
import SortList from './SortListAnkündigungen'

function SearchBarAnkündigungen() {
  return (
    <div className="bg-blue rounded-xl h-20">
      <div className="flex">
        <SearchField />
      </div>
      
      <div className="flex">
        <SortList />
      </div>
    </div>
  )
}

export default SearchBarAnkündigungen