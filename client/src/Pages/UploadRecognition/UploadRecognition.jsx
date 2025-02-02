import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UploadRecognition.css";

const UploadRecognition = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [detections, setDetections] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [flowersData, setFlowersData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const flowerIdMap = { 
    "Red Rose": 1,
    "Pink Rose": 12,
    "White Rose": 13,
    "Desert Rose": 14,
    "Sunflower": 5,
    "Gumamela": 15,
    "Yellow Rose": 2,
    "Anthurium": 16,
    "Yellow Alder": 22,
    "Chrysanthemum": 18,
    "Yellow Chrysanthemum": 19,
    "Magenta Chrysanthemum": 20,
    "White Anthurium": 21,
  };

  // Fetch flower data from API
  const fetchFlowersData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/flowers");
      const flowers = response.data.reduce((acc, flower) => {
        acc[flower.flower_name] = flower;
        return acc;
      }, {});
      setFlowersData(flowers);
    } catch (error) {
      console.error("Error fetching flower data:", error);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setErrorMessage(""); // Reset error message

    if (file) {
      const formData = new FormData();
      formData.append("file", file); 

      try {
        setIsDetecting(true); // Set detecting flag to true
        const response = await axios.post("http://localhost:8000/detect", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const detectionResults = response.data.detections || [];
        setDetections(detectionResults);
        setIsDetecting(false); // Reset detecting flag
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsDetecting(false); // Reset detecting flag on error
        setErrorMessage("Error detecting flowers. Please try again.");
      }
    }
  };

  const handleFlowerClick = (flowerId) => {
    navigate(`/dashboard/flower/${flowerId}`);
  };

  // Fetch flower data on mount
  React.useEffect(() => {
    fetchFlowersData();
  }, []);

  return (
    <div className="upload-recognition-container">
      <h1 className="upload-title">Flower Recognition - Upload Image</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="file-input"
      />
      {isDetecting && <p>Detecting flowers...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="detections">
        <h2>Detected Flowers</h2>
        {detections.length > 0 ? (
          detections.map((detection, idx) => {
            const flowerName = detection.class_name; // Assuming detection includes class_name
            const flowerId = flowerIdMap[flowerName];
            const flowerDetails = flowersData[flowerName];

            return (
              <div
                key={idx}
                className="detection-card"
                onClick={() => handleFlowerClick(flowerId)}
              >
                <div className="detection-info">
                  <p><strong>Name:</strong> {flowerName}</p>
                  <p><strong>Scientific Name:</strong> {flowerDetails?.scientific_name || "N/A"}</p>
                  <p><strong>Other Names:</strong> {flowerDetails?.other_names || "N/A"}</p>
                  <p><strong>Family:</strong> {flowerDetails?.family || "N/A"}</p>
                  <p><strong>Symbolism:</strong> {flowerDetails?.symbolism || "N/A"}</p>
                </div>
                <div className="flower-image">
                  <img src={flowerDetails?.image_url || "default_image.jpg"} alt={flowerName} />
                </div>
              </div>
            );
          })
        ) : (
          <p>No flowers detected. Please upload another image.</p>
        )}
      </div>
    </div>
  );
};

export default UploadRecognition;
