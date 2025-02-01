import React from 'react';
import './Dashbody.css';
import Top from '../DashBody/Top Section/Top';
import Listing from '../DashBody/Listing Section/Listing';
import Activity from '../DashBody/Activity Section/Activity';
import TopNav from '../../Components/TopNav';  // Import TopNav

const DashBody = () => {
  return (
    <div className="mainContent">
      <TopNav /> {/* TopNav will only appear here in DashBody */}
      <Top />
      
      <div className="bottom flex">
        <Listing />
        <Activity />
      </div>
    </div>
  );
};

export default DashBody;
