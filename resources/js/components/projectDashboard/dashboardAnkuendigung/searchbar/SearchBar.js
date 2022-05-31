import React from 'react'

import SearchField from './SearchField' 
import SortList from './SortList.js'

const SearchBar = () => {
  return (
    <div className="bg-blue rounded-xl h-20">
      <SearchField />
      <div className="flex">
        <SortList />
      </div>
    </div>
  )
}

export default SearchBar