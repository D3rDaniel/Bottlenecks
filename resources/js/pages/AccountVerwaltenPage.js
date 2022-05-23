import React from 'react'
import Sidebar from '../components/dashboard/sidebar/Sidebar'
import DashboardAccountVerwalten from '../components/dashboard/dashboardAccountVerwalten/DashboardAccountVerwalten'

function AccountVerwaltenPage() {
  return (
    <div className='flex w-screen'>
            <Sidebar></Sidebar>
            <DashboardAccountVerwalten></DashboardAccountVerwalten>
    </div>
  )
}

export default AccountVerwaltenPage