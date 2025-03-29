import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";

import Sidebar from "./Sidebar";
import HomePage from "./components/HomePage/HomePage";
import PlayerPage from "./components/PlayerPage/PlayerPage";
import OwnerPage from "./components/OwnerPage/OwnerPage";
import CountryPage from "./components/CountryPage/CountryPage";
import CVCPage from "./components/CVCPage/CVCPage";
import PastResults from "./components/PastResults/PastResults";
import Predictions from "./components/PredictionPage/Predictions";

// export const URL = import.meta.env.VITE_APP_SERVER_URL;
export const URL = "http://localhost:5000";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [players, setPlayers] = useState([]);
  const [ownerPoints, setOwnerPoints] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const bodyToggleSidebar = () => {
    if (sidebarOpen === true) {
      setSidebarOpen(false);
      return;
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`${URL}/items`);
        const data = await response.json();
        setPlayers(data);
      } catch (err) {
        console.error("Error fetching player data:", err);
      }
    };

    const fetchOwnerPoints = async () => {
      try {
        const response = await fetch(`${URL}/owners/points`);
        const data = await response.json();
        setOwnerPoints(data);
      } catch (err) {
        console.error("Error fetching owner points:", err);
      }
    };

    fetchPlayers();
    fetchOwnerPoints();
  }, []);
  return (
    <Router>
      <div className="App">
       <button className="menu-button" onClick={toggleSidebar}>
          <span class="material-symbols-outlined" style={{fontSize:39,color: '#10044a'}}>menu</span>
        </button>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          onClick={bodyToggleSidebar}
          className={`content ${sidebarOpen ? "sidebar-open" : ""}`}
        >
          <Routes>
            <Route
              path="/"
              element={<HomePage players={players} ownerPoints={ownerPoints} />}
            />
            <Route
              path="/players"
              element={
                <PlayerPage players={players} ownerPoints={ownerPoints} />
              }
            />
            <Route
              path="/owners"
              element={
                <OwnerPage players={players} ownerPoints={ownerPoints} />
              }
            />
            <Route
              path="/country"
              element={
                <CountryPage players={players} ownerPoints={ownerPoints} />
              }
            />
            <Route
              path="/cvc"
              element={<CVCPage players={players} ownerPoints={ownerPoints} />}
            />
            <Route path="/past-results" element={<PastResults />} />
            <Route path="/predictions" element={<Predictions />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
