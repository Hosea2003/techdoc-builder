"use client";

import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from './button';
import { MoonStarIcon, Sun } from 'lucide-react';

function ThemeSwitcher() {
  const {resolvedTheme, setTheme} = useTheme();
  return (
    <Button variant={"ghost"} onClick={()=>setTheme(resolvedTheme==="light"?"dark":"light")}>
      {resolvedTheme==="light"?(
        <MoonStarIcon/>
      ):(
        <Sun/>
      )}
    </Button>
  )
}

export default ThemeSwitcher