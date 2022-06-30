import React from 'react'
import SearchField from './SearchField'
import CheckboxList from './CheckboxList'
import SortList from './SortList'

const SearchBar = (props) => {
  const sortElements = (event, rotate) =>  {
    props.sortElements(event, rotate);
  }

  const filterElements = (inputValue, filtered) => {
    props.filterElements(inputValue, filtered)
  }
  return (
    <div className="bg-blue rounded-xl h-20">
      <div className="flex">
        <SearchField filterElements={filterElements} />
      </div>
      
      <div className="flex">
        <SortList sortElements={sortElements}/>
      </div>
    </div>
  )
}

export default SearchBar