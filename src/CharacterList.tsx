import React from 'react';
import { Character } from './types';

interface CharacterListProps {
  characters: Character[];
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, onSelect, onDelete }) => (
  <div className="mt-4">
    <h3 className="font-bold mb-2 text-white bg-black p-2">Saved Characters</h3>
    <ul className="list-disc pl-5">
      {characters.map((char, index) => (
        <li
          key={index}
          className="cursor-pointer mb-1 p-2 rounded hover:bg-gray-200 flex justify-between items-center"
          onClick={() => onSelect(index)}
        >
          <span>{char.name} - {char.class}</span>
          <button
            className="ml-4 p-1 bg-red-500 text-white rounded"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(index);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default CharacterList;
