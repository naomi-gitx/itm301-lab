import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceCard from "./PlaceCard";
import axios from "axios";  // Assuming you're using axios for HTTP requests

const PlaceList = () => {
  const { id } = useParams(); 
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        // Replace with the actual backend URL
        const response = await axios.get(`/api/places/${id}`);
        setPlaces(response.data); // Store places in state
      } catch (err) {
        setError('Error fetching places');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [id]); // This runs every time the `id` parameter changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Хэрэглэгчийн газрууд
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.length > 0 ? (
          places.map((place) => (
            <PlaceCard key={place._id} place={place} />
          ))
        ) : (
          <div>No places found for this user.</div>
        )}
      </div>
    </div>
  );
};

export default PlaceList;
