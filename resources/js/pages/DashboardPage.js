import {React, useContext} from 'react';
import Sidebar from '../components/dashboard/sidebar/Sidebar';
import DashboardProjects from '../components/dashboard/dashboardProjects/DashboardProjects';
import UserContext from '../store/user-context';
import { Navigate } from 'react-router-dom';

function DashboardPage () {

    const userCtx = useContext(UserContext);

    return userCtx.user_id == null || userCtx.user_id == undefined ? <Navigate replace to='/Login'/> : 
        <div className='flex w-screen'>
            <Sidebar username={userCtx.user_name} token={userCtx.user_token}/>
            <DashboardProjects userID={userCtx.user_id} username={userCtx.user_name} token={userCtx.user_token}/>
        </div>
}

export default DashboardPage