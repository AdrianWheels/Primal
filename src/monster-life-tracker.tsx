import React, { useState } from "react";

const MonsterLifeTracker = () => {
  const [players, setPlayers] = useState(2); // Número de jugadores
  const [sections, setSections] = useState(
    Array(10)
      .fill(0)
      .map(() => ({ life: 0, multiplier: 1 }))
  );
  const [activeSection, setActiveSection] = useState(9); // Empezar desde la derecha
  const [damage, setDamage] = useState(0); // Daño a aplicar

  const handleMultiplierChange = (index: number, value: number) => {
    const newSections = [...sections];
    newSections[index].multiplier = value;
    newSections[index].life = players * value; // Recalcular la vida inicial
    setSections(newSections);
  };

  const decreaseLife = (amount = 1) => {
    const newSections = [...sections];
    let remainingAmount = amount;

    for (let i = activeSection; i >= 0; i--) {
      if (newSections[i].life > 0) {
        if (newSections[i].life >= remainingAmount) {
          newSections[i].life -= remainingAmount;
          remainingAmount = 0;
          setActiveSection(i);
          break;
        } else {
          remainingAmount -= newSections[i].life;
          newSections[i].life = 0;
        }
      }
    }
    setSections(newSections);
  };

  const increaseLife = (amount = 1) => {
    const newSections = [...sections];
    let remainingAmount = amount;

    for (let i = activeSection; i < sections.length; i++) {
      const maxLife = players * newSections[i].multiplier;
      if (newSections[i].life < maxLife) {
        const availableSpace = maxLife - newSections[i].life;
        if (availableSpace >= remainingAmount) {
          newSections[i].life += remainingAmount;
          remainingAmount = 0;
          setActiveSection(i);
          break;
        } else {
          newSections[i].life = maxLife;
          remainingAmount -= availableSpace;
        }
      }
    }
    setSections(newSections);
  };

  const handleDamageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDamage(Number(e.target.value));
  };

  const applyDamage = () => {
    decreaseLife(damage);
  };

  const activateSection = (index: number) => {
    setActiveSection(index);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="mb-4 flex flex-col items-center">
        <label className="mb-2 font-bold">Número de Jugadores:</label>
        <select
          value={players}
          onChange={(e) => setPlayers(Number(e.target.value))}
          className="p-2 border rounded"
        >
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center mb-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col items-center m-2 cursor-pointer border p-2 rounded shadow ${
              section.life === 0 ? "bg-red-200" : index === activeSection ? "bg-yellow-200" : "bg-white"
            }`}
            onClick={() => activateSection(index)}
          >
            <input
              type="number"
              value={section.multiplier}
              onChange={(e) =>
                handleMultiplierChange(index, Number(e.target.value))
              }
              className="w-16 p-1 border rounded text-center"
              min="1"
              step="1"
            />
            <div className="text-xl font-bold mt-2 p-2 rounded">
              {section.life}/{players * section.multiplier}
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-2 mb-4">
      <button className="p-2 bg-red-500 text-white rounded" onClick={() => decreaseLife(10)}>
          -10
        </button>
        <button className="p-2 bg-red-500 text-white rounded" onClick={() => decreaseLife(1)}>
          -1
        </button>
        <button className="p-2 bg-green-500 text-white rounded" onClick={() => increaseLife(1)}>
          +1
        </button>        
        <button className="p-2 bg-green-500 text-white rounded" onClick={() => increaseLife(10)}>
          +10
        </button>
        
      </div>
      <div className="flex items-center">
        <input
          type="number"
          value={damage}
          onChange={handleDamageChange}
          className="w-16 p-2 border rounded text-center"
          min="0"
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded" onClick={applyDamage}>
          Aplicar Daño
        </button>
      </div>
    </div>
  );
};

export default MonsterLifeTracker;
