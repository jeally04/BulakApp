import React, { useState } from 'react';
import './Recognition.css';

const Recognition = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Handle camera activation
  const handleCameraToggle = () => {
    setCameraActive(!cameraActive);
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="recognition-container">
      <h1>Flower Recognition</h1>
      <div className="options-container">
        <button onClick={handleCameraToggle} className="option-button">
          {cameraActive ? 'Stop Camera' : 'Open Camera'}
        </button>
        <label htmlFor="file-upload" className="option-button">
          Upload Image/Video
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Camera Stream */}
      {cameraActive && (
        <div className="camera-stream">
          <p>Camera live stream will appear here.</p>
          {/* Add live camera feed using a library like webcam-easy or react-webcam */}
        </div>
      )}

      {/* Uploaded File Preview */}
      {uploadedFile && (
        <div className="uploaded-preview">
          <h2>Uploaded File:</h2>
          {uploadedFile.endsWith('.mp4') || uploadedFile.endsWith('.webm') ? (
            <video src={uploadedFile} controls className="preview-video" />
          ) : (
            <img src={uploadedFile} alt="Uploaded Preview" className="preview-image" />
          )}
        </div>
      )}
    </div>
  );
};

export default Recognition;
