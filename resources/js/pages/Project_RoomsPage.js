import React from 'react'

import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import Rooms from '../components/projectDashboard/dashboardRooms/dashboardRooms'

const Project_RoomsPage = (props) => {
  return (
    <div className='flex w-screen'>
        <Sidebar page="rooms"/>
        <Rooms projectID={props.projectID}/>  
    </div>
  )
}

export default Project_RoomsPage