import { Project } from '@/types/project';
import React from 'react'
import SaveProjectForm from './SaveProjectForm';
import EquipmentList from '../equiments/EquipmentList';

function ProjectDetails({project}:{project?:Project}) {
    if(!project){
        return null;
    }
  return (
    <div className='p-3 flex flex-col gap-4'>
        <div className="flex justify-between flex-wrap gap-4">
            <div className="flex flex-col">
                <p className="text-xl font-semibold">{project.name}</p>
                <p className='text-muted-foreground font-semibold'>Client: {project.client}</p>
                <p className='text-muted-foreground font-semibold'>Date: {project.date}</p>
            </div>
            <div className="flex gap-4 flex-wrap">
                <SaveProjectForm project={project}/>
            </div>
        </div>
        <EquipmentList project={project}/>
    </div>
  )
}

export default ProjectDetails