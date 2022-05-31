import React from 'react'
import Sortelement from './SortElement'

const elements = [
    {label: "Titel", selected: false},
    {label: "Veröffentlicht", selected: false}
  ];

const SortList = () => {
  return (
    <div className="flex w-full ml-20 mr-28">
        {elements.map((element, index) => {
            return (
                <Sortelement
                    label={element.label}
                    selected={element.selected}
                    key={index}>
                </Sortelement>
        )
        })}
    </div>
  )
}

export default SortList