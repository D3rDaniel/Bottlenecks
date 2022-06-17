import React from 'react'
import SortElement from '../../dashboardProjects/searchbar/SortElement';

const elements = [
    {label: "Projekt", selected: false},
    {label: "Erstellt am", selected: false},
    {label: "Geändert am", selected: false},
    {label: "Titel", selected: false},
  ];

const SortList = (props) => {
  const sortElements = (event, rotate) =>{
    console.log("Is rotatet? ", rotate)
    props.sortElements(event, rotate)
  }
  return (
    <div className="flex w-full ml-20 mr-36">
        {elements.map((element, index) => {
            return (
                <SortElement
                    id={index}
                    label={element.label}
                    selected={element.selected}
                    key={index}
                    sortElements={sortElements}>
                </SortElement>
        )
        })}
    </div>
    
  )
}

export default SortList