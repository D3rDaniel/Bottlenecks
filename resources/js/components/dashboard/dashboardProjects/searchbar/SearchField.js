import React from 'react'
import SearchIcon from '../../../../../images/icons/search.jpg'

const SearchField = () => {
  return (
    <div className="flex justify-between w-1/2 h-7 bg-white rounded-xl ml-3 mt-3 items-center hover:cursor-text">
        <label className="pl-3 text-gray-400">Suchbegriff eingeben...</label>
        <img className="w-5 h-5 mr-4" src={SearchIcon} alt="logo"></img>
    </div>
  )
}

export default SearchField