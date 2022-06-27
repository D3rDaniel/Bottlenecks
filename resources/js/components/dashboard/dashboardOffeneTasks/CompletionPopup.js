import {React, useState, useContext} from "react";
import axios from "axios";
import UserContext from "../../../store/user-context";

const CompletionPopup = (props) => {

    const [value, setValue] = useState("")

    const userCtx = useContext(UserContext);

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleCompletion = () => {
        const url = "http://sl-vinf-bordbame.hof-university.de:80/api/task/"+props.id+"/complete";

        let comment = value ? value : "-ohne Kommentar-";

        axios.put(
            url, 
            {completion_comment: comment},
            {headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + userCtx.user_token
            }})
        .then(function(response) {
          if(response.data.success == true) props.refresh();
          else {alert("Es ist ein Fehler aufgetreten!");}
          props.close();
        })
    }

    return ( props.trigger ? 
        <div className="fixed top-0 right-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="flex flex-col p-5 relative bg-white rounded-xl">
                <div className="font-bold text-xl mb-3">Möchtest du diese Task abschließen?</div>
                <div className="flex flex-row mb-5">
                    <div className="flex flex-col mr-5 w-1/2">
                        <div className="mb-1 font-bold">Abschlusskommentar</div>
                        <textarea onChange={handleChange} id="completion_comment" placeholder="dein abschließender Kommentar ..." className="p-2 rounded-xl border-2 border-gray-300"></textarea>
                    </div>
                    <div className="flex flex-col ml-auto w-1/2">
                        <div className="font-bold mb-1">Deadline</div>
                        <div className="mb-3">{props.deadline ? props.deadline : "keine Deadline"}</div>
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between">
                    <button onClick={props.close} className="bg-red text-white w-1/4 py-1 rounded-xl drop-shadow-xl mr-3 text-center hover:font-bold">Abbrechen</button>
                    <button onClick={handleCompletion} className="bg-blue text-white w-1/4 py-1 rounded-xl drop-shadow-xl ml-auto text-center hover:font-bold">Bestätigen</button>
                </div>
            </div>
        </div>
        
        : null
    )
}

export default CompletionPopup