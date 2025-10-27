"use client";

import { useProjectStore } from '@/store/projectStore'
import React from 'react'
import SaveProjectForm from './SaveProjectForm';
import {useRouter} from "nextjs-toploader/app"

function ProjectList() {
  const router = useRouter();
  const {projects} = useProjectStore();
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-input">
      <table className="min-w-full divide-y">
        <thead className="bg-sidebar">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Client
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {projects.map((row, index) => (
            <tr key={index} className='hover:bg-sidebar cursor-pointer'
              onClick={()=>router.push(`/projects/${row.id}`)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                {row.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {row.client}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {row.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                <SaveProjectForm project={row}/>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-4 text-center"
              >
                No projects available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProjectList