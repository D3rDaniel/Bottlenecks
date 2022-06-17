import React, {useState, useEffect} from 'react'
import SearchIcon from '../../../../../images/icons/search.jpg'

const SearchField = (props) => {
  const [inputValue, setInputValue] = useState("")

  const changeInputValue = (event) => {
    setInputValue(event.target.value.toLowerCase())
  }
  useEffect(() => {
    let filtered = inputValue.trim().length != 0 
    props.filterElements(inputValue, filtered)
  }, [inputValue])

  return (
    <div className="flex h-7 w-full bg-white rounded-xl mt-3 items-center mx-10">
        <input placeholder="Suchbegriff eingeben..." className=" ml-3 w-full outline-none" onChange={changeInputValue}></input>
        <img className="w-5 h-5 mr-4 mt-1 hover:cursor-pointer" src={SearchIcon} alt="logo"></img>
    </div>
  )
}

export default SearchField