import React, { useState } from 'react'

function InputField(props) {

  const [value, setValue] = useState("")

  const handleChange = (e) => {
    setValue(e.target.value)
    props.onChange(e.target.value)
  }

  return (
    <>
        <input className="bg-gray-50 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                onChange={handleChange} id={props.id} type="text" placeholder={props.placeholder}>
        </input>
    </>
  )
}

export default InputField