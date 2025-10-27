"use client";

import { useProjectStore } from '@/store/projectStore';
import { Project } from '@/types/project';
import React, { useEffect } from 'react'
import ProjectDetails from './ProjectDetails';

function ProjectDetailsWrapper({project}:{project:Project}) {
    const {addProjects, addEquipmentToProject, projects} = useProjectStore();

    useEffect(()=>{
        addProjects([project]);
        addEquipmentToProject(project.id, project.equipment??[]);
    }, [project, addProjects, addEquipmentToProject]);

    return (
        <ProjectDetails project={projects.find(p=>p.id===project.id)!}/>
    )
}

export default ProjectDetailsWrapper