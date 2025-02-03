import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaRegTimesCircle } from "react-icons/fa"; // Import icons
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loading icon
import { BsFillFileImageFill } from "react-icons/bs"; // File icon
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
        setIsDetecting(true);
        const response = await axios.post("http://127.0.0.1:8000/detect", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const detectionResults = response.data.detections || [];
        setDetections(detectionResults);
        setIsDetecting(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsDetecting(false);
        setErrorMessage("Error detecting flowers. Please try again.");
      }
    }
  };

  const handleFlowerClick = (flowerId) => {
    navigate(`/dashboard/flower/${flowerId}`);
  };

  React.useEffect(() => {
    fetchFlowersData();
  }, []);

  return (
    <div className="upload-container">
      <h1 className="upload-title">Flower Recognition - Upload Image</h1>

      <div className="upload-box">
        <label className="upload-label">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="file-input"
          />
          <div className="upload-text">
            <FaCloudUploadAlt size={40} />
            <span>{selectedFile ? `File selected: ${selectedFile.name}` : "Click to choose a file"}</span>
          </div>
        </label>

        {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Selected" />}
      </div>

      {isDetecting && <div className="loading"><AiOutlineLoading3Quarters size={30} className="spin" /> Detecting flowers...</div>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="detections">
        <h2>Detected Flowers</h2>
        {detections.length > 0 ? (
          detections.map((detection, idx) => {
            const flowerName = detection.flower_name;  // ✅ Fixed key name
            const flowerId = flowerIdMap[flowerName];
            const flowerDetails = flowersData[flowerName] || {}; // ✅ Prevent undefined errors

            return (
              <div
                key={idx}
                className="detection-item"
                onClick={() => handleFlowerClick(flowerId)}
              >
                <p><strong>Name:</strong> {flowerName}</p>
                <p><strong>Scientific Name:</strong> {flowerDetails.scientific_name || "N/A"}</p>
                <p><strong>Other Names:</strong> {flowerDetails.other_names || "N/A"}</p>
                <p><strong>Family:</strong> {flowerDetails.family || "N/A"}</p>
                <p><strong>Symbolism:</strong> {flowerDetails.symbolism || "N/A"}</p>
                <img src={flowerDetails.image_url || "default_image.jpg"} alt={flowerName} />
              </div>
            );
          })
        ) : (
          <p className="no-detection">No flowers detected. Please upload another image.</p>
        )}
      </div>


      <button className="upload-btn" onClick={() => setSelectedFile(null)}>
        <FaRegTimesCircle size={20} /> Clear Upload
      </button>
    </div>
  );
};

export default UploadRecognition;
