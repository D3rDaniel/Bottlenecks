import React , {useEffect, useState} from 'react'

import MinView from '../dashboardTasks/TaskMinimumView'

const MonthView = (props) => {
    const [currentDate] = useState(new Date().getMonth()+1);

    const checkTaskMonth = (date) => {
        let checkMonth; 
        (date.charAt(6) <= currentDate) ? checkMonth = true : checkMonth = false;
        return checkMonth;
    }

  return (
    <div className="w-full h-1/3 bg-gray-400 rounded-xl overflow-auto drop-shadow-xl">
        <div className="mt-2 ml-5 font-bold">Endet diesen Monat:</div>
        {props.tasks.map((task, index) => {
            return (checkTaskMonth(task.date) ? (      
            <MinView
                title={(task.title.length > 27) ? task.title.substring(0,24)+'...' : task.title}
                fullTitle = {task.title}
                description = {"DummyDesc"}//{task.description}
                comment = {(task.completion_comment === null ? "noch nicht abgeschlossen" : task.completion_comment)}
                status = {task.status}//{task.status.title}
                prio = {task.prio}//{task.priority.title}
                completedDate = {(task.completed_date === null ? "not completed" : task.completed_date)}
                date = {task.date}//{task.due_date}
                updated_at = {"Dummy Updatet"}//{task.updated_at.substring(0,10)}
                creator = {"DummyErsteller"}//{task.creator.username}
                assignee = {"DummyAssign"}//{task.assignee}
                tag = {"dummyTag"}//{task.tag.title == null ? "keine Tag" : task.tag.title}
                key={index}>
            </MinView>
            ) : (null))
        })}
    </div>
  )
}

export default MonthView