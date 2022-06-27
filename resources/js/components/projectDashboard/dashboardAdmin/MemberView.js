import {React, useState, useEffect} from 'react'
import MemberMinView from './MemberMinView'
import InputField from './MemberInputField'
import Loading from '../../../../images/icons/loading-spinner.png'
import axios from 'axios'

const MemberView = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadedMembers, setMembers] = useState([]);
    const [reRenderMembers, setReRenderMembers] = useState(false);

    const reRender = () => {setReRenderMembers(true)}

    useEffect(() => {
      setError(null);
      setReRenderMembers(false);
      setIsLoaded(false);
      const url = "http://127.0.0.1:8000/api/project/"+props.projectID+"/members";
  
      axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + props.token
        }
      })
        .then(function(response) {setIsLoaded(true);
          setMembers(response.data.members);  
          },(error) =>{
            setIsLoaded(true);
            setError(error);})
    }, [reRenderMembers]);
        
      if (error) {
        errormessage = error.message;
        if(error.message.includes("No Members found")) errormessage = "Keine Mitglieder gefunden";
          return <div className="m-auto text-red font-bold">Error: {errormessage}</div>
      }else if(!isLoaded){
          return (<div className="m-auto flex flex-row">
          <img src={Loading} alt="loading" className='animate-spin h-5 w-5 mr-2 mt-0.5'/>
          <div className=" text-darkgray">Loading...</div>
        </div>)
      }else if(loadedMembers.length < 1){
        return (
            <div className="bg-white rounded-xl w-1/3 h-3/4 drop-shadow-xl flex flex-col justify-between">
            <div>
                <div className="font-bold mt-2 ml-1">Mitglieder</div>
                <div className="p-5 text-red">
                     Es sind noch keine Mitgllieder vorhanden!
                </div>
            </div>
            <InputField token={props.token} projectID={props.projectID} onClick={reRender} />
            </div>)
    }else {  
      return (
        <div className="bg-white rounded-xl w-1/3 h-3/4 drop-shadow-xl flex flex-col justify-between overflow-auto">
            <div>
                <div className="font-bold mt-2 ml-1">Mitglieder</div>
                <div className="h-full w-full">
                    {loadedMembers.map((member, index) => {
                        return (
                            <MemberMinView token={props.token} member={member} key={index} onClick={reRender}/>
                        )
                    })}  
                </div>
            </div>
            <InputField token={props.token} projectID={props.projectID} onClick={reRender} />
        </div>
      )
    }
}

export default MemberView