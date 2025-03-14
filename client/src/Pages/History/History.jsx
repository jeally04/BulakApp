import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./History.css";

const History = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [flowersData, setFlowersData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Retrieve logged-in user ID
  const userId = localStorage.getItem("user_id");

  // Normalize flower names for mapping
  const normalizeName = (name) => name.trim().toLowerCase();

  // Flower name to ID mapping
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
    if (!userId) {
      setErrorMessage("User ID not found! Please log in.");
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/history/${userId}`);
        if (response.data.history.length > 0) {
          setHistoryItems(response.data.history);
        } else {
          setErrorMessage("No detection history found.");
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        setErrorMessage("Failed to retrieve history.");
      } finally {
        setLoading(false);
      }
    };

    const fetchFlowersData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/flowers");
        const flowers = response.data.reduce((acc, flower) => {
          acc[normalizeName(flower.flower_name)] = {
            id: flowerIdMap[normalizeName(flower.flower_name)] || null,
            image_url: flower.image_url || "/images/default.jpg",
          };
          return acc;
        }, {});
        setFlowersData(flowers);
      } catch (error) {
        console.error("Error fetching flower data:", error);
      }
    };

    fetchHistory();
    fetchFlowersData();
  }, [userId]);

  // Navigate to flower details page
  const handleFlowerClick = (flowerName) => {
    const flower = flowersData[normalizeName(flowerName)];
    if (flower?.id) {
      navigate(`/dashboard/flower/${flower.id}`);
    } else {
      alert("Flower details not available.");
    }
  };

  return (
    <div className="history-page">
      <h2>HISTORY</h2>

      {loading ? (
        <p>Loading history...</p>
      ) : errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        <ul className="history-list">
          {historyItems.map((item) => {
            const flower = flowersData[normalizeName(item.flower_name)] || {};
            return (
              <li
                key={item.id}
                className="history-item"
                onClick={() => handleFlowerClick(item.flower_name)}
              >
                {/* Flower Image */}
                <div className="history-image-container">
                  <img
                    src={flower.image_url || "/images/default.jpg"}
                    alt={item.flower_name}
                    className="history-image"
                  />
                </div>

                {/* Flower Name & Date */}
                <div className="history-info">
                  <span className="history-name">{item.flower_name}</span>
                  <span className="history-date">{new Date(item.detected_at).toLocaleString()}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default History;
