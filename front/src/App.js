import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Top from "./components/Top.js";
import UserCard from "./components/user/UserCard.js";
import Signin from "./components/auth/Signin.js";
import Signup from "./components/auth/Signup.js";
import PlaceList from "./components/place/PlaceList.js";
import data from "./data/data.json";

function App() {
  return (
    <Router>
      <div>
        <Top />
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8 mx-auto max-w-7xl">
                {data.users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            }
          />
          <Route path="/authenticate" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:id/places" element={<PlaceList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
