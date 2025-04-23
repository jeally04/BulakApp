import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaRegTimesCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./UploadRecognition.css";

const UploadRecognition = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [detections, setDetections] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [flowersData, setFlowersData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");

  const normalizeName = (name) => name.trim().toLowerCase();

  const flowerIdMap = {
    "red rose": 1, "pink rose": 12, "white rose": 13,
    "desert rose": 14, "sunflower": 5, "gumamela": 15,
    "yellow rose": 2, "anthurium": 16, "yellow alder": 22,
    "chrysanthemum": 18, "yellow chrysanthemum": 19,
    "magenta chrysanthemum": 20, "white anthurium": 21,
  };

  const fetchFlowersData = async () => {
    try {
      const response = await axios.get("https://problema-qjrc.onrender.com/flowers");
      const flowers = response.data.reduce((acc, flower) => {
        acc[normalizeName(flower.flower_name)] = flower;
        return acc;
      }, {});
      setFlowersData(flowers);
    } catch (error) {
      console.error("Error fetching flower data:", error);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!userId) {
      setErrorMessage("User ID not found! Please log in.");
      return;
    }

    setSelectedFile(file);
    setErrorMessage("");
    setIsDetecting(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `https://844a-110-54-229-173.ngrok-free.app/detect?user_id=${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
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

  const drawBoundingBoxes = () => {
    const img = document.getElementById("uploaded-img");
    const canvas = document.getElementById("overlay-canvas");

    if (!img || !canvas || detections.length === 0) return;

    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach((det) => {
      if (!det.box || det.box.length !== 4) return;

      const { box, confidence, flower_name } = det;
      const [x, y, w, h] = box;

      const scaleX = canvas.width / img.naturalWidth;
      const scaleY = canvas.height / img.naturalHeight;

      const drawX = x * scaleX;
      const drawY = y * scaleY;
      const drawW = w * scaleX;
      const drawH = h * scaleY;

      ctx.strokeStyle = "#ff6b6b";
      ctx.lineWidth = 2;
      ctx.strokeRect(drawX, drawY, drawW, drawH);

      ctx.fillStyle = "rgba(255, 107, 107, 0.85)";
      ctx.font = "14px Arial";
      ctx.fillText(`${flower_name} (${(confidence * 100).toFixed(1)}%)`, drawX, drawY > 20 ? drawY - 5 : drawY + 15);
    });
  };

  useEffect(() => {
    fetchFlowersData();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      const img = document.getElementById("uploaded-img");
      if (img) {
        img.onload = () => drawBoundingBoxes();
      }
    }
  }, [detections, selectedFile]);

  return (
    <div className="upload-container">
      <h1 className="upload-title">Flower Recognition - Upload Image</h1>

      <div className="upload-box">
        <label className="upload-label">
          <input type="file" accept="image/*" onChange={handleUpload} className="file-input" />
          <div className="upload-text">
            <FaCloudUploadAlt size={40} />
            <span>{selectedFile ? `File selected: ${selectedFile.name}` : "Click to choose a file"}</span>
          </div>
        </label>

        {selectedFile && (
          <div className="image-preview-container">
            <img
              id="uploaded-img"
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
              className="preview-image"
            />
            <canvas id="overlay-canvas" className="overlay-canvas"></canvas>
          </div>
        )}
      </div>

      {isDetecting && (
        <div className="loading">
          <AiOutlineLoading3Quarters size={30} className="spin" /> Detecting flowers...
        </div>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="detections">
        <h2>Detected Flowers</h2>
        {detections.length > 0 ? (
          detections.map((detection, idx) => {
            const flowerName = detection.flower_name;
            const flowerId = flowerIdMap[flowerName] || "Unknown";
            const flowerDetails = flowersData[flowerName] || {};

            return (
              <div key={idx} className="detection-item" onClick={() => handleFlowerClick(flowerId)}>
                <p><strong>Name:</strong> {flowerName}</p>
                <p><strong>Scientific Name:</strong> {flowerDetails.scientific_name || "N/A"}</p>
                <p><strong>Family:</strong> {flowerDetails.family || "N/A"}</p>
                <p><strong>Uses on Events:</strong> {flowerDetails.uses_on_events || "N/A"}</p>
                <p><strong>Symbolism:</strong> {flowerDetails.symbolism || "N/A"}</p>
                <img src={flowerDetails.image_url || "default_image.jpg"} alt={flowerName} />
              </div>
            );
          })
        ) : (
          <p className="no-detection">No flowers detected. Please upload another image.</p>
        )}
      </div>

      <button className="upload-btn" onClick={() => {
        setSelectedFile(null);
        setDetections([]);
      }}>
        <FaRegTimesCircle size={20} /> Clear Upload
      </button>
    </div>
  );
};

export default UploadRecognition;
