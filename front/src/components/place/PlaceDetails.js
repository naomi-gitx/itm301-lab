import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PlaceDetails = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/placeDetail/${placeId}`
        );

        setPlace(response.data);
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    };

    fetchPlaceDetails();
  }, [placeId]);


  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this place?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/places/${placeId}`);
      alert("Place deleted successfully");
      navigate("/"); 
    } catch (error) {
      console.error("Error deleting place:", error);
      alert("Failed to delete place. Please try again.");
    }
  };

  if (!place) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-lg rounded-lg overflow-hidden shadow-md bg-white">
        <img
          src={place.image || "https://via.placeholder.com/300"}
          alt={place.name}
          className="w-full h-56 object-cover"
        />
        <div className="px-6 py-4">
          <h3 className="text-xl font-bold text-gray-800">{place.name}</h3>
          <p className="text-gray-600 mt-2 text-m border-b pb-2">
            {place.description}
          </p>
          <p className="text-gray-600 mt-2 text-m pt-3">
            <span className="font-bold text-black">Address:</span>{" "}
            {place.address}
          </p>
          <p className="text-gray-600 mt-2 text-m pb-3">
            <span className="font-bold text-black">Location:</span>{" "}
            {place.location
              ? `${place.location.latitude}, ${place.location.longitude}`
              : "Not available"}
          </p>
        </div>
        <div className="px-6 py-4 border-t border-gray-300 flex space-x-4">
          <button onClick={handleDelete} className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-300">
            Delete
          </button>

          <Link to={`/places/${place._id}/update`} className="flex-1 py-2 bg-button text-white rounded-lg font-medium hover:bg-accent-dark transition focus:outline-none focus:ring-2 focus:ring-blue-300 text-center" >
            <button >
              Update
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
