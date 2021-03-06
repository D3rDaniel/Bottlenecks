import React from 'react'
import SortElement from '../../dashboardProjects/searchbar/SortElement';

{/* {label: "Erstellt am", selected: false},
    {label: "Deadline", selected: false}, */}
const elements = [
    {label: "Titel", selected: false},
    {label: "Projekt", selected: false},
    {label: "Beendet", selected: false},
    {label: "Priorität", selected: false},
    {label: "Tag", selected: false},
    {label: "Abschluss", selected: false},
  ];

const SortListAbgeschlosseneTasks = (props) => {
  const sortElements = (event, rotate) =>{
    props.sortElements(event, rotate)
  }
  return (
    <>
      <div className="flex w-11/12 pl-16 justify-around">
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
      <div className="w-1/12"></div>
    </>
    
    
  )
}

export default SortListAbgeschlosseneTasks