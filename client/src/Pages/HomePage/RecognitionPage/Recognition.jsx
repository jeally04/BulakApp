import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Recognition.css";

const Recognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [detections, setDetections] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    startWebcam();
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setErrorMessage("Error accessing webcam. Please allow camera access.");
    }
  };

  const captureFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/detect/live/",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setDetections(response.data.detections || []);
        drawBoundingBoxes(response.data.detections);
      } catch (error) {
        console.error("Error detecting flowers:", error.response || error);
        setErrorMessage("Error detecting flowers. Please try again.");
      }
    }, "image/jpeg");
  };

  useEffect(() => {
    const interval = setInterval(captureFrame, 2000);
    return () => clearInterval(interval);
  }, []);

  const drawBoundingBoxes = (detections) => {
    if (!canvasRef.current || detections.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "green";
    ctx.font = "18px Arial";
    ctx.fillStyle = "green";

    detections.forEach(({ bbox, flower_name, confidence }) => {
      const [x1, y1, x2, y2] = bbox;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
      ctx.fillText(`${flower_name} (${(confidence * 100).toFixed(1)}%)`, x1, y1 - 5);
    });
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !userId) return;

    setSelectedFile(file);
    setErrorMessage("");
    setIsDetecting(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/detect?user_id=${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setDetections(response.data.detections || []);
    } catch (error) {
      console.error("Error detecting flowers:", error.response || error);
      setErrorMessage("Error detecting flowers. Please try again.");
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="recognition-container">
      <h1 className="title">Live & Upload Flower Recognition</h1>

      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline muted className="webcam-feed"></video>
        <canvas ref={canvasRef} className="detection-overlay"></canvas>
      </div>

      <div className="upload-box">
        <label className="upload-label">
          <input type="file" accept="image/*" onChange={handleUpload} className="file-input" />
          <div className="upload-text">
            {selectedFile ? `File selected: ${selectedFile.name}` : "Click to choose a file"}
          </div>
        </label>
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
          detections.map((detection, idx) => (
            <div key={idx} className="detection-item">
              <p><strong>Name:</strong> {detection.flower_name}</p>
              <p><strong>Confidence:</strong> {(detection.confidence * 100).toFixed(2)}%</p>
            </div>
          ))
        ) : (
          <p className="no-detection">No flowers detected yet...</p>
        )}
      </div>
    </div>
  );
};

export default Recognition;
