import React, { useState, useEffect } from 'react';
import CampaignChapters from './CampaignChapters';
import Trophies from './Trophies';
import Quests from './Quests';
import Achievements from './Achievements';
import HuntersTrial from './HuntersTrial';

const CampaignTracker: React.FC = () => {
  const [exportedData, setExportedData] = useState<string | null>(null);

  const serializeData = () => {
    const data = {
      chapters: JSON.parse(localStorage.getItem('checkedChapters') || '[]'),
      trophies: JSON.parse(localStorage.getItem('checkedTrophies') || '[]'),
      quests: JSON.parse(localStorage.getItem('questStates') || '[]'),
      achievements: localStorage.getItem('achievementNotes') || '',
      huntersTrial: {
        defeatTrack: JSON.parse(localStorage.getItem('defeatTrack') || '[false, false, false]'),
        valor: Number(localStorage.getItem('valor') || 0),
        totalDefeats: Number(localStorage.getItem('totalDefeats') || 0),
      },
      herbalistLevels: JSON.parse(localStorage.getItem('herbalistLevels') || '[]'),
      forgeLevels: JSON.parse(localStorage.getItem('forgeLevels') || '[]'),
    };

    const jsonString = JSON.stringify(data);
    const base64String = btoa(jsonString);  // Convertir a base64
    return base64String;
  };

  const deserializeData = (dataString: string) => {
    try {
      const jsonString = atob(dataString);  // Decodificar desde base64
      const data = JSON.parse(jsonString);

      localStorage.setItem('checkedChapters', JSON.stringify(data.chapters || []));
      localStorage.setItem('checkedTrophies', JSON.stringify(data.trophies || []));
      localStorage.setItem('questStates', JSON.stringify(data.quests || []));
      localStorage.setItem('achievementNotes', data.achievements || '');
      localStorage.setItem('defeatTrack', JSON.stringify(data.huntersTrial.defeatTrack || '[false, false, false]'));
      localStorage.setItem('valor', data.huntersTrial.valor.toString());
      localStorage.setItem('totalDefeats', data.huntersTrial.totalDefeats.toString());
      localStorage.setItem('herbalistLevels', JSON.stringify(data.herbalistLevels || []));
      localStorage.setItem('forgeLevels', JSON.stringify(data.forgeLevels || []));
    } catch (error) {
      alert("Invalid data format. Please check the code and try again.");
    }
  };

  const handleExport = () => {
    const dataString = serializeData();
    setExportedData(dataString);
  };

  const handleImport = () => {
    const dataString = prompt("Paste the data code here:");
    if (dataString) {
      deserializeData(dataString);
      window.location.reload(); // Recarga la página para aplicar los cambios
    }
  };

  const handleCopy = () => {
    if (exportedData) {
      navigator.clipboard.writeText(exportedData);
      alert("Code copied to clipboard!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow">
      <CampaignChapters />
      <div className="flex flex-col md:flex-row md:space-x-6 mt-6">
        <div className="flex flex-col space-y-6 md:w-1/4">
          <Section title="The Herbalist" colSpan={12} levels={[1, 2, 3]} storageKey="herbalistLevels" />
          <Section title="The Forge" colSpan={12} levels={[1, 2, 3]} storageKey="forgeLevels" />
        </div>
        <div className="md:w-3/4 mt-6 md:mt-0">
          <Section title="Trophies" colSpan={12}>
            <Trophies />
          </Section>
        </div>
      </div>
      <div className="mt-6">
        <Quests />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <Achievements />
        <HuntersTrial />
      </div>
      
      {/* Botones y cuadro de texto de exportación/importación al final de la página */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <div className="mb-4 flex justify-between">
          <button onClick={handleExport} className="mr-2 p-2 bg-blue-500 text-white rounded">Export Data</button>
          <button onClick={handleImport} className="p-2 bg-green-500 text-white rounded">Import Data</button>
        </div>
        {exportedData && (
          <div className="relative bg-gray-200 p-4 rounded">
            <h4 className="font-bold mb-2">Exported Data:</h4>
            <textarea
              readOnly
              value={exportedData}
              className="w-full h-40 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleCopy}
              className="absolute top-0 right-0 mt-2 mr-2 p-2 bg-yellow-500 text-white rounded"
              title="Copy to clipboard"
            >
              📋
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  colSpan: number;
  children?: React.ReactNode;
  levels?: number[]; // Agregado para niveles
  storageKey?: string; // Clave para guardar en localStorage
}

const Section: React.FC<SectionProps> = ({ title, colSpan, children, levels, storageKey }) => {
  const [checkedLevels, setCheckedLevels] = useState<number[]>(() => {
    // Cargar los niveles seleccionados desde localStorage si existe una clave
    if (storageKey) {
      const savedLevels = localStorage.getItem(storageKey);
      return savedLevels ? JSON.parse(savedLevels) : [];
    }
    return [];
  });

  useEffect(() => {
    // Guardar los niveles seleccionados en localStorage cuando cambien
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(checkedLevels));
    }
  }, [checkedLevels, storageKey]);

  const handleCheckboxChange = (level: number) => {
    if (checkedLevels.includes(level)) {
      setCheckedLevels(checkedLevels.filter(l => l !== level));
    } else {
      setCheckedLevels([...checkedLevels, level]);
    }
  };

  return (
    <div className={`col-span-${colSpan} bg-white p-4 rounded-lg shadow-md`}>
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {levels ? (
        <div className="flex space-x-2">
          {levels.map((level) => (
            <label
              key={level}
              className="relative flex items-center justify-center w-10 h-10 border border-gray-400 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checkedLevels.includes(level)}
                onChange={() => handleCheckboxChange(level)}
                className="appearance-none"
              />
              <span
                className={`absolute inset-0 flex items-center justify-center font-bold ${
                  checkedLevels.includes(level) ? 'text-white' : 'text-black'
                }`}
              >
                {level}
              </span>
              {checkedLevels.includes(level) && (
                <span className="absolute inset-0 flex items-center justify-center text-white bg-orange-500 rounded">
                  &#10003;
                </span>
              )}
            </label>
          ))}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default CampaignTracker;
