import React from 'react';
import ReactDOM from 'react-dom/client';
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ReactApp />
    </BrowserRouter>
);
