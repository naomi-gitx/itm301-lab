import React from "react";
import App from "./App";
import "./index.css";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./context/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserProvider>
      <App />
    </UserProvider>
);
