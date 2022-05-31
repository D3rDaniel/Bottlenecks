import React from 'react'

import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import Overview from '../components/projectDashboard/dashboardOverview/dashboardOverView'

const Project_OverviewPage = () => {
  return (
    <div className='flex w-screen'>
        <Sidebar page="uebersicht"/>
        <Overview />  
    </div>
  )
}

export default Project_OverviewPage