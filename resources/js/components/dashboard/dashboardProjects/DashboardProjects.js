import React, {useEffect, useState} from 'react'
import SearchBar from './searchbar/SearchBar'
import ProjectMinimumView from './ProjectMinimumView'
import CreateProjectButton from './CreateProjectButton'
import NewProjectPopup from './popup/NewProjectPopup'
import Loading from '../../../../images/icons/loading-spinner.png'
import axios from 'axios'

const projects = [
  {title: "Frontend", creator: "Hans Jürgen" , progress: 70, startDate: "01.05.2022", date: "09.05.2022"},
  {title: "Backend", creator: "Max Muster" ,  progress: 50, startDate: "01.05.2022" , date: "09.05.2022"},
  {title: "API", creator: "Men Rexona" , progress: 30, startDate: "01.05.2022" , date: "09.05.2022"}
]

function DashboardProjects (props) {
  const [popupTrigger, setPopupTrigger] = useState(false)
  const [refresh,setRefresh] = useState(false)

  const changePopupTriggerValue = () => {setPopupTrigger(!popupTrigger);}

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedProjects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const getData = () =>{
    setError(null);
    setRefresh(false)
    setIsLoaded(false);
    const url = "http://sl-vinf-bordbame.hof-university.de:80/api/user/"+props.userID+"/projects";

    axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + props.token
      }
    })
      .then(function(response) {setIsLoaded(true);
        setProjects(response.data["projects_created"].concat(response.data["project-member_of"]));  
        },(error) =>{
          setIsLoaded(true);
          setError(error);})
  }

    useEffect(() => {
        getData()
      }, [refresh]);
      
      
      const sortElements = (event, rotate) => {
        const IDTriggeredSortElement = event.target.id
        let orderedProjects;
        switch(IDTriggeredSortElement){
          case "0":
            if(rotate){
              orderedProjects = [...loadedProjects].sort((a,b) => (a.title > b.title) ? 1: ((b.title > a.title) ? -1 : 0))
            }else{
              orderedProjects = [...loadedProjects].sort((a,b) => (a.title > b.title) ? -1: ((b.title > a.title) ? 1 : 0))
            }
            break;
          case "1":
            if(rotate){
              orderedProjects = [...loadedProjects].sort((a,b) => (a.creator_user_id > b.creator_user_id) ? 1: ((b.creator_user_id > a.creator_user_id) ? -1 : 0))
            }else{
              orderedProjects = [...loadedProjects].sort((a,b) => (a.creator_user_id > b.creator_user_id) ? -1: ((b.creator_user_id > a.creator_user_id) ? 1 : 0))
            }
            break;
          case '2':
            if(rotate){
              orderedProjects = [...loadedProjects].sort((a,b) => (a.progress_percentage > b.progress_percentage) ? 1: ((b.progress_percentage > a.progress_percentage) ? -1 : 0))
            }else{
              orderedProjects = [...loadedProjects].sort((a,b) => (a.progress_percentage > b.progress_percentage) ? -1: ((b.progress_percentage > a.progress_percentage) ? 1 : 0))
            }
            break;
          case '3':
            if(rotate){
              orderedProjects = [...loadedProjects].sort((a,b) => (a.created_at > b.created_at) ? 1: ((b.created_at > a.created_at) ? -1 : 0))
            }else{
              orderedProjects = [...loadedProjects].sort((a,b) => (a.created_at > b.created_at) ? -1: ((b.created_at > a.created_at) ? 1 : 0))
            }
            break;
          case '4':
            if(rotate){
              orderedProjects = [...loadedProjects].sort((a,b) => (a.due_date > b.due_date) ? 1: ((b.due_date > a.due_date) ? -1 : 0))
            }else{
              orderedProjects = [...loadedProjects].sort((a,b) => (a.due_date > b.due_date) ? -1: ((b.due_date > a.due_date) ? 1 : 0))
            }
            break;
          default:
            return;
        }
        setProjects(orderedProjects)
      }

      const filterElements = (inputValue, filtered) => {
        setFiltered(filtered)
        let filteredProjectsBuffer
        filteredProjectsBuffer = [...loadedProjects].filter((project) => project.title.toLowerCase().includes(inputValue))
        setFilteredProjects(filteredProjectsBuffer)
      }

      
    if (error) {
      let errormessage = error.message;
      if(error.response.data.message.includes("User not found.")) errormessage = "Nutzer wurde nicht gefunden!";
      if(error.response.data.message.includes("No projects found for this user.")) errormessage = "Du bist momentan in keinen Projekten!"

      return (
        <div className="flex flex-col w-full m-1 ml-2">
          <div className='m-auto text-red font-bold'>{errormessage}</div>
          {errormessage === "Du bist momentan in keinen Projekten!" ? 
            <div className="flex justify-end">
              <CreateProjectButton popupTrigger={popupTrigger} onClick={changePopupTriggerValue}/>
            </div> : ""}
            <NewProjectPopup trigger={popupTrigger} refresh={function(){setRefresh(true)}} onClick={changePopupTriggerValue} token={props.token} getData={getData}/>
        </div>)
    }else if(!isLoaded){
      return (
        <div className="m-auto flex flex-row">
          <img src={Loading} alt="loading" className='animate-spin h-5 w-5 mr-2 mt-0.5'/>
          <div className=" text-darkgray">Loading...</div>
        </div>)
    }else {
      return(
        <div className="flex flex-col w-full m-1 ml-2">
          <SearchBar sortElements={sortElements} filterElements={filterElements} />
          
          <div className="h-full w-full overflow-y-scroll">
            {
              filtered ? 
              filteredProjects.map((project, index) => {
              
              return (
                <ProjectMinimumView
                  title={(project.title.length > 30) ? project.title.substring(0,27)+'...' : project.title}
                  fullTitle = {project.title}
                  id = {project.id}
                  creator={project.creator ? project.creator.username : props.username}
                  progress={project.progress_percentage}
                  startDate={project.created_at.substring(0,10)}
                  date={project.due_date}
                  description={project.description}
                  key={index}>
                </ProjectMinimumView>
              )
            })
            :
            loadedProjects.map((project, index) => {
              
              return (
                <ProjectMinimumView
                  title={(project.title.length > 30) ? project.title.substring(0,27)+'...' : project.title}
                  fullTitle = {project.title}
                  id = {project.id}
                  creator={project.creator ? project.creator.username : props.username}
                  progress={project.progress_percentage}
                  startDate={project.created_at.substring(0,10)}
                  date={project.due_date}
                  description={project.description}
                  key={index}>
                </ProjectMinimumView>
              )
            })
            
            
            }
          </div>

          <div className="flex justify-end">
            <CreateProjectButton popupTrigger={popupTrigger} onClick={changePopupTriggerValue}/>
          </div>
          <NewProjectPopup trigger={popupTrigger} refresh={function(){setRefresh(true)}} onClick={changePopupTriggerValue} token={props.token} getData={getData}/>
        </div>
      )
    }
}

export default DashboardProjects