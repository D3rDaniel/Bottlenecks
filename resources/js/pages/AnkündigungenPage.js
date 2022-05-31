import React from 'react'
import DashboardAnkündigungen from '../components/dashboard/dashboardAnkündigungen/DashboardAnkündigungen'
import Sidebar from '../components/dashboard/sidebar/Sidebar'

function AnkündigungenPage(props) {
  return (
    <div className='flex w-screen'>
            <Sidebar></Sidebar>
            <DashboardAnkündigungen userID={props.userID}></DashboardAnkündigungen>
    </div>
  )
}

export default AnkündigungenPage