import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Dashbody from '../Pages/DashBody/DashBody';
import Recognition from '../Pages/Recognition/Recognition';
import Explore from '../Pages/Explore/Explore';
import History from '../Pages/History/History';
import Favorite from '../Pages/Favorite/Favorite';
import Flower from '../Components/Flower'; // Import the Flower component
import AllFlowers from '../Pages/AllFlowers/AllFlowers';
import AllFlowerTypes from '../Pages/AllFlowerTypes/AllFlowerTypes';
import FlowerTypes from '../Pages/FlowerTypes/FlowerTypes';
import UploadRecognition from '../Pages/UploadRecognition/UploadRecognition'; 

const Body = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Routes>
        {/* Redirect the root path to dashbody */}
        <Route path="/" element={<Navigate to="dashbody" />} />
        <Route path="dashbody" element={<Dashbody />} />
        <Route path="recognition" element={<Recognition />} />
        <Route path="uploadrecognition" element={<UploadRecognition />} />
        <Route path="explore" element={<Explore />} />
        <Route path="history" element={<History />} />
        <Route path="favorite" element={<Favorite />} />
        
        {/* Nested route for displaying a specific flower */}
        <Route path="flower/:id" element={<Flower />} /> {/* This will load Flower inside the dashboard */}
        <Route path="/all-flowers" element={<AllFlowers />} />

        <Route path="all-flower-types" element={<AllFlowerTypes />} />

        <Route path="flower-types/:typeName" element={<FlowerTypes />} />


      </Routes>
    </div>
  );
};

export default Body;
