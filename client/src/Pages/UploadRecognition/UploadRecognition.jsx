import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaRegTimesCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./UploadRecognition.css";

const UploadRecognition = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [detections, setDetections] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [flowersData, setFlowersData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");

  const normalizeName = (name) => name.trim().toLowerCase();

  const flowerIdMap = {
    "red rose": 1,
    "pink rose": 12,
    "white rose": 13,
    "desert rose": 14,
    "sunflower": 5,
    "gumamela": 15,
    "yellow rose": 2,
    "anthurium": 16,
    "yellow alder": 22,
    "chrysanthemum": 18,
    "yellow chrysanthemum": 19,
    "magenta chrysanthemum": 20,
    "white anthurium": 21,
  };

  const fetchFlowersData = async () => {
    try {
      const response = await axios.get("/flowers");
      const flowers = response.data.reduce((acc, flower) => {
        acc[normalizeName(flower.flower_name)] = flower;
        return acc;
      }, {});
      setFlowersData(flowers);
    } catch (error) {
      console.error("Error fetching flower data:", error);
    }
  };

  const processFile = async (file) => {
    if (!file) return;

    if (!userId) {
      setErrorMessage("User ID not found! Please log in.");
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const newPreview = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl(newPreview);
    setErrorMessage("");
    setDetections([]);
    setIsDetecting(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId);

    try {
      const response = await axios.post(
        `https://aaec-122-54-115-96.ngrok-free.app/detect/?live=false`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const detectionResults = response.data.detections || [];
      const normalizedDetections = detectionResults.map((d) => ({
        ...d,
        flower_name: normalizeName(d.flower_name),
      }));

      setDetections(normalizedDetections);
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Error detecting flowers. Please try again.");
    } finally {
      setIsDetecting(false);
    }
  };

  const handleUpload = (event) => {
    processFile(event.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  };

  const handleClear = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setDetections([]);
    setErrorMessage("");
  };

  const handleFlowerClick = (flowerId) => {
    navigate(`/dashboard/flower/${flowerId}`);
  };

  useEffect(() => {
    fetchFlowersData();
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, []);

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h1 className="upload-title">Flower Recognition</h1>
        <p className="upload-subtitle">Upload an image to identify flowers instantly</p>
      </div>

      <div
        className={`upload-zone ${isDragActive ? "drag-active" : ""} ${selectedFile ? "has-file" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label className="upload-label" htmlFor="file-input">
          {selectedFile && previewUrl ? (
            <div className="preview-content">
              <img src={previewUrl} alt="Selected flower" className="preview-img" />
              <div className="preview-overlay">
                <FaCloudUploadAlt size={28} />
                <span className="change-hint">Click or drop to change</span>
              </div>
            </div>
          ) : (
            <div className="upload-prompt">
              <FaCloudUploadAlt size={52} className="upload-icon" />
              <p className="upload-main-text">
                {isDragActive ? "Drop it here!" : "Drop your image here"}
              </p>
              <p className="upload-sub-text">or click to browse files</p>
              <span className="file-types">JPG · PNG · WEBP supported</span>
            </div>
          )}
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="file-input"
        />
      </div>

      {selectedFile && (
        <div className="file-info-bar">
          <span className="file-name-text">{selectedFile.name}</span>
          <button className="clear-btn" onClick={handleClear}>
            <FaRegTimesCircle size={14} />
            Clear
          </button>
        </div>
      )}

      {isDetecting && (
        <div className="loading-state">
          <AiOutlineLoading3Quarters size={22} className="spin" />
          <span>Analyzing image...</span>
        </div>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="detections-section">
        <div className="detections-header">
          <h2>Detected Flowers</h2>
          {detections.length > 0 && (
            <span className="detection-badge">{detections.length} found</span>
          )}
        </div>

        {detections.length > 0 ? (
          <div className="detection-list">
            {detections.map((detection, idx) => {
              const flowerName = detection.flower_name;
              const flowerId = flowerIdMap[flowerName] || "Unknown";
              const flowerDetails = flowersData[flowerName] || {};
              const confidence = (detection.confidence * 100).toFixed(0);
              const confLevel = parseInt(confidence) >= 80 ? "high" : parseInt(confidence) >= 60 ? "medium" : "low";

              return (
                <div
                  key={idx}
                  className="detection-card"
                  onClick={() => handleFlowerClick(flowerId)}
                >
                  <div className="card-img-wrap">
                    <img src={flowerDetails.image_url || "default_image.jpg"} alt={flowerName} />
                  </div>
                  <div className="card-details">
                    <h3 className="flower-name">{flowerName}</h3>
                    <p>
                      <span className="detail-tag">Scientific</span>
                      {flowerDetails.scientific_name || "N/A"}
                    </p>
                    <p>
                      <span className="detail-tag">Family</span>
                      {flowerDetails.family || "N/A"}
                    </p>
                    <p>
                      <span className="detail-tag">Uses</span>
                      {flowerDetails.uses_on_events || "N/A"}
                    </p>
                    <p>
                      <span className="detail-tag">Symbolism</span>
                      {flowerDetails.symbolism || "N/A"}
                    </p>
                  </div>
                  <div className={`confidence-badge ${confLevel}`}>
                    <span className="conf-value">{confidence}%</span>
                    <span className="conf-label">Match</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : !isDetecting && (
          <div className="empty-detect">
            {selectedFile ? (
              <>
                <div className="empty-icon">🔍</div>
                <p>No flowers detected in this image</p>
                <p className="empty-hint">Try uploading a clearer flower photo</p>
              </>
            ) : (
              <>
                <div className="empty-icon">🌸</div>
                <p>Upload an image to get started</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadRecognition;
