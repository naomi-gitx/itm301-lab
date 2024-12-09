import UserCard from "./UserCard.js";
import { useState, useEffect } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loggedInUserId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/users");
        const data = response.data;
        if (data) {
          // Filter out the logged-in user if there is one
          const filteredUsers = loggedInUserId
            ? data.filter((user) => user._id !== loggedInUserId)
            : data;
          setUsers(filteredUsers);
        } else {
          throw new Error(data.message || "Failed to fetch users");
        }
      } catch (err) {
        setError("Error fetching users: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [loggedInUserId]); // Dependency on loggedInUserId to trigger when it changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8 mx-auto max-w-7xl">
      {users.length === 0 ? (
        <div>No users found</div>
      ) : (
        users.map((user) => <UserCard key={user._id} user={user} />)
      )}
    </div>
  );
};

export default UsersList;
