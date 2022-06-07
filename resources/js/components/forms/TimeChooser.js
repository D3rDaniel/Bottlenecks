import React, { useState } from 'react';
import TimePicker from 'react-time-picker';

function TimeChooser(props) {
  const [time, setTime] = useState('10:00');

  const pickTime = (event) => {
    setTime(event)
    props.onChange(event)
  }
  return (
    <div>
      <TimePicker className="rounded-xl" onChange={pickTime} value={time} />
    </div>
  );
}

export default TimeChooser