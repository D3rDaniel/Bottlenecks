import React, {useState} from 'react'

function TextArea(props) {

  const [value, setValue] = useState("")

  const handleChange = (e) => {
    setValue(e.target.value)
    props.onChange(e.target.value)
  }

  return (
    <textarea className='bg-gray-50 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
    onChange={handleChange}
    id={props.id} type="text" placeholder={props.placeholder}
    rows="10" >

    </textarea>
  )
}

export default TextArea