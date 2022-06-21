import {React, useContext} from 'react'
import DashboardAnkündigungen from '../components/dashboard/dashboardAnkündigungen/DashboardAnkündigungen'
import Sidebar from '../components/dashboard/sidebar/Sidebar'
import UserContext from '../store/user-context';
import { Navigate } from 'react-router-dom';

function AnkündigungenPage() {
  
  const userCtx = useContext(UserContext);

    return userCtx.user_id == null || userCtx.user_id == undefined ? <Navigate replace to='/Login'/> : 
    <div className='flex w-screen'>
            <Sidebar username={userCtx.user_name} token={userCtx.user_token}/>
            <DashboardAnkündigungen userID={userCtx.user_id} token={userCtx.user_token}/>
    </div>
}

export default AnkündigungenPage