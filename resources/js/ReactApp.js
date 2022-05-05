import React from 'react';
import ReactDOM from 'react-dom';
import SidebarProject from './components/projectDashboard/sidebar/Sidebar'
import DashboardTasks from './components/projectDashboard/dashboardTasks/DashboardTasks'

export default function ReactApp() {
    return (
        <div className="bg-customgray flex h-screen w-screen font-body">
            <SidebarProject />
            <DashboardTasks />
        </div>
    );
}

if (document.getElementById('root')) {
    ReactDOM.render(<ReactApp />, document.getElementById('root'));
}