import React, {useEffect, useState} from 'react'
import SearchIcon from '../../../../../images/icons/search.jpg'

const SearchField = (props) => {
  const [inputValue, setInputValue] = useState("")

  const changeInputValue = (event) => {
    let valueString = event.target.value;
    console.log("inputString: ", valueString)
    setInputValue(valueString === undefined ? "" : valueString.toLowerCase())
  }
  useEffect(() => {
    let filtered = inputValue.trim().length != 0 
    props.filterElements(inputValue, filtered)
  }, [inputValue])

  return (
    <div className="flex justify-between w-1/2 h-7 bg-white rounded-xl ml-3 mt-3 items-center hover:cursor-text">
        <input placeholder="Suchbegriff eingeben..." className="ml-3 w-full outline-none" onChange={changeInputValue}></input>
        <img className="w-5 h-5 mr-4" src={SearchIcon} alt="logo"></img>
    </div>
  )
}

export default SearchField