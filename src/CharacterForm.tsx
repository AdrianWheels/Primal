// CharacterForm.tsx
import React, { ChangeEvent } from 'react';
import { Character } from './types'; // Importar las interfaces

interface CharacterFormProps {
  character: Character;
  classOptions: { name: string; icon: string }[];
  onChange: (section: keyof Character, key: string, value: string | number | boolean, index?: number) => void;
  onSave: () => void;
  onClassChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const CharacterForm: React.FC<CharacterFormProps> = ({
  character,
  classOptions,
  onChange,
  onSave,
  onClassChange,
}) => (
  <div className="flex flex-col sm:flex-row justify-between mb-4">
    <input
      className="p-2 border rounded mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
      placeholder="PLAYER NAME"
      value={character.name}
      onChange={(e) => onChange("name", "name", e.target.value)}
    />
    <div className="flex items-center space-x-2 w-full sm:w-auto">
      <select
        className="p-2 border rounded w-full sm:w-auto"
        value={character.class}
        onChange={onClassChange}
      >
        <option value="">Select Class</option>
        {classOptions.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <button className="p-2 bg-blue-500 text-white rounded" onClick={onSave}>
        Save
      </button>
    </div>
  </div>
);

export default CharacterForm;
