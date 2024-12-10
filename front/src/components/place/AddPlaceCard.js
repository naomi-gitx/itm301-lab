import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/AppContext.js"; // Import the custom hook to access user context

const AddPlaceCard = () => {
  const { user } = useUser(); // Access the user from context
  const { userId } = useParams();
  const [placeData, setPlaceData] = useState({
    name: "",
    description: "",
    address: "",
    location: { latitude: "", longitude: "" },
    image: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user._id !== userId) {
      navigate("/login"); // Redirect to login if the user is not logged in or the userId doesn't match
    }
  }, [user, userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!placeData.name || !placeData.address || !placeData.description) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/places/${userId}`, {
        ...placeData,
        userId: user._id, // Use the user ID from context
      });

      console.log("Place added successfully:", response.data);

      // Navigate to the user's places list after adding the place
      navigate(`/${userId}/places`);
    } catch (error) {
      setError("Error adding place. Please try again.");
      console.error("Error:", error.message);
    }
  };

  if (!user) {
    return <p>Loading...</p>; // Show loading state while waiting for user context
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-semibold text-center text-primary mb-6">
        Add a New Place
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div>
          <label className="block text-lg font-medium">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={placeData.name}
            onChange={handleChange}
            placeholder="Enter place name"
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">
            Description:
          </label>
          <textarea
            name="description"
            value={placeData.description}
            onChange={handleChange}
            placeholder="Enter place description"
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">
            Address:
          </label>
          <input
            type="text"
            name="address"
            value={placeData.address}
            onChange={handleChange}
            placeholder="Enter place address"
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">
            Location (Latitude):
          </label>
          <input
            type="text"
            name="lat"
            value={placeData.location.latitude}
            onChange={(e) =>
              setPlaceData({
                ...placeData,
                location: { ...placeData.location, latitude: e.target.value },
              })
            }
            placeholder="Enter latitude"
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">
            Location (Longitude):
          </label>
          <input
            type="text"
            name="lng"
            value={placeData.location.longitude}
            onChange={(e) =>
              setPlaceData({
                ...placeData,
                location: { ...placeData.location, longitude: e.target.value },
              })
            }
            placeholder="Enter longitude"
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">
            Image URL:
          </label>
          <input
            type="text"
            name="image"
            value={placeData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-button text-white text-lg font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-button mt-4"
        >
          Add Place
        </button>
      </form>
    </div>
  );
};

export default AddPlaceCard;
