import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PlaceCard from "./PlaceCard.js";
import axios from "axios"; // Assuming you're using axios for HTTP requests
import { useUser } from "../../context/AppContext.js"; // Import the context to check if user is logged in

const MyPlaceList = () => {
  const { userId } = useParams();
  const { user } = useUser();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/places/${userId}`
        );
        setPlaces(response.data);
      } catch (err) {
        setError("Error fetching places");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      
      <h2 className="text-2xl font-semibold mb-4">Таны газрууд</h2>
      {user && (
        <div className="mb-4">
          <Link
            to={`/${user._id}/places/add`}
            className="bg-button text-white px-4 py-2 rounded hover:bg-accent-dark transition"
          >
            Add a New Place
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.length > 0 ? (
          places.map((place) => <PlaceCard key={place._id} place={place} />)
        ) : (
          <div>No places found for this user.</div>
        )}
      </div>
    </div>
  );
};

export default MyPlaceList;
