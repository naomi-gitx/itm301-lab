import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePlace = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState({
    name: "",
    description: "",
    address: "",
    location: { latitude: "", longitude: "" },
    image: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/places/${placeId}`
        );
        setPlace(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    };

    fetchPlaceDetails();
  }, [placeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlace({
      ...place,
      [name]: value,
    });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setPlace({
      ...place,
      location: {
        ...place.location,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/places/${placeId}`,
        place
      );
      console.log("Updated place:", response.data);
      navigate(`/places/${placeId}`); // Redirect after successful update
    } catch (error) {
      console.error("Error updating place:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Update Place
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={place.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={place.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-medium">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={place.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="latitude"
              className="block text-gray-700 font-medium"
            >
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={place.location.latitude}
              onChange={handleLocationChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="longitude"
              className="block text-gray-700 font-medium"
            >
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={place.location.longitude}
              onChange={handleLocationChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={place.image}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className="w-full py-2 bg-button text-white rounded-lg text-lg font-semibold hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Update Place
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePlace;
