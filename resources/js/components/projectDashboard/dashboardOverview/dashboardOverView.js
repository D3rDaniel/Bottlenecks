import {React, useState, useEffect} from 'react'
import Loading from '../../../../images/icons/loading-spinner.png'
import axios from 'axios';

import Absolut from './absoluteView';
import InfoView from './InfoView';
import PieView from './PieView';

const dashboardOverView = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadedOverview, setOverview] = useState({});
  
    useEffect(() => {
      setIsLoaded(false);
      const url = "http://127.0.0.1:8000/api/project/"+props.projectID+"/overview";
  
      axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + props.token
        }
      })
        .then(function(response) {setIsLoaded(true);
          setOverview(response.data["project_overview"]);  
          },(error) =>{
            setIsLoaded(true);
            setError(error);})
    }, []);
        
        if (error) {
          let errormessage = error.message;
          if(error.message.includes("Project not found.")) errormessage = "Projekt wurde nicht gefunden!";
            return <div className='m-auto text-red font-bold'>Error: {errormessage}</div>
        }else if(!isLoaded){
            return (<div className="m-auto flex flex-row">
            <img src={Loading} alt="loading" className='animate-spin h-5 w-5 mr-2 mt-0.5'/>
            <div className=" text-darkgray">Loading...</div>
          </div>)
        }else if(loadedOverview.length < 1){
          return <div className='m-auto text-red font-bold'>Projektübersicht konnte nicht gefunden werden!</div>
      }else {
  
  return (
      <div className="w-screen h-screen m-2 drop-shadow-xl">
            <div className="font-bold pl-4 pt-3 bg-white w-full rounded-t-xl">Projektübersicht</div>
            <div className="flex w-full h-2/3 bg-white rounded-b-xl">
                <PieView tasks = {loadedOverview} />
                <InfoView project = {loadedOverview}/>             
            </div>
            <Absolut tasks = {loadedOverview}/>
      </div>
    
  )}
}

export default dashboardOverView