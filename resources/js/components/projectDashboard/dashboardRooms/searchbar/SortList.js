import React from 'react'
import Sortelement from './SortElement'

const elements = [
    {label: "Raumname", selected: false},
    {label: "Raumnummer", selected: false},
    {label: "Erstellt am", selected: false},
    {label: "Raumgröße", selected: false}
  ];

const SortList = (props) => {
  const sortElements = (event, rotate) => {
    props.sortElements(event, rotate);
  }
  return (
    <>
    <div className="flex justify-around ml-6 w-4/5 items-center">
        {elements.map((element, index) => {
            return (
                <Sortelement
                    id={index}
                    label={element.label}
                    selected={element.selected}
                    key={index}
                    sortElements={sortElements}>
                </Sortelement>
        )
        })}
    </div>
    <div className="w-1/5"></div>
    </>
    
  )
}

export default SortList