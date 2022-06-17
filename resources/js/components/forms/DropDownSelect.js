import React, {useEffect, useState} from 'react'

function DropDownSelect(props) {

    const data = Array.from(props.options)
    const [selects, setSelects] = useState("");

    useEffect(() => {
        console.log(data)
    },[data])

    const handleChange = (e) => {
        setSelects(e.target.value)
        props.onChange(e.target.value)
    }
  return (
    <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
            <select className="form-select
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={selects}
            onChange={handleChange} >
                <option>{props.title}</option>
                {
                    data.map((option, index) => {
                        return(
                            <option key={index} value={option}>{option}</option>
                        )
                        
                    })
                }
            </select>
    </div>
    </div>
  )
}

export default DropDownSelect