import React from 'react'
import InputField from '../../../forms/InputField';
import TextArea from '../../../forms/TextArea';

function NewProjectPopup({trigger, onClick}) {

    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [deadline, setDeadline] = useState("")

    const getTitle = (data) => {setTitle(data);}
    const getDeadline = (data) => {setDeadline(data);}
    const getDescription = (data) => {setDescription(data);}

    const handleSubmit = (event) => {
        event.preventDefault()

        const project = {
            title: title,
            deadline: deadline,
            description: description
        }
        console.log(project)
       /*
       const url = "http://127.0.0.1:8000/api/project/"
       axios.post(url, {project})
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        */
    }

  return ( trigger) ? (
    <div className="w-screen h-screen rounded-lg bg-gray-400/[.7] fixed ">
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            
            <div className="w-full">
                <form className="bg-white shadow-md rounded-lg w-full px-10 pt-12 pb-14 mb-4 mx-20" onSubmit={handleSubmit}>
                    <h3 className="items-center mb-6 text-5xl font-body">Projekt erstellen</h3>
                    <div className="mb-4">
                        <InputField id="projectTitle" onChange={getTitle} placeholder="Titel..."></InputField>
                    </div>
                    <div className="mb-6">
                        <InputField id="projectDeadline" onChange={getDeadline} placeholder="Deadline..."></InputField>
                    </div>
                    <div className="mb-6">
                        <TextArea id="description" onChange={getDescription} placeholder="Beschreibung..."></TextArea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button onClick={onClick} className="bg-red hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="button">
                        Abbruch
                        </button>
                        <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="submit" >
                        Erstellen
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    </div>
  ) : "";
}

export default NewProjectPopup