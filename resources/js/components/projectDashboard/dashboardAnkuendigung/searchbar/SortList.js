import React from 'react'
import Sortelement from './SortElement'

const elements = [
    {label: "Titel", selected: false},
    {label: "Veröffentlicht", selected: false}
  ];

const SortList = (props) => {
  const sortElements = (event, rotate) => {
    props.sortElements(event, rotate);
  }
  return (
    <div className="flex w-full ml-20 mr-28">
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