import React , {useEffect, useState} from 'react'

import MinView from '../dashboardTasks/TaskMinimumView'

const MonthView = (props) => {
    const [currentDate] = useState(new Date());

    const checkTaskMonth = (date) => {
        let task_day = date.substring(10,8);
        let task_month = date.substring(7,5);
        let task_year = date.substring(4,0);

        let day_difference = parseInt(task_day)-currentDate.getDate();
        let month_difference = parseInt(task_month)-(currentDate.getMonth()+1);
        let year_difference = parseInt(task_year)-currentDate.getFullYear();

        let total_difference = day_difference + (month_difference*31) + (year_difference*12*31)

        if(total_difference >= 8 && total_difference < 32) return true;
        else return false;
    }

  return (
    <div className="w-full h-1/3 bg-gray-400 rounded-xl overflow-auto drop-shadow-xl z-0">
        <div className="mt-2 ml-5 font-bold">Endet diesen Monat:</div>
        {props.tasks.map((task, index) => {
            return (checkTaskMonth(task.due_date) ? (      
            <MinView
                title={(task.title.length > 27) ? task.title.substring(0,24)+'...' : task.title}
                fullTitle = {task.title}
                description = {task.description}
                comment = {(task.completion_comment === null ? "noch nicht abgeschlossen" : task.completion_comment)}
                status = {task.status}
                prio = {task.priority !== null ? task.priority.title : "keine Priorität"}
                completedDate = {(task.completed_date === null ? "not completed" : task.completed_date)}
                date = {task.due_date}
                updated_at = {task.updated_at.substring(0,10)}
                creator = {task.creator.username}
                assignee = {task.assignee}
                tag = {task.tag == null ? "keine Tag" : task.tag.title}
                deadlineView = {true}
                key={index}>
            </MinView>
            ) : (null))
        })}
    </div>
  )
}

export default MonthView