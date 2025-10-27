import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function ProjectLoading() {
    const rows = Array.from({ length: 3 });
  return (
    <div className='p-3 flex flex-col gap-4'>
        <div className="flex w-full flex-wrap justify-between items-center">
            <p className="text-3xl">Projets</p>
            <Skeleton className='h-10 w-35 rounded-md'/>
        </div>
        {/* <ProjectList/> */}
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
          {rows.map((_, index) => (
            <tr key={index}>
                {Array.from({ length: 4 }).map((_, i) => (
                <td key={i} className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-full rounded" />
                </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ProjectLoading