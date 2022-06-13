import React from 'react'

import { PieChart } from 'react-minimal-pie-chart';

const PieView = (props) => {
    let completed = props.tasks.completed_tasks;
    let progress = props.tasks["in-progress_tasks"];
    let failed = props.tasks.failed_tasks;
    let paused = props.tasks.paused_tasks;

  return (
    <div className="h-5/6 w-1/2 mt-8">
        <PieChart
            label={({ dataEntry }) => dataEntry.value !== 0 ? dataEntry.title : "" }
            startAngle={270}
            labelStyle={(index) => ({
                fontSize: '5px',
                fill: 'white'
              })}
            data={[
                {title: 'Abgeschlossen' , value: completed , color: '#42A8FD'},
                {title: 'in Bearbeitung' , value: progress , color: '#FFBB29'},
                {title: 'Abgebrochen' , value: failed , color: '#FF3838'},
                {title: 'Pausiert' , value: paused , color: '#ADADAD'}
            ]}
        />
    </div>
  )
}

export default PieView