import React from 'react'
import SaveProjectForm from '../_components/projects/SaveProjectForm'

function ProjectsPage() {
  return (
    <div className='p-3 flex flex-col gap-4'>
        <div className="flex w-full flex-wrap justify-between items-center">
            <p className="text-3xl">Projets</p>
            <SaveProjectForm/>
        </div>
    </div>
  )
}

export default ProjectsPage