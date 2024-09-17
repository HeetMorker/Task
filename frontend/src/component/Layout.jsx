import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from './Common/Aside'
import Navbar from './Common/Navbar'


const Layout = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Aside />
          <div className="layout-page">
            <Navbar />
            <Outlet />
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle" />
      </div>
  )
}

export default Layout