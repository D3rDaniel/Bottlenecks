import React, {useEffect, useState} from 'react'

const MemberMaxView = (props) => {
    let createTasks = (props.rights.can_create_tasks === "0") ? false : true;
    let assignTasks = (props.rights.can_assign_tasks === "0") ? false : true;
    let editTasks = (props.rights.can_edit_tasks === "0") ? false : true;
    let createTags = (props.rights.can_create_tags === "0") ? false : true;

  return (
    <div className="bg-gray-200 rounded-md -mt-5 shadow-bottom">
        <div className="mb-1 ml-4 pt-5"><label className="font-bold text-sm">Rechte</label></div>
        <div className="text-sm ml-4 pb-2">
            <div>
                <input type="checkbox" id="create Task" defaultChecked={createTasks}></input>
                <label htmlFor="create Task" className="ml-2">Task erstellen</label>  
            </div>
            <div>
                <input type="checkbox" id="assign Task" defaultChecked={assignTasks}></input>
                <label htmlFor="assign Task" className="ml-2">Task zuordnen</label>  
            </div><div>
                <input type="checkbox" id="edit Task" defaultChecked={editTasks}></input>
                <label htmlFor="edit Task" className="ml-2">Task bearbeiten</label>  
            </div><div>
                <input type="checkbox" id="create Tag" defaultChecked={createTags}></input>
                <label htmlFor="create Tag" className="ml-2">Tag erstellen</label>  
            </div>
        </div>
    </div>
  )
}

export default MemberMaxView