import {React, useContext} from 'react'
import Sidebar from '../components/dashboard/sidebar/Sidebar'
import DashboardOffeneTasks from '../components/dashboard/dashboardOffeneTasks/DashboardOffeneTasks'
import UserContext from '../store/user-context';
import { Navigate } from 'react-router-dom';

function OffeneTasksPage() {

  const userCtx = useContext(UserContext);

    return userCtx.user_id == null || userCtx.user_id == undefined ? <Navigate replace to='/Login'/> : 
    <div className='flex w-screen'>
            <Sidebar username={userCtx.user_name}/>
            <DashboardOffeneTasks userID={userCtx.user_id}/>
    </div>
}

export default OffeneTasksPage