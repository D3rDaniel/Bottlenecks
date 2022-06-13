import React from 'react'

import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import Overview from '../components/projectDashboard/dashboardOverview/dashboardOverView'
import Project_TagsPage from './Project_TagsPage'

const Project_OverviewPage = (props) => {
  return (
    <div className='flex w-screen'>
        <Sidebar page="uebersicht"/>
        <Overview projectID ={props.projectID}/>  
    </div>
  )
}

export default Project_OverviewPage