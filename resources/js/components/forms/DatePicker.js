import React, {useState} from 'react'
import DatePicker from 'react-date-picker';

function DateChooser(props) {
    const [date, setDate] = useState(new Date());

    const pickDate = (event) => {
        setDate(event)
        props.onChange(event)
    }

    return (
      <div>
        <DatePicker onChange={pickDate} value={date} />
      </div>
    )
}

export default DateChooser