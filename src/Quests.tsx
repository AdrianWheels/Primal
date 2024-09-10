import React, { useState, useEffect } from 'react';
import questData from './data/Quest.json';

// Import element icons
import fireIcon from './iconos/fuego.png';
import hornIcon from './iconos/cuerno.png';
import coralIcon from './iconos/coral.png';
import crystalIcon from './iconos/cristal.png';
import thunderIcon from './iconos/rayo.png';
import metalIcon from './iconos/metal.png';
import featherIcon from './iconos/pluma.png';
import poisonIcon from './iconos/veneno.png';
import iceIcon from './iconos/hielo.png';

interface QuestInfo {
  Element: string[];
  Tittle: string[];
  Monster: string[];
  QuestText: string[];
}

const elementIcons: { [key: string]: string } = {
  Fire: fireIcon,
  Horn: hornIcon,
  Coral: coralIcon,
  Crystal: crystalIcon,
  Thunder: thunderIcon,
  Metal: metalIcon,
  Feather: featherIcon,
  Poison: poisonIcon,
  Ice: iceIcon,
};

const Quests: React.FC = () => {
  const quests = Array.from({ length: 49 }, (_, i) => i + 1);
  const [questStates, setQuestStates] = useState<{ [key: number]: 'default' | 'selected' | 'completed' | 'failed' }>(() => {
    const savedQuestStates = localStorage.getItem('questStates');
    return savedQuestStates ? JSON.parse(savedQuestStates) : {};
  });
  const [selectedQuest, setSelectedQuest] = useState<number | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number, y: number } | null>(null);

  const handleQuestClick = (quest: number, event: React.MouseEvent) => {
    event.preventDefault();
    if (selectedQuest === quest) {
      setSelectedQuest(null);
      setContextMenuPosition(null);
    } else {
      setSelectedQuest(quest);
      setContextMenuPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleStateChange = (quest: number, newState: 'default' | 'selected' | 'completed' | 'failed') => {
    setQuestStates(prevStates => ({
      ...prevStates,
      [quest]: newState
    }));
    setSelectedQuest(null);
    setContextMenuPosition(null);
  };

  useEffect(() => {
    localStorage.setItem('questStates', JSON.stringify(questStates));
  }, [questStates]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuPosition && !event.target) {
        setSelectedQuest(null);
        setContextMenuPosition(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenuPosition]);

  const QuestCard: React.FC<{ questInfo: QuestInfo }> = ({ questInfo }) => (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-full">
      <div className="flex items-center mb-2">
        <img src={elementIcons[questInfo.Element[0]]} alt={questInfo.Element[0]} className="w-6 h-6 mr-2" />
        <span className="text-lg font-bold">{questInfo.Tittle[0]}</span>
      </div>
      <div className="font-semibold mb-2">{questInfo.Monster[0]}</div>
      <p className="text-sm">{questInfo.QuestText[0]}</p>
    </div>
  );

  return (
    <div className="mb-4 flex">
      <div className="w-2/3 pr-4">
        <h3 className="font-bold mb-2 text-white bg-black p-2 text-center">Quests</h3>
        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2 p-2 bg-gray-200 rounded-lg">
          {quests.map((quest) => (
            <div key={quest} className="relative">
              <button
                className={`w-10 h-10 border rounded ${
                  questStates[quest] === 'selected' ? 'border-blue-500 border-2' :
                  questStates[quest] === 'completed' ? 'bg-green-500 text-white' :
                  questStates[quest] === 'failed' ? 'bg-red-500 text-white' :
                  'border-gray-400'
                }`}
                onClick={(e) => handleQuestClick(quest, e)}
              >
                {questStates[quest] === 'completed' ? '✓' :
                 questStates[quest] === 'failed' ? '✗' :
                 quest}
              </button>
              {selectedQuest === quest && contextMenuPosition && (
                <div
                  className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg"
                  style={{ top: '0', left: '100%', marginLeft: '5px' }}
                >
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleStateChange(quest, 'default')}>Default</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleStateChange(quest, 'selected')}>Selected</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleStateChange(quest, 'completed')}>Completed</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleStateChange(quest, 'failed')}>Failed</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3">
        {selectedQuest && (
          <QuestCard questInfo={questData[selectedQuest.toString() as keyof typeof questData]} />
        )}
      </div>
    </div>
  );
};

export default Quests;
