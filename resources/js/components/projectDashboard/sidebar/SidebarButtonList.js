import React from 'react'
import SidebarButtonListElement from './SidebarButtonElement'
import UebersichtIcon from '../../../../images/icons/uebersicht.jpg'
import DeadlineIcon from '../../../../images/icons/list.jpg'
import TasksIcon from '../../../../images/icons/list.jpg'
import AnkuendigungIcon from '../../../../images/icons/ankuendigung.jpg'
import TagsIcon from '../../../../images/icons/uebersicht.jpg'
import RoomIcon from '../../../../images/icons/raum-weiss.png'



const elements = [
    {img: TasksIcon, desc: "Tasks", selected: "false", url: ""},
    {img: DeadlineIcon, desc: "Bevorstehende Deadline", selected: "false", url: "deadline"},
    {img: UebersichtIcon, desc: "Übersicht", selected: "false", url: "uebersicht"},
    {img: AnkuendigungIcon, desc: "Ankündiungen", selected: "false", url: "ankuendigungen"},
    {img: TagsIcon, desc: "Tags", selected: "false", url: "tags"},
    {img: RoomIcon, desc: "Räume", selected: "false", url: "rooms"},
];



const SidebarButtonList = (props) => {

  for(let i = 0; i < elements.length; i++){
    elements[i].selected="false";

    if(elements[i].url === props.selected){
      elements[i].selected = "true";
    }
  }

  return (
    <div className="bg-white ml-2 rounded-xl">
      {elements.map((element, index) => {
        return (
        <SidebarButtonListElement
          img={element.img}
          desc={element.desc} 
          selected={element.selected}
          url={element.url}
          key={index}>
        </SidebarButtonListElement>
        )
      })}
    </div>
  );
};

export default SidebarButtonList