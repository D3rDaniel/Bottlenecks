import React from 'react'

import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import Tags from '../components/projectDashboard/dashboardTags/dashboardTags'

const Project_TagsPage = (props) => {
  return (
    <div className='flex w-screen'>
        <Sidebar page="tags"/>
        <Tags projectID={props.projectID}/>  
    </div>
  )
}

export default Project_TagsPage