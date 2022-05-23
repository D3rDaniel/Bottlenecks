import React from 'react'
import SearchBar from '../dashboardProjects/searchbar/SearchBar'

function DashboardAbgeschlosseneTasks() {
  return (
    <div className="flex flex-col w-full m-1 ml-2">
        <SearchBar />
        
        <div>
          AbgeschlosseneTasks
        </div>

    </div>
  )
}

export default DashboardAbgeschlosseneTasks