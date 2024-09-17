import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const Aside = () => {
  return (
    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
      <div className="app-brand demo">
        <a href="index.html" className="app-brand-link">
          <img src="assets/img/logo1.png" alt="" width={150} />
        </a>
        <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
          <i className="bx bx-chevron-left bx-sm align-middle" />
        </a>
      </div>
      <div className="menu-inner-shadow" />
      <ul className="menu-inner py-1">
        <li className="menu-header small text-uppercase">
          <span className="menu-header-text">Pages</span>
        </li>
        <li className="menu-item">
          <Link  to="addTask" className="menu-link ">
            <div>Add Task</div>
          </Link>
        </li>
        <li className="menu-item ">
          <Link to="viewTask" className="menu-link ">
            <div>View Task</div>
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Aside;
