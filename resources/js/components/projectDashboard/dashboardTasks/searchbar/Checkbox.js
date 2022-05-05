import React from 'react'


const Checkbox = ({title}) => {
  return (
    <div className="">
      <input type="checkbox" className="mr-1 ml-6 " />
      <label className="text-white">{title}</label>
    </div>
  )
}

export default Checkbox