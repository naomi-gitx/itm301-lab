import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PlaceDetails = () => {
  const { placeId } = useParams();
  
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/places/${placeId}`
        );
        
        setPlace(response.data); // Access the actual data here
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    };

    fetchPlaceDetails();
  }, [placeId]);

  if (!place) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white">
      <img
        src={place.image || "https://via.placeholder.com/300"}
        alt={place.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="px-6 py-4">
        <h3 className="text-2xl font-semibold text-gray-800">{place.name}</h3>
        <p className="text-gray-500 mt-2 text-sm">{place.description}</p>
        <p className="text-gray-600 mt-2 text-sm">Address: {place.address}</p>
        <p className="text-gray-600 mt-2 text-sm">
          Location:{" "}
          {place.location
            ? `${place.location.latitude}, ${place.location.longitude}`
            : "Not available"}
        </p>
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <button className="w-full py-2 bg-red-700 text-white rounded-lg text-lg font-semibold hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-300">
          Delete
        </button>
        <button className="w-full py-2 bg-button text-white rounded-lg text-lg font-semibold hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-300">
          Update
        </button>
      </div>
    </div>
  );
};

export default PlaceDetails;
