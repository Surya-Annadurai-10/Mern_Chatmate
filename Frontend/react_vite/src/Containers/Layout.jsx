import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import SideBar from './SideBar'
import { useThemeStore } from '../store/useThemeStore'

const Layout = () => {
  const {theme} = useThemeStore();
  console.log(theme , "themes");
  
  return (
    <div
    data-theme={theme}
    className='flex min-h-[100vh] w-[100%] '>
        <SideBar />
        <div className='w-[100%] h-full'>
            <NavBar className="w-full h-[10vh]" />
            <Outlet />
        </div>
    </div>
  )
}

export default Layout