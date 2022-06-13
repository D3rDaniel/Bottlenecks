import {React, useContext} from 'react'
import Sidebar from '../components/dashboard/sidebar/Sidebar'
import DashboardRaumbuchungen from '../components/dashboard/dashboardRaumbuchungen/DashboardRaumbuchungen'
import UserContext from '../store/user-context';
import { Navigate } from 'react-router-dom';

function RaumbuchungenPage() {
  
  const userCtx = useContext(UserContext);

    return userCtx.user_id == null || userCtx.user_id == undefined ? <Navigate replace to='/Login'/> : 
      <div className='flex w-screen'>
              <Sidebar username={userCtx.user_name}/>
              <DashboardRaumbuchungen userID={userCtx.user_id} token={userCtx.user_token}/>
      </div>
}

export default RaumbuchungenPage