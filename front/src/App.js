import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Top from "./components/Top.js";
import Signin from "./components/auth/Signin.js";
import Signup from "./components/auth/Signup.js";
import MyPlaceList from "./components/place/MyPlaceList.js";
import UsersList from "./components/user/UserList.js";
import AddPlaceCard from "./components/place/AddPlaceCard.js";
import PlaceDetails from "./components/place/PlaceDetails.js";
import UsersPlaceList from "./components/place/UsersPlaceList.js";
import UpdatePlace from "./components/place/UpdatePlace.js";
import { useUser } from "./context/AppContext.js"; // Import the useUser hook

function App() {
  const { user } = useUser(); // Get the user context

  return (
    <Router>
      <div>
        <Top />
        <Routes>
          <Route path="*" element={<div>404: Page not found</div>} />
          <Route path="/" element={<UsersList />} />
          <Route path="/authenticate" element={user ? <Navigate to="/" /> : <Signin />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path="/places/:placeId" element={user ? <PlaceDetails /> : <Navigate to="/authenticate" />} />
          <Route path="/places/:placeId/update" element={user ? <UpdatePlace /> : <Navigate to="/authenticate" />} />
          <Route path="/:userId/places" element={user ? <UsersPlaceList /> : <Navigate to="/authenticate" />} />
          <Route path="/:userId/myplaces" element={user ? <MyPlaceList /> : <Navigate to="/authenticate" />} />
          <Route path="/:userId/places/add" element={user ? <AddPlaceCard /> : <Navigate to="/authenticate" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
