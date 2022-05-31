import React from 'react'
import Sortelement from './SortElement'

const elements = [
    {label: "Raumname", selected: false},
    {label: "Raumnummer", selected: false},
    {label: "Erstellt am", selected: false},
    {label: "Raumgröße", selected: false}
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