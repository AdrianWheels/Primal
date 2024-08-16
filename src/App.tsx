import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CharacterSheet from "./character-sheet-component";
import MonsterLifeTracker from "./monster-life-tracker";
import CampaignTracker from "./CampaignTracker"; // Importa el nuevo componente
import "./style/tailwind.css";
import logo from "./iconos/logo blanco.png"; // Asegúrate de que la ruta sea correcta

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Logo visible arriba */}
        <div className="bg-black p-4 flex justify-center md:hidden">
          <img src={logo} alt="Logo" className="h-12" />
        </div>
        
        {/* Barra de navegación sticky */}
        <nav className="bg-black text-white p-4 shadow-md sticky top-0 z-40">
          <div className="relative flex items-center justify-between">
            <ul className="flex space-x-4 md:space-x-8">
              <li>
                <Link to="/" className="hover:text-yellow-500">Home</Link>
              </li>
              <li>
                <Link to="/campaign-tracker" className="hover:text-yellow-500">Campaign Tracker</Link>
              </li>
              <li>
                <Link to="/character-sheet" className="hover:text-yellow-500">Character Sheet</Link>
              </li>
              <li>
                <Link to="/monster-life-tracker" className="hover:text-yellow-500">Monster Life Tracker</Link>
              </li>
            </ul>
            <div className="hidden md:flex justify-center w-full absolute left-1/2 transform -translate-x-1/2">
              <img src={logo} alt="Logo" className="h-12" />
            </div>
          </div>
        </nav>

        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character-sheet" element={<CharacterSheet />} />
            <Route path="/monster-life-tracker" element={<MonsterLifeTracker />} />
            <Route path="/campaign-tracker" element={<CampaignTracker />} />
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
