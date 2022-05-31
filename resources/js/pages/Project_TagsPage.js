import React from 'react'

import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import Tags from '../components/projectDashboard/dashboardTags/dashboardTags'

const Project_TagsPage = () => {
  return (
    <div className='flex w-screen'>
        <Sidebar page="tags"/>
        <Tags />  
    </div>
  )
}

export default Project_TagsPage