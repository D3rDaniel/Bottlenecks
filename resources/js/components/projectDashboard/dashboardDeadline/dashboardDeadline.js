import React, {useEffect, useState} from 'react'

import Searchbar from '../dashboardTasks/searchbar/SearchBar'
import WeekView from './WeekView'
import MonthView from './MonthView'

const tasks = [
    {title: "Task1", status: "abgeschlossen", prio: "Hoch", completedDate: "06.05.2022" , date: "2022-05-09"},
    {title: "Task2", status: "in Bearbeitung", prio: "Mittel", completedDate: "-" , date: "2022-05-09"},
    {title: "Task3", status: "in Bearbeitung", prio: "Mittel", completedDate: "-" , date: "2022-05-31"},
    {title: "Task4", status: "abgeschlossen", prio: "Gering", completedDate: "20.05.2022", date: "2022-05-09"},
    {title: "Task5", status: "in Bearbeitung", prio: "Gering", completedDate: "-", date: "2022-06-05"},
    {title: "Task6", status: "in Bearbeitung", prio: "Gering", completedDate: "-", date: "2022-06-06"},
    {title: "Task7", status: "in Bearbeitung", prio: "Gering", completedDate: "-", date: "2022-06-07"},
    {title: "Task8", status: "in Bearbeitung", prio: "Gering", completedDate: "-", date: "2022-06-08"},
    {title: "Task9", status: "in Bearbeitung", prio: "Gering", completedDate: "-", date: "2022-07-07"},
    {title: "Task10", status: "in Bearbeitung", prio: "Gering", completedDate: "-", date: "2022-07-09"},
    {title: "Task11", status: "in Bearbeitung", prio: "Gering", completedDate: "-", date: "2022-07-09"}
  ]

const dashboardDeadline = () => {
    const [tasksInWorking, setTasksInWorking] = useState([]);

    const checkWorkingTasks = () => {
        let workingTasks = [];

        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].status !== "abgeschlossen"){
                workingTasks.push(tasks[i]);
            }
        };
        setTasksInWorking(workingTasks);
    }

    useEffect(() => {
        checkWorkingTasks();
    }, [])
  return (
    <div className="flex flex-col w-full mx-2 my-2">
        <Searchbar />
        <div className="h-full w-full flex flex-col gap-10 mt-10">
            <WeekView tasks={tasksInWorking}/>
            <MonthView tasks={tasksInWorking}/>   
        </div>        
    </div>
  )
}

export default dashboardDeadline