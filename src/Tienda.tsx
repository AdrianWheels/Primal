import React, { useState, useEffect } from "react";
import forgesData from './data/Forges.json';
import { elementIcons } from './constants';

interface ForgeData {
  [weaponName: string]: {
    [level: string]: string[];
  };
}

interface Forges {
  [forgeName: string]: ForgeData;
}

interface ShopProps {
  onPurchase: (materialsNeeded: { [key: string]: number }) => void;
  characterMaterials: { [key: string]: number };
}

const Shop: React.FC<ShopProps> = ({ onPurchase, characterMaterials }) => {
  const [selectedForge, setSelectedForge] = useState<string | null>(null);
  const [selectedWeapon, setSelectedWeapon] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const forges: Forges = forgesData;

  const handleForgeSelect = (forge: string) => {
    setSelectedForge(forge);

    // Mantener el nivel seleccionado si existe
    const availableWeapons = Object.keys(forges[forge]);
    if (!availableWeapons.includes(selectedWeapon || "")) {
      setSelectedWeapon(null); // Restablecer arma si no está disponible en la nueva forja
    }

    // Mantener el nivel seleccionado si es válido para la nueva selección
    if (selectedWeapon && selectedLevel) {
      const availableLevels = Object.keys(forges[forge][selectedWeapon] || {});
      if (!availableLevels.includes(selectedLevel)) {
        setSelectedLevel(null); // Restablecer el nivel si no es válido en la nueva selección
      }
    }
  };

  const handleWeaponSelect = (weapon: string) => {
    setSelectedWeapon(weapon);

    // Mantener el nivel seleccionado si es válido para el nuevo arma
    if (selectedLevel && !forges[selectedForge || ""]?.[weapon]?.[selectedLevel]) {
      setSelectedLevel(null);
    }
  };

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level === selectedLevel ? null : level);
  };

  const getFilteredWeapons = () => {
    if (selectedForge && selectedLevel) {
      return Object.keys(forges[selectedForge]).filter((weapon) =>
        Object.keys(forges[selectedForge][weapon]).includes(selectedLevel)
      );
    }
    return selectedForge ? Object.keys(forges[selectedForge]) : [];
  };

  const getMaterialsNeeded = (): { [key: string]: number } => {
    if (selectedForge && selectedWeapon && selectedLevel) {
      const materials = forges[selectedForge][selectedWeapon][selectedLevel];
      return materials.reduce((acc, material) => {
        acc[material] = (acc[material] || 0) - 1;
        return acc;
      }, {} as { [key: string]: number });
    }
    return {};
  };

  const hasSufficientMaterials = (): boolean => {
    const materialsNeeded = getMaterialsNeeded();
    return Object.entries(materialsNeeded).every(
      ([material, amount]) => (characterMaterials[material] || 0) + amount >= 0
    );
  };

  const handlePurchaseClick = () => {
    if (hasSufficientMaterials()) {
      const materialsNeeded = getMaterialsNeeded();
      onPurchase(materialsNeeded);
    }
  };

  const getForgeIcon = (forgeName: string) => {
    const elementName = forgeName.split(" ")[0];
    const capitalizedElementName = elementName.charAt(0).toUpperCase() + elementName.slice(1).toLowerCase();
    return elementIcons[capitalizedElementName] || "/path/to/default-icon.png";
  };

  const forgeButtonClass = hasSufficientMaterials() ? "bg-green-500" : "bg-red-500";

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Forge Shop</h2>
        <div className="flex space-x-2">
          {["1", "2", "3"].map((level) => (
            <button
              key={level}
              onClick={() => handleLevelSelect(level)}
              className={`p-2 rounded-full shadow-md text-white text-sm ${
                selectedLevel === level ? "bg-yellow-500" : "bg-gray-800"
              }`}
            >
              L{level}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Select Forge</h3>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(forges).map((forgeName) => (
            <button
              key={forgeName}
              onClick={() => handleForgeSelect(forgeName)}
              className={`p-2 rounded-lg shadow-md text-white flex flex-col items-center ${
                selectedForge === forgeName ? "bg-yellow-500" : "bg-gray-800"
              }`}
            >
              <img
                src={getForgeIcon(forgeName)}
                alt={forgeName}
                className="w-6 h-6 mb-1"
              />
            </button>
          ))}
        </div>
      </div>

      {selectedForge && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Select Weapon</h3>
          <div className="grid grid-cols-2 gap-2">
            {getFilteredWeapons().map((weaponName) => (
              <button
                key={weaponName}
                onClick={() => handleWeaponSelect(weaponName)}
                className={`p-2 rounded-lg shadow-md text-white ${
                  selectedWeapon === weaponName ? "bg-yellow-500" : "bg-gray-800"
                }`}
              >
                {weaponName}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedWeapon && selectedLevel && (
        <div className="flex justify-center">
          <button
            onClick={handlePurchaseClick}
            className={`mt-4 p-2 text-white rounded-lg ${forgeButtonClass}`}
          >
            Forge!
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
