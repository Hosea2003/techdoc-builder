import React from 'react'
import { SidebarTrigger } from './sidebar'
import ThemeSwitcher from './theme-switcher'

function TopBar() {
  return (
     <div className="sticky top-0 z-10 bg-background border-b border-border px-4 flex items-center py-2 w-full justify-between">
        <SidebarTrigger/>
        <div className="flex items-center">
            <ThemeSwitcher/>
        </div>
    </div>
  )
}

export default TopBar