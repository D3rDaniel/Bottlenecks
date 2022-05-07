import React from 'react';
import ReactDOM from 'react-dom';
import DashboardPage from './pages/DashboardPage'
import ProjectPage from './pages/ProjectPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function ReactApp() {
    return (
        <div className="bg-customgray flex h-screen w-screen font-body">
            <Routes>
                <Route exact path='/' element={<DashboardPage/>}/>
                <Route path='/project' element={<ProjectPage/>}/>
            </Routes>
        </div>
    );
}

if (document.getElementById('root')) {
    ReactDOM.render(
        <BrowserRouter>
            <ReactApp />
        </BrowserRouter>
        , document.getElementById('root')
        );
}