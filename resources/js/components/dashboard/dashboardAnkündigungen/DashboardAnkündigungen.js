import {React, useState, useEffect } from 'react'
import AnnouncementMinimumView from './AnnouncementMinimumView'
import SearchBarAnkündigungen from './searchbar/SearchBarAnkündigungen'
const tasks = [
  {project: "Projekt aB", created_at: "01.01.2022" , title: "Message 1", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},
  {project: "Projekt 420", created_at: "20.04.2022" , title: "Message 2", description: "afasdfafdöafhöosdSMOKEWEEDEVERYDAYjöadfhaöNOTREALLY"},
]

const DashboardAnkündigungen = (props) => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedAnnouncements, setAnnouncements] = useState([]);

    useEffect(() => {
        setIsLoaded(true);
        const url = "http://127.0.0.1:8000/api/user/"+props.userID+"/announcements"

        fetch(url, {
          headers: {
            'Accept': 'application/json',
          }
        })
          .then(response => response.json())
          .then((data) => {
            setIsLoaded(true);
            setAnnouncements(data["announcements"]);  
            },(error) =>{
              setIsLoaded(true);
              setError(error);
            }
          )
      }, []);
      
      if (error) {
          return <div>Error: {error.message}</div>
      }else if(!isLoaded){
          return <div>Loading..</div>
      }else {

  return(
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBarAnkündigungen />
        
        <div className="h-full w-full">
          {loadedAnnouncements.map((announcement, index) => {

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
          })}
        </div>

    </div>
  )}
}

export default DashboardAnkündigungen