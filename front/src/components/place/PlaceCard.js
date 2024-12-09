import { Link } from "react-router-dom";

const PlaceCard = ({ place }) => {
  return (
    <div className="max-w-xs h-[400px] flex flex-col rounded-lg overflow-hidden shadow-lg bg-white">
      <img
        src={place.image || "https://via.placeholder.com/300"}
        alt={place.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="px-6 py-4 flex-grow">
        <h3 className="text-2xl font-semibold text-gray-800">{place.name}</h3>
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <Link to={`/places/${place._id}`}>
          <button className="w-full py-2 bg-button text-white rounded-lg text-lg font-semibold hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PlaceCard;
