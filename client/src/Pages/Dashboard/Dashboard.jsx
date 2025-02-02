import React from 'react';
import SideBar from '../../Components/Sidebar';
import Body from '../../Components/Body';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="dashboard-body">
        <Body />
      </div>
    </div>
  );
};

export default Dashboard;
