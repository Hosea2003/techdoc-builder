import { Project } from '@/types/project'
import React from 'react'
import AddEqupiment from './AddEquipment';

function EquipmentList({project}:{project:Project}) {
  console.log(project)
  const equiments = project.equipments??[];
  return (
    <div className='flex flex-col gap-2'>
      <AddEqupiment projectId={project.id}/>
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
            {equiments.map((row, index) => (
              <tr key={index} className='hover:bg-sidebar cursor-pointer'>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.room}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                  {/* <SaveProjectForm project={row}/> */}
                </td>
              </tr>
            ))}
            {equiments.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center"
                >
                  No equiments available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EquipmentList