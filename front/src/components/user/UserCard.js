import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white">
      <img
        src={user.image || "https://via.placeholder.com/150"}
        alt="User Image"
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-500 mt-2">{user.email}</p>
      </div>
      <div className="px-6 py-2 flex justify-center">
        <Link to={`/${user.id}/places`}>
          <button className="bg-button text-white py-2 px-4 rounded-lg hover:bg-accent-dark">
            Газруудыг харах
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
