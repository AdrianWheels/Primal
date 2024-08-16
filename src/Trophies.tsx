import React, { useState, useEffect } from 'react';

const trophies = [
  'Vyraxen', 'Toramat', 'Korowon', 'Felaxir', 'Ozew', 'Hurom', 'Hydar',
  'Sirkaaj', 'Pazis', 'Zekath', 'Kharja', 'Dygorax', 'Orouxen', 'Morkraas',
  'Jekoros', 'Tarragua', 'Reikal', 'Mamuraak', 'Nagarjas', 'Zekalith', 'Xitheros'
];

const Trophies: React.FC = () => {
  const [checkedTrophies, setCheckedTrophies] = useState<string[]>(() => {
    // Recuperar los datos del localStorage al cargar la página
    const savedTrophies = localStorage.getItem('checkedTrophies');
    return savedTrophies ? JSON.parse(savedTrophies) : [];
  });

  const handleCheckboxChange = (trophy: string) => {
    const updatedTrophies = checkedTrophies.includes(trophy)
      ? checkedTrophies.filter(t => t !== trophy)
      : [...checkedTrophies, trophy];
    setCheckedTrophies(updatedTrophies);
  };

  useEffect(() => {
    // Guardar los datos en localStorage cada vez que `checkedTrophies` cambie
    localStorage.setItem('checkedTrophies', JSON.stringify(checkedTrophies));
  }, [checkedTrophies]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Trophies</h2>
      <div className="grid grid-cols-3 gap-4">
        {trophies.map((trophy, index) => (
          <div key={index} className="flex items-center">
            <img src={`path-to-icon/${trophy.toLowerCase()}.png`} alt={trophy} className="w-8 h-8 mr-2"/>
            <span>{trophy}</span>
            <input
              type="checkbox"
              checked={checkedTrophies.includes(trophy)}
              onChange={() => handleCheckboxChange(trophy)}
              className="ml-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trophies;
