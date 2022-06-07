import React from 'react'
import SortElement from '../../dashboardProjects/searchbar/SortElement';

const elements = [
    {label: "Raumname", selected: false},
    {label: "Raumnummer", selected: false},
    {label: "Erstellt am", selected: false},
    {label: "Raumgröße", selected: false},
    {label: "Buchungstag", selected: false},
    {label: "Zeitraum", selected: false},
  ];

const SortListRaumbuchungen = (props) => {

  const sortElements = (event, rotate) => {
    props.sortElements(event, rotate);
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

export default SortListRaumbuchungen