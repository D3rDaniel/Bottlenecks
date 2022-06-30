import React from 'react'
import SearchField from './SearchField'
import SortList from './SortList.js'

const SearchBar = (props) => {
  const filterElements = (inputValue, filtered) => {
    props.filterElements(inputValue, filtered)
  }
  const sortElements = (event, rotate) => {
    props.sortElements(event, rotate)
  }
  return (
    <div className="bg-blue rounded-xl h-20">
      <div className="flex">
        <SearchField filterElements={filterElements}/>
      </div>
      
      <div className="flex">
        <SortList sortElements={sortElements}/>
      </div>
    </div>
  )
}

export default SearchBar