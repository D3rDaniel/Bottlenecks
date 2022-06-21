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
import Project_AdminPage from './pages/Project_AdminPage';
import Project_AnkuendiungPage from './pages/Project_AnkuendigungPage';
import Project_DeadlinePage from './pages/Project_DeadlinePage';
import Project_UebersichtPage from './pages/Project_OverviewPage';
import Project_RoomsPage from './pages/Project_RoomsPage';
import Project_TagsPage from './pages/Project_TagsPage';
import { UserContextProvider } from './store/user-context';
import {ProjectContextProvider} from './store/project-context';
import InfoPage from './pages/InfoPage';
import ProjectInfoPage from './pages/ProjectInfoPage'

export default function ReactApp() {


    return (
        <div className="bg-customgray relative flex h-screen w-screen font-body">
            <UserContextProvider>
                <ProjectContextProvider>
                <Routes>
                    <Route exact path='/' element={<DashboardPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                    <Route path='/ankuendigungen' element={<AnkündigungenPage/>}/>
                    <Route path='/abgeschlosseneTasks' element={<AbgeschlosseneTasksPage/>}/>
                    <Route path='/offeneTasks' element={<OffeneTasksPage/>}/>
                    <Route path='/accountVerwalten' element={<AccountVerwaltenPage/>}/>
                    <Route path='/raumbuchungen' element={<RaumbuchungenPage/>}/>
                    <Route path='/info' element={<InfoPage/>}/>
                    <Route path='/project' element={<ProjectPage/>}/>
                    <Route path='/project/admin' element={<Project_AdminPage/>}/>
                    <Route path='/project/ankuendigungen' element={<Project_AnkuendiungPage/>}/>
                    <Route path='/project/deadline' element={<Project_DeadlinePage/>}/>
                    <Route path='/project/uebersicht' element={<Project_UebersichtPage/>}/>
                    <Route path='/project/rooms' element={<Project_RoomsPage/>}/>
                    <Route path='/project/tags' element={<Project_TagsPage/>}/>
                    <Route path='/project/info' element={<ProjectInfoPage/>}/>
                </Routes>
                </ProjectContextProvider>
            </UserContextProvider>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ReactApp />
    </BrowserRouter>
);
