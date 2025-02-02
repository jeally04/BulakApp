import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from '../../Components/Sidebar';
import Body from '../../Components/Body';
import Recognition from '../../Pages/Recognition/Recognition';
import UploadRecognition from '../../Pages/Recognition/uploadrecognition';
import DashBody from '../DashBody/DashBody';
import Explore from '../Explore/Explore';
import History from '../History/History';
import Favorite from '../Favorite/Favorite';

import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="dashboard-body">
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path='dashbody' element={<DashBody/>} />
          <Route path="recognition" element={<Recognition />} />
          <Route path="uploadrecognition" element={<UploadRecognition />} />
          <Route path="explore" element={<Explore />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="history" element={<History />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
