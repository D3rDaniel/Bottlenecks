import axios from 'axios';
import React, {useEffect, useState, useContext} from 'react'
import DatePicker from 'react-date-picker';
import DropDownSelect from '../../../forms/DropDownSelect';
import InputField from '../../../forms/InputField';
import TextArea from '../../../forms/TextArea';
import ProjectContext from '../../../../store/project-context';

let tagKeyValues = {}
let memberKeyValues = {}
let prioKeyValues =  {}

function NewTaskPopup(props) {

    const [member, setMember] = useState();
    const [priority, setPriority] = useState();
    const [tag, setTag] = useState();
    const [title, setTitle] = useState();
    const [deadline, setDeadline] = useState();
    const [description, setDescription] = useState();
    const [allTags, setAllTags] = useState([""])
    const [allPriorities, setAllPriorities] = useState([""])
    const [allMember, setAllMember] = useState([""])

    
    
    const getMember = (data) => {setMember(getKeyByValue(memberKeyValues, data));}
    const getPriority = (data) => {setPriority(getKeyByValue(prioKeyValues, data));}
    const getTag = (data) => {setTag(getKeyByValue(tagKeyValues, data));}
    const getTitle = (data) => {setTitle(data);}
    const getDeadline = (data) => {setDeadline(data);}
    const getDescription = (data) => {setDescription(data);}
    
    const project = useContext(ProjectContext)
    

    useEffect(() => {
        tagKeyValues = {}; memberKeyValues = {}; prioKeyValues = {}
        const urlTags = "http://127.0.0.1:8000/api/project/"+project.project_id+"/tags";
        const urlPriorities = "http://127.0.0.1:8000/api/priorities/all"
        const urlWorker = "http://127.0.0.1:8000/api/project/"+project.project_id+"/members"
        //get tags
        axios.get(urlTags,{
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + props.token
              }
        })
        .then(res => {
            res.data.tags.map(tag => {
                tagKeyValues[tag.id] = tag.title
            })
            setAllTags(Object.values(tagKeyValues))
        })
        //get prios
        axios.get(urlPriorities,{
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + props.token
              }
        })
        .then((res) => {
            res.data[0].map(prios => {
                prioKeyValues[prios.id] = prios.title
            })
            setAllPriorities(Object.values(prioKeyValues))
        })
        //get member
        axios.get(urlWorker,{
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + props.token
              }
        })
        .then((res) => {
            let members = res.data.members
            members.push(res.data.project_creator)
            members.map(member => {
                memberKeyValues[member.id] = member.username
            })
            setAllMember(Object.values(memberKeyValues))
        })
    },[project])

    function getKeyByValue(object, value) { return Object.keys(object).find(key => object[key] === value)}

    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {
            title: title,
            project_id: project.project_id,
            due_date: deadline.getFullYear()+"-"+((deadline.getMonth()+1) < 10 ? "0"+(deadline.getMonth()+1) : (deadline.getMonth()+1))+"-"+(deadline.getDate() < 10 ? "0"+ deadline.getDate() : deadline.getDate()),
            due_time: "00:00",
            assignee_user_id: member,
            priority_id: priority,
            tag_id: tag,
            description: description,
            status_id: 2
        }
       const url = "http://127.0.0.1:8000/api/task/"
       axios.post(url, task , {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.token
        }
       })
        .then(res => {
            if(res.status === 201){
                props.onClick()
            }else{
                alert("Es ist etwas schief gelaufen");
            }
            
        })
        .catch(error => console.log(error))

        
        
    }
    

  return ( props.trigger) ? (
    <div className="w-screen h-full rounded-lg bg-gray-400/[.7] fixed ">
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            
            <div className="w-full">
                <form className="bg-white shadow-md rounded-lg w-full px-10 pt-12 pb-14 mb-4 mx-20" onSubmit={handleSubmit}>
                <h3 className="items-center mb-6 text-5xl font-body">Task erstellen</h3>

                    <div className="flex justify-between p-6">
                        <div className="w-1/2 h-full p-6">
                            <div className="mb-4">
                                <InputField id="projectTitle" onChange={getTitle} placeholder="Titel..."></InputField>
                            </div>
                            <div className="mb-6">
                                <label className="p-2 mr-4">Deadline: </label>
                                <DatePicker onChange={getDeadline} value={deadline} />
                            </div>
                            <div className="mb-6">
                                <DropDownSelect title={"Bearbeiter auswählen"} onChange={getMember} options={allMember}/>
                            </div>
                        </div>
                        <div className="w-1/2 h-full p-6">
                            <div className="mb-6">
                                <DropDownSelect title={"Tag auswählen"} onChange={getTag} options={allTags}/>
                            </div>
                            <div className="mb-6">
                                <DropDownSelect title={"Priorität auswählen"} onChange={getPriority} options={allPriorities}/>
                            </div>
                        </div>
                    </div>
                    
                    
                    
                    <div className="mb-6">
                        <TextArea id="description" onChange={getDescription} placeholder="Beschreibung..."></TextArea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button onClick={props.onClick} className="bg-red hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="button">
                        Abbruch
                        </button>
                        <button className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="submit">
                        Erstellen
                        </button>
                        
                        
                    </div>
                </form>
            </div>
        </div>
    </div>
  ) : "";
}

export default NewTaskPopup