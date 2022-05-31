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
import Project_AdminPage from './pages/Project_AdminPage'
import Project_AnkuendiungPage from './pages/Project_AnkuendigungPage'
import Project_DeadlinePage from './pages/Project_DeadlinePage'
import Project_UebersichtPage from './pages/Project_OverviewPage'
import Project_RoomsPage from './pages/Project_RoomsPage'
import Project_TagsPage from './pages/Project_TagsPage'

export default function ReactApp() {

    let userID = 2;

    return (
        <div className="bg-customgray relative flex h-screen w-screen font-body">
            <Routes>
                <Route exact path='/' element={<DashboardPage userID={userID}/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage userID={userID}/>}/>
                <Route path='/ankuendigungen' element={<AnkündigungenPage userID={userID}/>}/>
                <Route path='/abgeschlosseneTasks' element={<AbgeschlosseneTasksPage userID={userID}/>}/>
                <Route path='/offeneTasks' element={<OffeneTasksPage userID={userID}/>}/>
                <Route path='/accountVerwalten' element={<AccountVerwaltenPage userID={userID}/>}/>
                <Route path='/raumbuchungen' element={<RaumbuchungenPage userID={userID}/>}/>
                <Route path='/project' element={<ProjectPage/>}/>
                <Route path='/project/admin' element={<Project_AdminPage />}/>
                <Route path='/project/ankuendigungen' element={<Project_AnkuendiungPage />}/>
                <Route path='/project/deadline' element={<Project_DeadlinePage />}/>
                <Route path='/project/uebersicht' element={<Project_UebersichtPage/>}/>
                <Route path='/project/rooms' element={<Project_RoomsPage />}/>
                <Route path='/project/tags' element={<Project_TagsPage />}/>
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
