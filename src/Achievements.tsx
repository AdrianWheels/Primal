import React, { useState, useEffect } from 'react';

const Achievements: React.FC = () => {
  const [notes, setNotes] = useState<string>(() => {
    // Cargar las notas guardadas de localStorage cuando se monte el componente
    return localStorage.getItem('achievementNotes') || '';
  });

  useEffect(() => {
    // Guardar las notas en localStorage cada vez que cambien
    localStorage.setItem('achievementNotes', notes);
  }, [notes]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Achievements</h2>
      <textarea
        className="w-full h-32 p-2 border rounded-lg"
        placeholder="Achievements notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
};

export default Achievements;
