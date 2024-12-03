const PlaceCard = ({ place }) => {
    return (
      <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white">
        <img
          src={place.image || "https://via.placeholder.com/300"}
          alt={place.name}
          className="w-full h-48 object-cover"
        />
        <div className="px-6 py-4">
          <h3 className="text-xl font-semibold text-gray-800">{place.name}</h3>
          <p className="text-gray-500 mt-2">{place.description}</p>
          <p className="text-gray-500 mt-2">Address: {place.address}</p>
          <p className="text-gray-500 mt-2">
            Location: {place.location.latitude}, {place.location.longitude}
          </p>
        </div>
      </div>
    );
  };
  
  export default PlaceCard;
  