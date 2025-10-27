import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function ProjectDetailsLoading() {
    const rows = Array.from({length:5})
  return (
    <div className='p-3 flex flex-col gap-4'>
        <div className="flex justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-4">
                <Skeleton className='h-4 w-30 rounded-lg'/>
                <Skeleton className='h-4 w-30 rounded-lg'/>
                <Skeleton className='h-4 w-30 rounded-lg'/>
            </div>
            <div className="flex gap-4 flex-wrap">
                <Skeleton className='h-10 w-35'/>
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <Skeleton className='h-10 w-35'/>
            <div className="overflow-x-auto rounded-lg shadow border border-input">
        <table className="min-w-full divide-y">
          <thead className="bg-sidebar">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Quantité
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((_, index) => (
              <tr key={index} className='hover:bg-sidebar cursor-pointer'>
                {Array.from({length:5}).map((_, i)=>(
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
    </div>
  )
}

export default ProjectDetailsLoading