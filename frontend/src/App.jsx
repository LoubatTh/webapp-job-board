import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

function App() {
  // TODO: Add state to track if user is logged in and if user is admin
  const { isLoggedIn, setIsLoggedIn } = useState(false);
  const { isAdmin, setIsAdmin } = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isAdmin ? <Route path="/dashboard" element={<Dashboard />} /> : null}
        {isLoggedIn ? <Route path="/settings" element={<Settings />} /> : null}
      </Routes>
    </>
  );
}

export default App;
