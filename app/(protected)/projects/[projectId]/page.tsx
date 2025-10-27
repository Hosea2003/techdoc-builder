import React from 'react'
import { fetchProjectDetails } from '../../_actions/project-actions'
import ProjectDetailsWrapper from '../../_components/projects/ProjectDetailsWrapper';

async function ProjectDetailsPage({
    params
}:{params:Promise<{projectId:string}>}) {
    const pathParams = await params;
    const project = await fetchProjectDetails(parseInt(pathParams.projectId))

    if(!project){
        return <div>Project not found</div>
    }
    return (
        <ProjectDetailsWrapper project={project}/>
    )
}

export default ProjectDetailsPage