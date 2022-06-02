import React from 'react'

import Progressbar from '../../../progressBar'

const InfoView = (props) => {
  return (
      <div className="h-full w-1/2">
        <div className="font-bold">Mitglieder</div>
        <div className="mt-1 mb-2">
            {props.project.members.map(member => 
                <label key={member.username}>{member.username}, </label>
            )} 
        </div>
        <div className="font-bold">Beschreibung</div>
        <div className="mt-1 mb-2">{props.project.description}</div>
        <div className="font-bold">Enddatum</div>
        <div className="mt-1 mb-2">{props.project.due_date}</div>
        <div className="mr-2">
            <div className="font-bold mb-2">Fortschritt</div>
            <Progressbar progressPercentage = {props.project.progress_percentage} />
        </div>
        
      </div>
  )
}
export default InfoView