import React, { useState, useEffect } from 'react';

const Quests: React.FC = () => {
  const quests = Array.from({ length: 49 }, (_, i) => i + 1);
  const [questStates, setQuestStates] = useState<{ [key: number]: 'number' | 'completed' | 'failed' }>(() => {
    // Recuperar los datos del localStorage al cargar la página
    const savedQuestStates = localStorage.getItem('questStates');
    return savedQuestStates ? JSON.parse(savedQuestStates) : {};
  });

  const handleCheckboxClick = (quest: number) => {
    setQuestStates((prevStates) => {
      const currentState = prevStates[quest] || 'number';
      let nextState: 'number' | 'completed' | 'failed';

      if (currentState === 'number') {
        nextState = 'completed';
      } else if (currentState === 'completed') {
        nextState = 'failed';
      } else {
        nextState = 'number';
      }

      return { ...prevStates, [quest]: nextState };
    });
  };

  useEffect(() => {
    // Guardar los datos en localStorage cada vez que `questStates` cambie
    localStorage.setItem('questStates', JSON.stringify(questStates));
  }, [questStates]);

  return (
    <div className="mb-4">
      <h3 className="font-bold mb-2 text-white bg-black p-2 text-center">Quests</h3>
      <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2 p-2 bg-gray-200 rounded-lg">
        {quests.map((quest) => (
          <label
            key={quest}
            className="relative flex items-center justify-center w-10 h-10 border border-gray-400 rounded cursor-pointer"
            onClick={() => handleCheckboxClick(quest)}
          >
            <input type="checkbox" className="appearance-none" />
            <span
              className={`absolute inset-0 flex items-center justify-center font-bold ${
                !questStates[quest] || questStates[quest] === 'number'
                  ? 'text-black'
                  : questStates[quest] === 'completed'
                  ? 'text-white'
                  : 'text-white'
              }`}
            >
              {!questStates[quest] || questStates[quest] === 'number' ? quest : questStates[quest] === 'completed' ? '✓' : '✗'}
            </span>
            {questStates[quest] === 'completed' && (
              <span className="absolute inset-0 flex items-center justify-center text-white bg-green-500 rounded">
                &#10003;
              </span>
            )}
            {questStates[quest] === 'failed' && (
              <span className="absolute inset-0 flex items-center justify-center text-white bg-red-500 rounded">
                &#10007;
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Quests;
