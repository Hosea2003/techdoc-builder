import React from 'react'
import { fetchProjects } from '../_actions/project-actions'
import ProjectWrapper from '../_components/projects/ProjectWrapper';

async function ProjectsPage() {
    const projects = await fetchProjects();
  return (
    <ProjectWrapper projects={projects}/>
  )
}

export default ProjectsPage