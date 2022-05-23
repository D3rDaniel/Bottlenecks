import React from 'react'
import SidebarButtonListElement from './SidebarButtonElement'
import UebersichtIcon from '../../../../images/icons/uebersicht.jpg'
import KalenderIcon from '../../../../images/icons/kalender.jpg'
import DeadlineIcon from '../../../../images/icons/list.jpg'
import TasksIcon from '../../../../images/icons/list.jpg'
import AnkuendigungIcon from '../../../../images/icons/ankuendigung.jpg'
import TagsIcon from '../../../../images/icons/uebersicht.jpg'
import RoomIcon from '../../../../images/icons/raum-weiss.png'



const elements = [
    {img: UebersichtIcon, desc: "Übersicht", selected: "false"},
    {img: KalenderIcon, desc: "Kalender", selected: "false"},
    {img: DeadlineIcon, desc: "Bevorstehende Deadline", selected: "false"},
    {img: TasksIcon, desc: "Tasks", selected: "false", gap:"false"},
    {img: AnkuendigungIcon, desc: "Ankündiungen", selected: "false"},
    {img: TagsIcon, desc: "Tags", selected: "false"},
    {img: RoomIcon, desc: "Räume", selected: "false"},
];



const SidebarButtonList = () => {
  return (
    <div className="bg-white ml-2 rounded-xl">
      {elements.map((element, index) => {
        return (
        <SidebarButtonListElement
          img={element.img}
          desc={element.desc} 
          selected={element.selected}
          gap={element.gap}
          key={index}>
        </SidebarButtonListElement>
        )
      })}
    </div>
  );
};

export default SidebarButtonList