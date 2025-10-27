"use client"

import { useProjectStore } from '@/store/projectStore'
import { Project } from '@/types/project'
import React, { useEffect } from 'react'
import SaveProjectForm from './SaveProjectForm';
import ProjectList from './ProjectList';

function ProjectWrapper({projects}:{projects:Project[]}) {
    const {addProjects} = useProjectStore();

    useEffect(()=>{
        addProjects(projects)
    }, [projects, addProjects]);

  return (
    <div className='p-3 flex flex-col gap-4'>
        <div className="flex w-full flex-wrap justify-between items-center">
            <p className="text-3xl">Projets</p>
            <SaveProjectForm/>
        </div>
        <ProjectList/>
    </div>
  )
}

export default ProjectWrapper