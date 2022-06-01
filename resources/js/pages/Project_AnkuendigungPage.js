import React from 'react'

import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import Ankuendigung from '../components/projectDashboard/dashboardAnkuendigung/dashboardAnkuendigung'

const Project_AnkuendigungPage = (props) => {
  
  return (
    <div className='flex w-screen'>
        <Sidebar page="ankuendigungen"/>
        <Ankuendigung projectID={props.projectID}/>  
    </div>
  )
}

export default Project_AnkuendigungPage