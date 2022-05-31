import React from 'react'

const AnkuendigungMaximumView = (props) => {
  return (
    <div className="bg-white rounded-xl -mt-5 shadow-bottom">
        <div className="ml-8 pt-5 font-bold"> <label>{props.subject}</label></div>
        <div className="mx-8 py-3">{props.message}</div>
    </div>
  )
}

export default AnkuendigungMaximumView