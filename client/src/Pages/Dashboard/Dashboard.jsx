import React from 'react';
import { Outlet } from 'react-router-dom';  // Import Outlet to render nested routes
import SideBar from '../../Components/Sidebar';
import Body from '../../Components/Body';  // You can still keep Body, but the Outlet will allow nested pages
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="dashboard-body">
        {/* You can still render Body here, or use Outlet to render nested components */}
        <Body />
        {/* This will render nested routes like /dashboard/uploadrecognition, /dashboard/explore, etc. */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
