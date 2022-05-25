import React from 'react'
import SortElement from '../../dashboardProjects/searchbar/SortElement';

const elements = [
    {label: "Titel", selected: false},
    {label: "Projekt", selected: false},
    {label: "Deadline", selected: false},
    {label: "Tag", selected: false},
    {label: "Raum", selected: false},
    {label: "Priorität", selected: false},
  ];

const SortListOffeneTasks = () => {
  return (
    <>
      <div className="flex w-4/5 pl-20 justify-around">
        {elements.map((element, index) => {
            return (
                <SortElement
                    label={element.label}
                    selected={element.selected}
                    key={index}>
                </SortElement>
        )
        })}
      </div>
      <div className="w-1/5"></div>
    </>
    
    
  )
}

export default SortListOffeneTasks