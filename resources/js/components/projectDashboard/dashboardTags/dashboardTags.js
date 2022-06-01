import {React, useState, useEffect} from 'react'

import TagElement from './TagElement'
import Input from './TagInputField'

const tags = [
    {name : "Tag1"},
    {name : "Tag2"},
    {name : "Tag3"},
]

const dashboardTags = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadedTags, setTags] = useState([]);

    useEffect(() => {
        setIsLoaded(false);
        const url = "http://127.0.0.1:8000/api/project/"+props.projectID+"/tags";
        fetch(url, {
          headers: {
            'Accept': 'application/json',
          }
        })
          .then(response => response.json())
          .then((data) => {
            setIsLoaded(true);
            setTags(data["tags"]);
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

  return (
    <div className="flex w-screen h-screen justify-center items-center">
        <div className="flex flex-col justify-between bg-white h-2/3 w-2/3 rounded-xl">
            <div>
                <h1 className="font-bold mt-4 ml-5 text-xl">Tags</h1>
                <div className=" mt-5 ml-10">
                    {loadedTags.map((tag, index) => {
                        return (
                            <TagElement
                                name={tag.title}
                                key={index}>
                            </TagElement>
                        )
                    })}
                </div>  
            </div>
            <Input />
        </div>
    </div>
  )}
}

export default dashboardTags