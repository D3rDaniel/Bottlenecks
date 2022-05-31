import React from 'react'

import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import Ankuendigung from '../components/projectDashboard/dashboardAnkuendigung/dashboardAnkuendigung'

const Project_AnkuendigungPage = () => {
  return (
    <div className='flex w-screen'>
        <Sidebar page="ankuendigungen"/>
        <Ankuendigung />  
    </div>
  )
}

export default Project_AnkuendigungPage