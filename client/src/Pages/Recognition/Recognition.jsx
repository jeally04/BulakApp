import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Recognition.css";

const Recognition = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [detections, setDetections] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [flowersData, setFlowersData] = useState({});
  const [useFrontCam, setUseFrontCam] = useState(false);
  const navigate = useNavigate();

  const videoConstraints = {
    facingMode: useFrontCam ? "user" : "environment",
  };

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

  useEffect(() => {
    axios
      .get("/flowers")
      .then((response) => {
        const flowers = response.data.reduce((acc, flower) => {
          acc[normalizeName(flower.flower_name)] = flower;
          return acc;
        }, {});
        setFlowersData(flowers);
      })
      .catch((err) => console.error("Error fetching flowers", err));
  }, []);

  const captureImage = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return null;

      const byteString = atob(imageSrc.split(",")[1]);
      const arrayBuffer = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        arrayBuffer[i] = byteString.charCodeAt(i);
      }
      return new Blob([arrayBuffer], { type: "image/jpeg" });
    }
    return null;
  };

  const detectFlowers = useCallback(async (imageBlob) => {
    if (isDetecting) return;
    setIsDetecting(true);

    const formData = new FormData();
    formData.append("file", imageBlob, "image.jpg");

    try {
      const response = await axios.post("https://aaec-122-54-115-96.ngrok-free.app/detect/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const detectionResults = response.data.detections || [];
      const normalizedDetections = detectionResults.map((d) => ({
        ...d,
        flower_name: normalizeName(d.flower_name),
      }));

      setDetections(normalizedDetections);
      drawAnnotations(normalizedDetections);
    } catch (error) {
      console.error("Error detecting flowers:", error);
    } finally {
      setIsDetecting(false);
    }
  }, [isDetecting]);

  const drawAnnotations = (detections) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!canvas || !context || detections.length === 0) return;

    const video = webcamRef.current.video;
    if (!video) return;

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach((detection) => {
      const [x1, y1, x2, y2] = detection.bbox;
      const boxWidth = x2 - x1;
      const boxHeight = y2 - y1;

      context.beginPath();
      context.strokeStyle = "#e91e8c";
      context.lineWidth = 2.5;
      context.rect(x1, y1, boxWidth, boxHeight);
      context.stroke();

      const flowerName = detection.flower_name || "Unknown";
      const confidence = (detection.confidence * 100).toFixed(1);

      const label = `${flowerName} (${confidence}%)`;
      const labelY = y1 > 24 ? y1 - 8 : y1 + 18;

      context.fillStyle = "rgba(233, 30, 140, 0.85)";
      const textWidth = context.measureText(label).width;
      context.fillRect(x1 - 1, labelY - 14, textWidth + 8, 18);

      context.fillStyle = "#fff";
      context.font = "bold 13px Poppins, sans-serif";
      context.fillText(label, x1 + 3, labelY);
    });
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      await detectFlowers(file);
    }
  };

  const handleFlowerClick = (flowerId) => {
    if (!flowerId) {
      console.error("Invalid flower ID");
      return;
    }
    navigate(`/dashboard/flower/${flowerId}`);
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (selectedFile) return;
      const imageBlob = await captureImage();
      if (imageBlob) await detectFlowers(imageBlob);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [selectedFile, detectFlowers]);

  return (
    <div className="recognition-container">
      <div className="recognition-header">
        <h1 className="rec-title">Live Flower Recognition</h1>
        <p className="rec-subtitle">Real-time AI-powered flower identification</p>
      </div>

      <div className="camera-controls">
        <div className="camera-toggle">
          <span className="toggle-label">{useFrontCam ? "Front Camera" : "Back Camera"}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={useFrontCam}
              onChange={() => setUseFrontCam((prev) => !prev)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className={`scan-status ${isDetecting ? "scanning" : "ready"}`}>
          <span className="status-dot"></span>
          <span className="status-text">{isDetecting ? "Scanning..." : "Live"}</span>
        </div>
      </div>

      <div className="webcam-wrapper">
        <div className="webcam-square">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="webcam"
          />
          <canvas
            ref={canvasRef}
            className="overlay"
            width={640}
            height={640}
          />
          <div className="scan-corners">
            <span className="corner tl"></span>
            <span className="corner tr"></span>
            <span className="corner bl"></span>
            <span className="corner br"></span>
          </div>
        </div>
      </div>

      <div className="detections-section">
        <div className="detections-header">
          <h2>Detected Flowers</h2>
          {detections.length > 0 && (
            <span className="detection-badge">{detections.length} found</span>
          )}
        </div>

        {detections.length > 0 ? (
          <div className="detection-grid">
            {detections.map((detection, idx) => {
              const flowerName = detection.flower_name;
              const flowerId = flowerIdMap[flowerName] || null;
              const flowerDetails = flowersData[flowerName] || {};
              const confidence = (detection.confidence * 100).toFixed(0);
              const confLevel = parseInt(confidence) >= 80 ? "high" : parseInt(confidence) >= 60 ? "medium" : "low";

              return (
                <div
                  key={idx}
                  className="detection-card"
                  onClick={() => handleFlowerClick(flowerId)}
                >
                  <div className="card-image">
                    <img src={flowerDetails.image_url || "default_image.jpg"} alt={flowerName} />
                  </div>
                  <div className="card-info">
                    <h3 className="flower-name">{flowerName}</h3>
                    <p>
                      <span className="info-label">Scientific</span>
                      {flowerDetails.scientific_name || "N/A"}
                    </p>
                    <p>
                      <span className="info-label">Family</span>
                      {flowerDetails.family || "N/A"}
                    </p>
                    <p>
                      <span className="info-label">Symbolism</span>
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
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🌸</div>
            <p className="empty-text">No flowers detected yet</p>
            <p className="empty-hint">Point your camera at a flower</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recognition;
