import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CharacterSheet from "./character-sheet-component";
import MonsterLifeTracker from "./monster-life-tracker"; // Importa el nuevo componente
import "./style/tailwind.css";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-black text-white p-4 shadow-md">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-yellow-500">Home</Link>
            </li>
            <li>
              <Link to="/character-sheet" className="hover:text-yellow-500">Character Sheet</Link>
            </li>
            <li>
              <Link to="/monster-life-tracker" className="hover:text-yellow-500">Monster Life Tracker</Link>
            </li>
          </ul>
        </nav>

        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character-sheet" element={<CharacterSheet />} />
            <Route path="/monster-life-tracker" element={<MonsterLifeTracker />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const Home = () => (
  <div>
    <h2 className="text-2xl font-bold">Home</h2>
  </div>
);

export default App;
