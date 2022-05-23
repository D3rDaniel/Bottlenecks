import React from 'react'
import Sidebar from '../components/dashboard/sidebar/Sidebar'
import DashboardRaumbuchungen from '../components/dashboard/dashboardRaumbuchungen/DashboardRaumbuchungen'

function RaumbuchungenPage() {
  return (
    <div className='flex w-screen'>
            <Sidebar></Sidebar>
            <DashboardRaumbuchungen></DashboardRaumbuchungen>
    </div>
  )
}

export default RaumbuchungenPage