import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaceCard from "./PlaceCard.js";

const UsersPlaceList = () => {
  const { userId } = useParams(); // Get userId from the URL
  const [places, setPlaces] = useState([]);
  const [userName, setUserName] = useState(""); // To store the user's name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlacesAndUser = async () => {
      try {
        setLoading(true);

        // Fetch user details
        const userResponse = await fetch(
          `http://localhost:5000/api/users/${userId}`
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user details");
        }
        const userData = await userResponse.json();
        setUserName(userData.name); // Assume the user object has a 'name' field

        // Fetch places
        const placesResponse = await fetch(
          `http://localhost:5000/api/places/${userId}`
        );
        if (!placesResponse.ok) {
          throw new Error("Failed to fetch places");
        }
        const placesData = await placesResponse.json();
        setPlaces(placesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacesAndUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">{userName}-ийн газрууд</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8 mx-auto max-w-7xl">
        {places.length === 0 ? (
          <div>No places found for {userName}</div>
        ) : (
          places.map((place) => <PlaceCard key={place._id} place={place} />)
        )}
      </div>
    </div>
  );
};

export default UsersPlaceList;
