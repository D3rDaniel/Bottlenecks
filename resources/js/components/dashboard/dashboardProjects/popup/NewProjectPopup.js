import React , {useState} from 'react'
import DatePicker from 'react-date-picker';
import InputField from '../../../forms/InputField';
import TextArea from '../../../forms/TextArea';
import axios from 'axios';

function NewProjectPopup(props) {

    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [deadline, setDeadline] = useState("")

    const getTitle = (data) => {setTitle(data);}
    const getDeadline = (event) => {setDeadline(event);}
    const getDescription = (data) => {setDescription(data);}


    const handleSubmit = () => {
        let year = deadline.getFullYear();
        let month = deadline.getMonth() < 10 ? "0"+ (deadline.getMonth()+1) : deadline.getMonth();
        let day = deadline.getDate() < 10 ? "0"+deadline.getDate() : deadline.getDate();

        const projectData = {
            title: title,
            description: description,
            due_date: year + "-" + month + "-" + day
        }

       const url = "http://sl-vinf-bordbame.hof-university.de:80/api/project"

       axios.post(url, projectData , {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.token
        }
       })
        .then(res => {
            console.log(res)
            if(res.status < 400){
                alert("Projekt wurder erfolgreich erstellt!");
                props.onClick()
                props.refresh()
            }else{
                alert("Es ist ein Fehler aufgetreten!")
            }
            
        }).catch(error => {console.log(error)})
        
    }

  return ( props.trigger ) ? (
    <div className="w-screen h-screen rounded-lg bg-gray-400/[.7] fixed ">
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white shadow-md rounded-lg w-full px-10 pt-12 pb-14 mb-4 mx-20">
                    <h3 className="items-center mb-6 text-5xl font-body">Projekt erstellen</h3>
                    <div className="mb-4">
                        <InputField id="projectTitle" onChange={getTitle} placeholder="Titel..."></InputField>
                    </div>
                    <div className="mb-6">
                        {/*<InputField id="projectDeadline" onChange={getDeadline} placeholder="Deadline..."></InputField> */}
                        <label className="p-2 mr-4">Deadline: </label>
                        <DatePicker onChange={getDeadline} value={deadline}/>
                    </div>
                    <div className="mb-6">
                        <TextArea id="description" onChange={getDescription} placeholder="Beschreibung..."></TextArea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button onClick={props.onClick} className="bg-red hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline">Abbruch</button>
                        <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>Erstellen</button>
                    </div>
            </div>
        </div>
    </div>
  ) : "";
}

export default NewProjectPopup