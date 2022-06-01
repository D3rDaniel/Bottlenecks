import React from 'react'

import ProjectView from './AdminProjectView'
import AnkuendigungView from './AdminAnkuendigungView'
import MemberView from './MemberView'

const dashboardAdmin = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center ml-10 mr-5">
        <div className="flex flex-col justify-center h-full w-full mr-5 gap-10">
            <ProjectView />
            <AnkuendigungView />
        </div>
        
        <MemberView />
    </div>
  )
}

export default dashboardAdmin