import React from 'react'
import SidebarButtonListElement from './SidebarButtonElement'
import FolderIcon from '../../../../images/icons/folder.jpg'
import NewsIcon from '../../../../images/icons/nachricht.jpg'
import CheckIcon from '../../../../images/icons/list-check.jpg'
import ListIcon from '../../../../images/icons/list.jpg'
import UserIcon from '../../../../images/icons/nutzer-weiss.jpg'



const elements = [
    {img: FolderIcon, desc: "Projekte", selected: "false"},
    {img: NewsIcon, desc: "Inbox", selected: "false"},
    {img: CheckIcon, desc: "Abgeschlossene Tasks", selected: "false"},
    {img: ListIcon, desc: "offene Tasks", selected: "false", gap:"false"},
    {img: UserIcon, desc: "Account verwalten", selected: "false"},
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