import { Outlet } from 'react-router-dom';
import { useState } from 'react'
import SideBar from './dashboardComps/SideBar'
import TopBar from './dashboardComps/TopBar'
import MobileSideBar from './dashboardComps/MobileSideBar';




export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <MobileSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
        {/* Static sidebar for desktop */}
        <SideBar/>
        <div className="lg:pl-72">
        <TopBar setSidebarOpen={setSidebarOpen} />
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
