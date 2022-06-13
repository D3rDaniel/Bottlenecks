import {React, useState, useEffect } from 'react';
import AnnouncementMinimumView from './AnnouncementMinimumView';
import SearchBarAnkündigungen from './searchbar/SearchBarAnkündigungen';
import Loading from '../../../../images/icons/loading-spinner.png';
import axios from 'axios';

const tasks = [
  {project: "Projekt aB", created_at: "01.01.2022" , title: "Message 1", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},
  {project: "Projekt 420", created_at: "20.04.2022" , title: "Message 2", description: "afasdfafdöafhöosdSMOKEWEEDEVERYDAYjöadfhaöNOTREALLY"},
]

const DashboardAnkündigungen = (props) => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedAnnouncements, setAnnouncements] = useState([]);
  const [filtered, setFiltered] = useState(false)
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([])

    useEffect(() => {
        setIsLoaded(false);
        const url = "http://127.0.0.1:8000/api/user/"+props.userID+"/announcements"

        axios.get(url, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.token
          }
        })
          .then(function(response) {setIsLoaded(true);
            setAnnouncements(response.data["announcements"]);  
            },(error) =>{
              setIsLoaded(true);
              setError(error);})
      }, []);


      const filterElements = (inputValue, filtered) => {
        setFiltered(filtered)
        let filteredAnkuendigungenBuffer
        filteredAnkuendigungenBuffer = [...loadedAnnouncements].filter((message) => message.title.toLowerCase().includes(inputValue))
        setFilteredAnnouncements(filteredAnkuendigungenBuffer)
      }
      const sortElements = (event, rotate) =>{
        const IDTriggeredSortElement = event.target.id
            let orderedAnnouncements;
            switch(IDTriggeredSortElement){
              case "0":
                if(rotate){
                  orderedAnnouncements = [...loadedAnnouncements].sort((a,b) => (a.project > b.project) ? 1: ((b.project > a.project) ? -1 : 0))
                }else{
                  orderedAnnouncements = [...loadedAnnouncements].sort((a,b) => (a.project > b.project) ? -1: ((b.project > a.project) ? 1 : 0))
                }
                break;
              case "1":
                if(rotate){
                  orderedAnnouncements = [...loadedAnnouncements].sort((a,b) => (a.created_at > b.created_at) ? 1: ((b.created_at > a.created_at) ? -1 : 0))
                }else{
                  orderedAnnouncements = [...loadedAnnouncements].sort((a,b) => (a.created_at > b.created_at) ? -1: ((b.created_at > a.created_at) ? 1 : 0))
                }
                break;
              case '2':
                if(rotate){
                  orderedAnnouncements = [...loadedAnnouncements].sort((a,b) => (a.title > b.title) ? 1: ((b.title > a.title) ? -1 : 0))
                }else{
                  orderedAnnouncements = [...loadedAnnouncements].sort((a,b) => (a.title > b.title) ? -1: ((b.title > a.title) ? 1 : 0))
                }
                break;
              default:
                console.log("default- shit")
            }
            setFilteredAnnouncements(orderedAnnouncements)
      }
      
      if (error) {
        let errormessage = error.message;
        if(error.message.includes("No announcements found")) errormessage = "Es gibt noch keine Ankündigungen"
          return <div className="m-auto text-red font-bold">Error: {errormessage}</div>
      }else if(!isLoaded){
          return (
          <div className="m-auto flex flex-row">
            <img src={Loading} alt="loading" className='animate-spin h-5 w-5 mr-2 mt-0.5'/>
            <div className=" text-darkgray">Loading...</div>
          </div>)

      }else if(loadedAnnouncements.length < 1){
        return <div className="m-auto text-red font-bold">Keine Ankündigungen gefunden</div>
    }else {

  return(
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBarAnkündigungen filterElements={filterElements} sortElements={sortElements} />
        
        <div className="h-full w-full">
          {
            filtered ?
            filteredAnnouncements.map((announcement, index) => {
            return (
              <AnnouncementMinimumView
                project={announcement.project_id}
                created_at={announcement.created_at.substring(0, 10)}
                updated_at={announcement.updated_at.substring(0, 10)}
                title={announcement.subject}
                description={announcement.message}
                key={index}>
              </AnnouncementMinimumView>
            )
            })
            
            
            :
            loadedAnnouncements.map((announcement, index) => {
            return (
              <AnnouncementMinimumView
                project={announcement.project_id}
                created_at={announcement.created_at.substring(0, 10)}
                updated_at={announcement.updated_at.substring(0, 10)}
                title={announcement.subject}
                description={announcement.message}
                key={index}>
              </AnnouncementMinimumView>
            )
          })
          
          
          }
        </div>

    </div>
  )}
}

export default DashboardAnkündigungen