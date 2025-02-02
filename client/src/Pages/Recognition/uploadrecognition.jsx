import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./UploadRecognition.css";

const UploadRecognition = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [detections, setDetections] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [processedImageURL, setProcessedImageURL] = useState(null);
  const [flowersData, setFlowersData] = useState({});

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

  useEffect(() => {
    // Fetch flowers data on component mount
    axios
      .get("http://localhost:3002/flowers")
      .then((response) => {
        const flowers = response.data.reduce((acc, flower) => {
          acc[flower.flower_name] = flower;
          return acc;
        }, {});
        setFlowersData(flowers);
      })
      .catch((err) => console.error("Error fetching flowers", err));
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageURL(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsUploading(true);
      const response = await axios.post("http://localhost:8000/detect/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const detectionResults = response.data.detections || [];
      if (detectionResults.length > 0) {
        setDetections(detectionResults);
        if (response.data.processedImage) {
          setProcessedImageURL(response.data.processedImage);
        }
      } else {
        setDetections([]);
        setProcessedImageURL(null);
      }
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
    }
  };

  const handleFlowerClick = (flowerId) => {
    // Navigate to a detailed flower page
    // navigate(`/flower/${flowerId}`);
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload Image or Video for Recognition</h1>
      <div className="upload-box">
        {imageURL ? (
          <img src={imageURL} alt="Uploaded preview" className="uploaded-image" />
        ) : (
          <label className="upload-label" htmlFor="fileInput">
            <FaCloudUploadAlt className="upload-icon" />
            <p>Click or Drag to Upload</p>
          </label>
        )}
        <input id="fileInput" type="file" accept="image/*,video/*" onChange={handleFileChange} hidden />
      </div>
      <button className="upload-btn" onClick={handleUpload} disabled={!selectedFile || isUploading}>
        {isUploading ? "Uploading..." : "Upload & Detect"}
      </button>

      {processedImageURL && (
        <div className="processed-container">
          <h2>Processed Image</h2>
          <img src={processedImageURL} alt="Processed result" className="processed-image" />
          <a href={processedImageURL} download className="download-btn">Download Processed Image</a>
        </div>
      )}

      <div className="detections">
        <h2>Detected Flowers</h2>
        {detections.length > 0 ? (
          detections.map((detection, idx) => {
            const flowerName = detection.class;
            const flowerId = flowerIdMap[flowerName] || null;
            const flowerDetails = flowersData[flowerName] || {};

            return (
              <div
                key={idx}
                className="detection-card"
                onClick={() => flowerId && handleFlowerClick(flowerId)}
              >
                <div className="detection-info">
                  <p><strong>Name:</strong> {flowerName}</p>
                  <p><strong>Scientific Name:</strong> {flowerDetails?.scientific_name || "N/A"}</p>
                  <p><strong>Other Names:</strong> {flowerDetails?.other_names || "N/A"}</p>
                  <p><strong>Family:</strong> {flowerDetails?.family || "N/A"}</p>
                  <p><strong>Symbolism:</strong> {flowerDetails?.symbolism || "N/A"}</p>
                </div>
                {flowerDetails?.image_url && (
                  <div className="flower-image">
                    <img src={flowerDetails.image_url} alt={flowerName} />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>No flowers detected.</p>
        )}
      </div>
    </div>
  );
};

export default UploadRecognition;
