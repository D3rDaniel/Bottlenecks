import React, {useEffect, useState} from 'react'
import SearchBar from './searchbar/SearchBar'
import ProjectMinimumView from './ProjectMinimumView'
import CreateProjectButton from './CreateProjectButton'
import NewProjectPopup from './popup/NewProjectPopup'
import Loading from '../../../../images/icons/loading-spinner.png'

const projects = [
  {title: "Frontend", creator: "Hans Jürgen" , progress: 70, startDate: "01.05.2022", date: "09.05.2022"},
  {title: "Backend", creator: "Max Muster" ,  progress: 50, startDate: "01.05.2022" , date: "09.05.2022"},
  {title: "API", creator: "Men Rexona" , progress: 30, startDate: "01.05.2022" , date: "09.05.2022"}
]

function DashboardProjects (props) {
  const [popupTrigger, setPopupTrigger] = useState(false)
  const changePopupTriggerValue = () => {
    setPopupTrigger(!popupTrigger);
  }

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedProjects, setProjects] = useState([]);

    useEffect(() => {
        setIsLoaded(false);
        const url = "http://127.0.0.1:8000/api/user/"+props.userID+"/projects";

        fetch(url, {
          headers: {
            'Accept': 'application/json',
          }
        })
          .then(response => response.json())
          .then((data) => {
            setIsLoaded(true);
            setProjects(data["projects_created"].concat(data["project-member_of"]));  
            },(error) =>{
              setIsLoaded(true);
              setError(error);
            }
          )
      }, []);
      
      if (error) {
        let errormessage = error.message;
        if(error.message.includes("User not found.")) errormessage = "Nutzer wurde nicht gefunden!";
        if(error.message.includes("No projects found for this user.")) errormessage = "Du bist momentan in keinen Projekten!"
          return <div className='m-auto text-red font-bold'>Error: {errormessage}</div>
      }else if(!isLoaded){
          return (<div className="m-auto flex flex-row">
          <img src={Loading} alt="loading" className='animate-spin h-5 w-5 mr-2 mt-0.5'/>
          <div className=" text-darkgray">Loading...</div>
        </div>)
      }else if(loadedProjects.length < 1){
        return <div className='m-auto text-red font-bold'>Du bist momentan in keinen Projekten!</div>
    }else {

  return(
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBar />
        
        <div className="h-full w-full">
          {loadedProjects.map((project, index) => {
            
            return (
              <ProjectMinimumView
                title={(project.title.length > 30) ? project.title.substring(0,27)+'...' : project.title}
                fullTitle = {project.title}
                creator={project.creator_user_id}
                progress={project.progress_percentage}
                startDate={project.created_at.substring(0,10)}
                date={project.due_date}
                description={project.description}
                key={index}>
              </ProjectMinimumView>
            )
          })}
        </div>

        <div className="flex justify-end">
          <CreateProjectButton popupTrigger={popupTrigger} onClick={changePopupTriggerValue}/>
        </div>
        <NewProjectPopup trigger={popupTrigger} onClick={changePopupTriggerValue}/>
    </div>
  )}
}

export default DashboardProjects