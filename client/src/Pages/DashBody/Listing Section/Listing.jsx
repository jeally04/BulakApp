import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import "./Listing.css";

const Listing = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id"); // Get logged-in user ID

  useEffect(() => {
    if (!userId) {
      setError("Please log in to view favorites.");
      return;
    }

    axios.get(`/favorites/${userId}`)
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((err) => {
        setError("Error fetching favorite flowers.");
        console.error(err);
      });
  }, [userId]);

  // Handle favorite toggle (add/remove)
  const toggleFavorite = async (flowerId) => {
    try {
      const isFavorited = favorites.some(fav => fav.flower_id === flowerId);

      if (isFavorited) {
        await axios.post(`/favorites/remove`, { user_id: userId, flower_id: flowerId });
        setFavorites(favorites.filter(fav => fav.flower_id !== flowerId)); // Remove from UI
      } else {
        await axios.post(`/favorites/add`, { user_id: userId, flower_id: flowerId });
        axios.get(`/favorites/${userId}`).then((response) => {
          setFavorites(response.data); // Refresh list
        });
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <div className="listingSection">
      <div className="heading flex">
        <h1>My Favorite Flowers</h1>
        <button className="btn flex" onClick={() => navigate("/dashboard/favorite")}>
          See all <BsArrowRightShort className="icon" />
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="secContainer flex">
        {favorites.length > 0 ? (
          favorites.slice(0, 4).map((flower) => (
            <div key={flower.flower_id} className="singleItem">
              {favorites.some(fav => fav.flower_id === flower.flower_id) ? (
                <AiFillHeart className="icon heart-filled" onClick={() => toggleFavorite(flower.flower_id)} />
              ) : (
                <AiOutlineHeart className="icon heart-outline" onClick={() => toggleFavorite(flower.flower_id)} />
              )}
              <img src={flower.image_url} alt={flower.flower_name} />
              <h3>{flower.flower_name}</h3>
            </div>
          ))
        ) : (
          <p>No favorite flowers yet.</p>
        )}
      </div>
    </div>
  );
};

export default Listing;
