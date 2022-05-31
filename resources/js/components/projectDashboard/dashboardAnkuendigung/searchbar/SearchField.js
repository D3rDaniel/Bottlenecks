import React from 'react'
import SearchIcon from '../../../../../images/icons/search.jpg'

const SearchField = () => {
  return (
    <div className="flex h-7 bg-white rounded-xl mx-10 mt-3">
        <input placeholder="Suchbegriff eingeben..." className=" ml-3 text-gray-400 w-full outline-none"></input>
        <img className="w-5 h-5 mr-4 mt-1 hover:cursor-pointer" src={SearchIcon} alt="logo"></img>
    </div>
  )
}

export default SearchField