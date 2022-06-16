import React, {useState, useEffect} from 'react'
import ProjectView from './AdminProjectView'
import AnkuendigungView from './AdminAnkuendigungView'
import MemberView from './MemberView'
import Loading from '../../../../images/icons/loading-spinner.png'
import axios from 'axios'

const dashboardAdmin = (props) => {

    const project_overview = [
        {title : "Projekt 1" , description : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." , 
            members :   [   { username : "Jogy" , pivot : {can_create_tasks : "0" , can_assign_tasks : "0" , can_edit_tasks : "0" , can_create_tags : "0"}} ,
                            { username : "Freddy" , pivot : {can_create_tasks : "1" , can_assign_tasks : "1" , can_edit_tasks : "1" , can_create_tags : "1"}} 
                        ]
        }
    ]

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [project, setProject] = useState([]);

    useEffect(() => {
        setIsLoaded(false);
        const url = "http://127.0.0.1:8000/api/project/"+props.projectID;
        axios.get(url, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.token
          }
        })
          .then(function(response) {
            setIsLoaded(true);
            setProject(response.data.project);  
            },(error) =>{
              setIsLoaded(true);
              setError(error);})
      }, []);

      if (error) {
        errormessage = error.message;
        if(error.message.includes("No Project found")) errormessage = "Kein Projekt gefunden";
          return <div className="m-auto text-red font-bold">Error: {errormessage}</div>
      }else if(!isLoaded){
          return (<div className="m-auto flex flex-row">
          <img src={Loading} alt="loading" className='animate-spin h-5 w-5 mr-2 mt-0.5'/>
          <div className=" text-darkgray">Loading...</div>
        </div>)
    }else {
        return (
            <div className="h-screen w-screen flex justify-center items-center ml-10 mr-5">
                <div className="flex flex-col justify-center h-full w-full mr-5 gap-10">
                    <ProjectView project = {project} token={props.token}/>
                    <AnkuendigungView projectID = {props.projectID} userID = {props.userID} token={props.token}/>
                </div>
                
                <MemberView members = {project_overview[0].members}/>
            </div>
        )
    }
}

export default dashboardAdmin