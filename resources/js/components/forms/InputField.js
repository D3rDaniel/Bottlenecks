import React from 'react'

function InputField(props) {
  return (
    <>
        <input className="bg-gray-50 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id={props.id} type="text" placeholder={props.placeholder}>
        </input>
    </>
  )
}

export default InputField