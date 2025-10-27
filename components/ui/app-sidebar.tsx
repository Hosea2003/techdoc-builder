import React from 'react'
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu } from './sidebar'
import Link from 'next/link'
import { FolderRoot, LayoutDashboard } from 'lucide-react'

const navigation = [
    {
        label:"Dashboard",
        href:"/dashboard",
        icon:LayoutDashboard
    },
    {
        label:"Projets",
        href:"/projects",
        icon:FolderRoot
    }
]

function AppSidebar() {
  return (
    <Sidebar>
        <SidebarContent>
            <SidebarHeader>
                <Link className='text-2xl text-center my-4' href={"/dashboard"}>
                    <span className='text-primary'>TechDoc</span>
                    Builder
                </Link>
            </SidebarHeader>
            <SidebarMenu>
                {navigation.map((nav, index)=>(
                    <Link
                        key={index}
                        href={nav.href}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                    >
                        {<nav.icon className="w-4 h-4" />}
                        <span className="text-sm">{nav.label}</span>
                    </Link>
                ))}
            </SidebarMenu>
        </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar