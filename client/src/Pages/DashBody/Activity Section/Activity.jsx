import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import axios from "axios";
import "./activity.css";

const Activity = () => {
  const [history, setHistory] = useState([]);
  const [flowersData, setFlowersData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Retrieve logged-in user ID
  const userId = localStorage.getItem("user_id");

  // Normalize flower names for mapping
  const normalizeName = (name) => name.trim().toLowerCase();

  useEffect(() => {
    if (!userId) {
      setError("User ID not found! Please log in.");
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await axios.get(`https://aaec-122-54-115-96.ngrok-free.app/history/${userId}`);

        if (response.data && Array.isArray(response.data.history) && response.data.history.length > 0) {
          setHistory(response.data.history.slice(0, 8)); // Show latest 8 entries
        } else {
          setError("No recent activity found.");
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        setError("Failed to retrieve history.");
      }
    };

    const fetchFlowersData = async () => {
      try {
        const response = await axios.get("https://problema-qjrc.onrender.com/flowers");
        const flowers = response.data.reduce((acc, flower) => {
          acc[normalizeName(flower.flower_name)] = {
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

  // Navigate to full history page
  const handleSeeAll = () => {
    navigate("/dashboard/history");
  };

  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>Recent Activity</h1>
        <button className="btn flex" onClick={handleSeeAll}>
          See All <BsArrowRightShort className="icon" />
        </button>
      </div>

      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="secContainer grid">
          {history.map((item, index) => {
            const flowerImage = flowersData[normalizeName(item.flower_name)]?.image_url || "/images/default.jpg";

            return (
              <div key={index} className="singleCustomer flex">
                <div className="activity-image-container">
                  <img src={flowerImage} alt={item.flower_name} className="activity-image" />
                </div>

                <div className="customerDetails">
                  <span className="name">You</span>
                  <small>Searched for {item.flower_name}</small>
                </div>

                <div className="duration">{new Date(item.detected_at).toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Activity;
