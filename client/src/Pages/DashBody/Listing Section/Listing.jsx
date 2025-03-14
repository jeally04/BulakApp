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

    axios.get(`http://localhost:3002/favorites/${userId}`)
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
      const isFavorited = favorites.some(fav => fav.id === flowerId);

      if (isFavorited) {
        await axios.delete(`http://localhost:3002/favorites/${userId}/${flowerId}`);
        setFavorites(favorites.filter(fav => fav.id !== flowerId)); // Remove from UI
      } else {
        await axios.post(`http://localhost:3002/favorites`, { user_id: userId, flower_id: flowerId });
        axios.get(`http://localhost:3002/favorites/${userId}`).then((response) => {
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
            <div key={flower.id} className="singleItem">
              {favorites.some(fav => fav.id === flower.id) ? (
                <AiFillHeart className="icon heart-filled" onClick={() => toggleFavorite(flower.id)} />
              ) : (
                <AiOutlineHeart className="icon heart-outline" onClick={() => toggleFavorite(flower.id)} />
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
