import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import axios from "axios";
import "./activity.css";

const Activity = () => {
  const [history, setHistory]       = useState([]);
  const [flowersData, setFlowersData] = useState({});
  const [error, setError]           = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");

  const normalizeName = (name) => name.trim().toLowerCase();

  const formatDate = (ts) => {
    const d = new Date(ts);
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const confidenceColor = (c) => {
    if (c >= 0.95) return "conf-high";
    if (c >= 0.85) return "conf-mid";
    return "conf-low";
  };

  useEffect(() => {
    if (!userId) {
      setError("Please log in to view activity.");
      return;
    }

    axios.get(`/history/${userId}`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setHistory(res.data.slice(0, 8));
        } else {
          setError("No recent activity found.");
        }
      })
      .catch(() => setError("Failed to retrieve history."));

    axios.get("/flowers")
      .then((res) => {
        const map = res.data.reduce((acc, f) => {
          acc[normalizeName(f.flower_name)] = f.image_url || "/images/default.jpg";
          return acc;
        }, {});
        setFlowersData(map);
      })
      .catch(() => {});
  }, [userId]);

  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>Recent Activity</h1>
        <button className="btn flex" onClick={() => navigate("/dashboard/history")}>
          See All <BsArrowRightShort className="icon" />
        </button>
      </div>

      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="secContainer">
          {history.map((item, index) => {
            const image = flowersData[normalizeName(item.flower_name)] || "/images/default.jpg";
            const { date, time } = formatDate(item.detected_at);
            const pct = Math.round((item.confidence ?? 0) * 100);

            return (
              <div key={index} className="activityItem">
                <div className="activityThumb">
                  <img src={image} alt={item.flower_name} />
                </div>

                <div className="activityInfo">
                  <span className="activityFlower">{item.flower_name}</span>
                  <small className="activitySub">Detected by you</small>
                </div>

                <div className="activityMeta">
                  <span className={`confBadge ${confidenceColor(item.confidence ?? 0)}`}>
                    {pct}%
                  </span>
                  <span className="activityDate">{date}</span>
                  <span className="activityTime">{time}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Activity;
