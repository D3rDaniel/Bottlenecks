import {React, useState, useEffect} from 'react'
import axios from 'axios'

import TagElement from './TagElement'
import Input from './TagInputField'
import Loading from '../../../../images/icons/loading-spinner.png'

const tags = [
    {name : "Tag1"},
    {name : "Tag2"},
    {name : "Tag3"},
]

const dashboardTags = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadedTags, setTags] = useState([]);
    const [refresh, setRefresh] = useState(false)

    const getData = () => {
      setRefresh(false)
      setIsLoaded(false);
      const url = "http://sl-vinf-bordbame.hof-university.de:80/api/project/"+props.projectID+"/tags";
  
      axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + props.token
        }
      })
        .then(function(response) {setIsLoaded(true);
          setTags(response.data["tags"]);  
          },(error) =>{
            setIsLoaded(true);
            setError(error);})
    }

    useEffect(() => {
      getData()
    }, [refresh]);

      if (error) {
        errormessage = error.message;
        if(error.message.includes("No tags found")) errormessage = "Keine Tags gefunden";
          return <div className="m-auto text-red font-bold">Error: {errormessage}</div>
      }else if(!isLoaded){
          return (<div className="m-auto flex flex-row">
          <img src={Loading} alt="loading" className='animate-spin h-5 w-5 mr-2 mt-0.5'/>
          <div className=" text-darkgray">Loading...</div>
        </div>)
      }else if(loadedTags.length < 1){
        return (
            <div className="m-auto w-1/2">
                <div className="text-red font-bold text-center mb-5">Keine Tags gefunden</div>
                <Input refresh={function(){setRefresh(true)}} projectID = {props.projectID} token={props.token}/>
            </div>
        )
    }else {

  return (
    <div className="flex w-screen h-screen justify-center items-center">
        <div className="flex flex-col justify-between bg-white h-2/3 w-2/3 rounded-xl">
            <div>
                <h1 className="font-bold mt-4 ml-5 text-xl">Tags</h1>
                <div className=" mt-5 ml-10 mr-5">
                    {loadedTags.map((tag, index) => {
                        return (
                            <TagElement
                                name={tag.title}
                                id={tag.id}
                                token={props.token}
                                key={index}
                                refresh={function(){setRefresh(true)}}
                                >
                            </TagElement>
                        )
                    })}
                </div>  
            </div>
            <Input projectID = {props.projectID} token={props.token} refresh={function(){setRefresh(true)}}/>
        </div>
    </div>
  )}
}

export default dashboardTags