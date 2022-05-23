import React from 'react'

function TextArea(props) {
  return (
    <textarea class='bg-gray-50 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
    id={props.id} type="text" placeholder={props.placeholder} >

    </textarea>
  )
}

export default TextArea