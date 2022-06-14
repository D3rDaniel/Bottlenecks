import { createContext, useState, React } from "react";

const ProjectContext = createContext({
    project_id: null,
    project_title: null,
    project_admin: null,

    clear: () => {},
    select: (id, title, admin) => {},
});

export function ProjectContextProvider (props) {

    const [selectedProject, setSelectedProject] = useState({})

    function setSelection(id, title, admin){
        setSelectedProject({
            project_id: id,
            project_title: title,
            project_admin: admin
        })
    }

    function clearSelection(){
        setSelectedProject({
            project_id: null,
            project_title: null,
            project_admin: null
        })
        
    }

    const context = {
        project_id: selectedProject.project_id,
        project_title: selectedProject.project_title,
        project_admin: selectedProject.project_admin,

        select: setSelection,
        clear: clearSelection
    };

    return <ProjectContext.Provider value={context}>
        {props.children}
    </ProjectContext.Provider>
}

export default ProjectContext