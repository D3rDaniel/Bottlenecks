import React from 'react'
import Sortelement from './SortElement'

const elements = [
    {label: "Titel", selected: false},
    {label: "Fortschritt", selected: false},
    {label: "Priorität", selected: false},
    {label: "Endet am", selected: false}
  ];

const SortList = () => {
  return (
    <div className="flex w-full ml-20 mr-16">
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