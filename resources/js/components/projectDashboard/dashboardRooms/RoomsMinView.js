import React, {useState} from 'react'

import Arrow from '../../../../images/icons/arrow-black.png'
import MaxView from './RoomsMaxView'
import BookingButton from './BookingButton'

const RoomsMinView = (props) => {

    const [popupTriggerBooking, setPopupTriggerBooking] = useState(false)
    const changePopupTrigger = () => {
        props.changePopupTriggerValueBooking(!popupTriggerBooking)
    }

    const [rotate, setRotate] = useState(0);

    const rotateArrow = () => { rotate ? setRotate(false) : setRotate(true) }

    return (
    <div className="my-5 mx-8">
        <div className={`flex h-14 bg-white ${rotate ? null : "drop-shadow-md"} rounded-xl items-center`} >
            
            <label className="ml-12 w-1/4 min-w-max">{props.room.title}</label>
            <label className="w-1/4 min-w-max pl-16">{props.room.room_number}</label>
            <label className="w-1/4 min-w-max pl-28">{props.room.created_at.substring(0,10)}</label>
            <label className="w-1/4 min-w-max pl-40">{props.room.capacity}</label>

            <div className="flex ml-auto">
                <BookingButton  onClick={changePopupTrigger}/>
                <img src={Arrow} alt="maxView" className={`h-7 w-7 mr-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>
            </div>
        </div>
        {rotate ? <MaxView room={props.room}></MaxView> : null}
    </div>
    )
}

export default RoomsMinView