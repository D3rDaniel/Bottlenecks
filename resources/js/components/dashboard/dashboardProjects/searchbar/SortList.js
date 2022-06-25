import React from 'react'
import Sortelement from './SortElement'

const elements = [
    {label: "Projektname", selected: false},
    {label: "Ersteller", selected: false},
    {label: "Fortschritt", selected: false},
    {label: "Erstellt am", selected: false},
    {label: "Endet am", selected: false}
  ];

const SortList = (props) => {

  const sortElements = (event, rotate) => {
    props.sortElements(event, rotate);
  }

  return (
    <div className="flex w-full ml-20 mr-36">
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
    
  )
}

export default SortList