import React from 'react'
import SidebarButtonListElement from './SidebarButtonElement'
import FolderIcon from '../../../../images/icons/folder.jpg'
import NewsIcon from '../../../../images/icons/nachricht.jpg'
import CheckIcon from '../../../../images/icons/list-check.jpg'
import ListIcon from '../../../../images/icons/list.jpg'
import UserIcon from '../../../../images/icons/nutzer-weiss.jpg'
import RoomIcon from '../../../../images/icons/raum-weiss.png'



const elements = [
    {img: FolderIcon, desc: "Projekte", selected: "false", url: ""},
    {img: NewsIcon, desc: "Ankündigungen", selected: "false", url: "ankuendigungen"},
    {img: CheckIcon, desc: "Abgeschlossene Tasks", selected: "false", url: "abgeschlosseneTasks"},
    {img: ListIcon, desc: "offene Tasks", selected: "false", gap:"false", url: "offeneTasks"},
    {img: UserIcon, desc: "Account verwalten", selected: "false", url: "accountVerwalten"},
    {img: RoomIcon, desc: "Raumbuchungen", selected: "false", url: "raumbuchungen"},
];



const SidebarButtonList = () => {
  return (
    <div className="bg-white ml-2 mb-80 rounded-xl">
      {elements.map((element, index) => {
        return (
        <SidebarButtonListElement
          img={element.img}
          desc={element.desc} 
          selected={element.selected}
          gap={element.gap}
          url={element.url}
          key={index}>
        </SidebarButtonListElement>
        )
      })}
    </div>
  );
};

export default SidebarButtonList