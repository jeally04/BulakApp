import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete, MdDeleteSweep } from "react-icons/md";
import "./History.css";

const History = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [clearingAll, setClearingAll] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");

  const flowerIdMap = {
    "red rose": 1, "pink rose": 12, "white rose": 13, "desert rose": 14,
    "sunflower": 5, "gumamela": 15, "yellow rose": 2, "anthurium": 16,
    "yellow alder": 22, "chrysanthemum": 18, "yellow chrysanthemum": 19,
    "magenta chrysanthemum": 20, "white anthurium": 21,
  };

  const normalizeName = (name) => (name || "").trim().toLowerCase();

  const fetchHistory = useCallback(async () => {
    if (!userId) {
      setErrorMessage("Please log in to view your history.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`/history/${userId}`);
      setHistoryItems(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
      setErrorMessage("Failed to retrieve history.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleFlowerClick = (item) => {
    const id = item.flower_id || flowerIdMap[normalizeName(item.flower_name)];
    if (id) navigate(`/dashboard/flower/${id}`);
  };

  const handleDeleteItem = async (e, itemId) => {
    e.stopPropagation();
    try {
      await axios.delete(`/history/${itemId}`);
      setHistoryItems((prev) => prev.filter((h) => h.id !== itemId));
    } catch (error) {
      console.error("Error deleting history item:", error);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Clear all detection history? This cannot be undone.")) return;
    setClearingAll(true);
    try {
      await axios.delete(`/history/clear/${userId}`);
      setHistoryItems([]);
    } catch (error) {
      console.error("Error clearing history:", error);
    } finally {
      setClearingAll(false);
    }
  };

  const groupByDate = (items) => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 1);
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfToday.getDate() - 7);

    const groups = { Today: [], Yesterday: [], "This Week": [], Older: [] };
    items.forEach((item) => {
      const d = new Date(item.detected_at);
      if (d >= startOfToday) groups["Today"].push(item);
      else if (d >= startOfYesterday) groups["Yesterday"].push(item);
      else if (d >= startOfWeek) groups["This Week"].push(item);
      else groups["Older"].push(item);
    });
    return groups;
  };

  const getConfLevel = (conf) => {
    const pct = conf <= 1 ? conf * 100 : conf;
    if (pct >= 80) return "high";
    if (pct >= 60) return "medium";
    return "low";
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });

  const formatTime = (d) =>
    new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const renderContent = () => {
    if (loading) {
      return (
        <div className="hist-state">
          <AiOutlineLoading3Quarters size={28} className="hist-spin" />
          <p>Loading history…</p>
        </div>
      );
    }

    if (errorMessage && historyItems.length === 0) {
      return (
        <div className="hist-state">
          <p className="hist-error">{errorMessage}</p>
        </div>
      );
    }

    if (historyItems.length === 0) {
      return (
        <div className="hist-empty">
          <span className="hist-empty-icon">🔍</span>
          <p className="hist-empty-title">No detection history yet</p>
          <p className="hist-empty-sub">Use live detection or upload an image to start</p>
        </div>
      );
    }

    const groups = groupByDate(historyItems);
    return (
      <div className="hist-groups">
        {Object.entries(groups).map(([label, items]) => {
          if (items.length === 0) return null;
          return (
            <div key={label} className="hist-group">
              <p className="hist-group-label">{label}</p>
              <ul className="hist-list">
                {items.map((item) => {
                  const confidence = item.confidence <= 1 ? item.confidence * 100 : item.confidence;
                  const confLevel = getConfLevel(item.confidence);
                  return (
                    <li
                      key={item.id}
                      className="hist-row"
                      onClick={() => handleFlowerClick(item)}
                    >
                      <div className="hist-thumb">
                        <img src={item.image_url || "/images/default.jpg"} alt={item.flower_name} />
                      </div>
                      <div className="hist-info">
                        <span className="hist-name">{item.flower_name}</span>
                        {item.scientific_name && (
                          <span className="hist-sci">{item.scientific_name}</span>
                        )}
                        <span className="hist-time">
                          {formatDate(item.detected_at)} · {formatTime(item.detected_at)}
                        </span>
                      </div>
                      <div className="hist-meta">
                        <span className={`hist-conf-badge conf-${confLevel}`}>
                          {Math.round(confidence)}%
                        </span>
                        <button
                          className="hist-del-btn"
                          onClick={(e) => handleDeleteItem(e, item.id)}
                          title="Remove"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="history-page">
      <div className="history-section">
        <div className="hist-heading flex">
          <h1>
            Detection History
            {historyItems.length > 0 && (
              <span className="hist-count-badge">{historyItems.length}</span>
            )}
          </h1>
          {historyItems.length > 0 && (
            <button className="hist-clear-btn" onClick={handleClearAll} disabled={clearingAll}>
              {clearingAll
                ? <AiOutlineLoading3Quarters size={14} className="hist-spin" />
                : <MdDeleteSweep size={16} />}
              Clear All
            </button>
          )}
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default History;
