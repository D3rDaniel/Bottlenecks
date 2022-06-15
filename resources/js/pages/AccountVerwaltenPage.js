import {React, useContext} from 'react'
import Sidebar from '../components/dashboard/sidebar/Sidebar'
import DashboardAccountVerwalten from '../components/dashboard/dashboardAccountVerwalten/DashboardAccountVerwalten'
import UserContext from '../store/user-context';
import { Navigate } from 'react-router-dom';

function AccountVerwaltenPage() {
  
  const userCtx = useContext(UserContext);

    return userCtx.user_id == null || userCtx.user_id == undefined ? <Navigate replace to='/Login'/> : 
      <div className='flex w-screen'>
              <Sidebar username={userCtx.user_name}/>
              <DashboardAccountVerwalten user={userCtx} token={userCtx.user_token}/>
      </div>
}

export default AccountVerwaltenPage