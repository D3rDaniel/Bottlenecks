import React from 'react'
import Checkbox from './Checkbox'


const CheckboxList = () => {
  return (
      <div className="flex mt-3 h-7">
        <Checkbox 
            title="Meine Tasks anzeigen">
        </Checkbox>
        <Checkbox 
            title="Abgeschlossene Tasks anzeigen">
        </Checkbox>
      </div>

  )
}

export default CheckboxList