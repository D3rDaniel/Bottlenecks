import React from 'react'

function BookingButton({onClick}) {
  return (
    <button className="bg-blue text-white w-40 h-8 m-2 mt-2 pt-0.5 px-2 flex align-center justify-center
                      hover:border-2 rounded-xl border-black hover:font-bold hover:cursor-pointer "
                      onClick={onClick}
    >Buchen</button>
  )
}

export default BookingButton