import React, { useState, useEffect } from 'react';

const HuntersTrial: React.FC = () => {
  const [defeatTrack, setDefeatTrack] = useState<boolean[]>(() => {
    // Cargar el estado inicial desde localStorage
    const savedDefeatTrack = localStorage.getItem('defeatTrack');
    return savedDefeatTrack ? JSON.parse(savedDefeatTrack) : [false, false, false];
  });
  const [valor, setValor] = useState<number>(() => {
    // Cargar el valor inicial desde localStorage
    const savedValor = localStorage.getItem('valor');
    return savedValor ? Number(savedValor) : 0;
  });
  const [totalDefeats, setTotalDefeats] = useState<number>(() => {
    // Cargar el total de derrotas inicial desde localStorage
    const savedTotalDefeats = localStorage.getItem('totalDefeats');
    return savedTotalDefeats ? Number(savedTotalDefeats) : 0;
  });

  useEffect(() => {
    // Guardar defeatTrack en localStorage cuando cambie
    localStorage.setItem('defeatTrack', JSON.stringify(defeatTrack));
  }, [defeatTrack]);

  useEffect(() => {
    // Guardar valor en localStorage cuando cambie
    localStorage.setItem('valor', valor.toString());
  }, [valor]);

  useEffect(() => {
    // Guardar totalDefeats en localStorage cuando cambie
    localStorage.setItem('totalDefeats', totalDefeats.toString());
  }, [totalDefeats]);

  const handleCheckboxChange = (index: number) => {
    setDefeatTrack((prev) => {
      const newTrack = [...prev];
      newTrack[index] = !newTrack[index];
      return newTrack;
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Hunter's Trial</h2>
      <div className="flex items-center mb-4">
        <span className="mr-4">Defeat Track:</span>
        {defeatTrack.map((checked, index) => (
          <input
            key={index}
            type="checkbox"
            className="mr-2"
            checked={checked}
            onChange={() => handleCheckboxChange(index)}
          />
        ))}
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <span className="mr-2">Valor:</span>
          <input
            type="number"
            className="w-16 p-1 border rounded"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
          />
        </div>
        <div>
          <span className="mr-2">Total Defeats:</span>
          <input
            type="number"
            className="w-16 p-1 border rounded"
            value={totalDefeats}
            onChange={(e) => setTotalDefeats(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default HuntersTrial;
