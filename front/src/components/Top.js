import { Link } from "react-router-dom";
import { useUser } from "../context/AppContext.js"; // Import the context

const Top = () => {
  const { user, logout } = useUser(); // Access user and logout from context

  return (
    <div className="bg-primary h-[100px] flex justify-between items-center px-6 shadow-md">
      <Link
        to="/"
        className="text-white font-semibold text-lg hover:text-gray-300 transition-all"
      >
        Нүүр хуудас
      </Link>
      <div className="flex items-center space-x-4">
        {user ? (
          // User logged in: Show avatar, name, and logout button
          <div className="flex items-center space-x-3">
            <img
              src={user.image || "/default-avatar.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <Link
              to={`/${user._id}/myplaces`}
              className="text-white font-medium hover:text-gray-300 transition-all"
            >
              {user.name}
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700 focus:outline-none transition-all"
            >
              Гарах
            </button>
          </div>
        ) : (
          // User not logged in: Show "Нэвтрэх" button
          <Link
            to="/authenticate"
            className="bg-accent-light text-black px-4 py-2 rounded-full text-sm hover:bg-accent-dark hover:text-white transition-all"
          >
            Нэвтрэх
          </Link>
        )}
      </div>
    </div>
  );
};

export default Top;
