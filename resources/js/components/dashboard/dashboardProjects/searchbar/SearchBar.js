import React from 'react'
import SearchField from './SearchField'
import CheckboxList from './CheckboxList'
import SortList from './SortList.js'

const SearchBar = (props) => {
  const sortElements = () =>  {
    props.sortElements();
  }
  return (
    <div className="bg-blue rounded-xl h-20">
      <div className="flex">
        <SearchField />
        <CheckboxList />
      </div>
      
      <div className="flex">
        <SortList sortElements={sortElements}/>
      </div>
    </div>
  )
}

export default SearchBar