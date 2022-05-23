import React from 'react';
import ReactDOM from 'react-dom/client';
import DashboardPage from './pages/DashboardPage'
import ProjectPage from './pages/ProjectPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AnkündigungenPage from './pages/AnkündigungenPage';
import AbgeschlosseneTasksPage from './pages/AbgeschlosseneTasksPage';
import OffeneTasksPage from './pages/OffeneTasksPage';
import AccountVerwaltenPage from './pages/AccountVerwaltenPage';
import RaumbuchungenPage from './pages/RaumbuchungenPage';

export default function ReactApp() {
    return (
        <div className="bg-customgray relative flex h-screen w-screen font-body">
            <Routes>
                <Route exact path='/' element={<DashboardPage/>}/>
                <Route path='/project' element={<ProjectPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/ankuendigungen' element={<AnkündigungenPage/>}/>
                <Route path='/abgeschlosseneTasks' element={<AbgeschlosseneTasksPage/>}/>
                <Route path='/offeneTasks' element={<OffeneTasksPage/>}/>
                <Route path='/accountVerwalten' element={<AccountVerwaltenPage/>}/>
                <Route path='/raumbuchungen' element={<RaumbuchungenPage/>}/>
            </Routes>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ReactApp />
    </BrowserRouter>
);
