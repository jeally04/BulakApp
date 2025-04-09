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
  const navigate = useNavigate();

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
      .get("https://problema-qjrc.onrender.com/flowers")
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
      const response = await axios.post("https://yolo-2ovj.onrender.com/detect/", formData, {
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

    // Ensure video and canvas dimensions match
    const video = webcamRef.current.video;
    if (!video) return;

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const scaleX = canvasWidth / videoWidth;
    const scaleY = canvasHeight / videoHeight;

    // Clear previous drawings
    context.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach((detection) => {
      const [x1, y1, x2, y2] = detection.bbox;
      const flowerName = detection.flower_name || "Unknown";
      const confidence = (detection.confidence * 100).toFixed(1);

      // Scale coordinates
      const boxX = x1 * scaleX;
      const boxY = y1 * scaleY;
      const boxWidth = (x2 - x1) * scaleX;
      const boxHeight = (y2 - y1) * scaleY;

      // Adjust bounding box Y position slightly upwards
      const adjustedBoxY = boxY - boxHeight * 0.15;

      // Draw bounding box
      context.beginPath();
      context.strokeStyle = "#FF0000";
      context.lineWidth = 2;
      context.rect(boxX, adjustedBoxY, boxWidth, boxHeight);
      context.stroke();

      // Draw label
      context.fillStyle = "#FF0000";
      context.font = "16px Arial";
      context.fillText(`${flowerName} (${confidence}%)`, boxX, adjustedBoxY - 5);
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
      <h1 className="title">Flower Recognition</h1>

      <div className="webcam-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
        />
        <canvas
          ref={canvasRef}
          className="overlay"
          width={640}
          height={480}
        ></canvas>
      </div>

      <div className="detections">
        <h2>Detected Flowers</h2>
        {detections.length > 0 ? (
          detections.map((detection, idx) => {
            const flowerName = detection.flower_name;
            const flowerId = flowerIdMap[flowerName] || null;
            const flowerDetails = flowersData[flowerName] || {};

            return (
              <div
                key={idx}
                className="detection-card"
                onClick={() => handleFlowerClick(flowerId)}
              >
                <div className="detection-item">
                  <p><strong>Name:</strong> {flowerName}</p>
                  <p><strong>Scientific Name:</strong> {flowerDetails.scientific_name || "N/A"}</p>
                  <p><strong>Family:</strong> {flowerDetails.family || "N/A"}</p>
                  <p><strong>Uses on Events:</strong> {flowerDetails.uses_on_events || "N/A"}</p>
                  <p><strong>Symbolism:</strong> {flowerDetails.symbolism || "N/A"}</p>
                  <div className="flower-image">
                    <img src={flowerDetails.image_url || "default_image.jpg"} alt={flowerName} />
                  </div>
                </div>
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

export default Recognition;
