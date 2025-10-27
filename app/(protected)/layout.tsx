import AppSidebar from '@/components/ui/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import TopBar from '@/components/ui/topbar'
import React from 'react'

function ProtectedLayout({
    children
}:{
    children:React.ReactNode
}) {
  return (
    <div className='min-h-screen bg-background'>
        <SidebarProvider>
            <AppSidebar/>
            <main className="flex flex-col gap-4 w-full">
                <TopBar/>
                {children}
            </main>
        </SidebarProvider>
    </div>
  )
}

export default ProtectedLayout