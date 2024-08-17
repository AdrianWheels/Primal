import React, { useState, useEffect } from 'react';
import CharacterForm from './CharacterForm';
import SkillTree from './SkillTree';
import Section from './Section';
import Notes from './Notes';
import CharacterList from './CharacterList';
import Shop from './Tienda';
import { Character } from './types';

import {
  classOptions,
  defaultCharacter,
  materialIcons,
  plantIcons,
  elementIcons,
} from './constants';

const CharacterSheet: React.FC = () => {
  const [character, setCharacter] = useState<Character>(defaultCharacter);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeCharacterIndex, setActiveCharacterIndex] = useState<number | null>(null);
  const [isForgeVisible, setIsForgeVisible] = useState(false);
  const [materialsToSubtract, setMaterialsToSubtract] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    loadCharacters();
  }, []);

  useEffect(() => {
    if (activeCharacterIndex !== null) {
      const updatedCharacters = [...characters];
      updatedCharacters[activeCharacterIndex] = character;
      setCharacters(updatedCharacters);
      localStorage.setItem("characters", JSON.stringify(updatedCharacters));
    }
  }, [character]);

  const handleInputChange = (
    section: keyof Character,
    key: string,
    value: string | number | boolean,
    index?: number
  ) => {
    if (section === "skills" && index !== undefined) {
      setCharacter((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [key]: prev.skills[key].map((item, i) =>
            i === index ? (value as boolean) : item
          ),
        },
      }));
    } else if (typeof value === "number") {
      setCharacter((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section] as any),
          [key]: value,
        },
      }));
    } else {
      setCharacter((prev) => ({
        ...prev,
        [section]: value,
      }));
    }
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = classOptions.find(option => option.name === e.target.value);
    setCharacter(prev => ({
      ...prev,
      class: selectedClass ? selectedClass.name : ""
    }));
  };

  const saveCharacter = () => {
    const newCharacters = [...characters, character];
    setCharacters(newCharacters);
    localStorage.setItem("characters", JSON.stringify(newCharacters));
  };

  const loadCharacters = () => {
    const storedCharacters = localStorage.getItem("characters");
    if (storedCharacters) {
      setCharacters(JSON.parse(storedCharacters));
    }
  };

  const handleCharacterSelect = (index: number) => {
    setCharacter(characters[index]);
    setActiveCharacterIndex(index);
  };

  const deleteCharacter = (index: number) => {
    const newCharacters = characters.filter((_, i) => i !== index);
    setCharacters(newCharacters);
    localStorage.setItem("characters", JSON.stringify(newCharacters));
    if (activeCharacterIndex === index) {
      setCharacter(defaultCharacter);
      setActiveCharacterIndex(null);
    }
  };

  const toggleForgeVisibility = () => {
    setIsForgeVisible(!isForgeVisible);
    setMaterialsToSubtract({}); // Reinicia los materiales a restar cuando cierras la forja
  };

  const handlePurchase = (materialsNeeded: { [key: string]: number }) => {
    const updatedMaterials = { ...character.materials };

    Object.entries(materialsNeeded).forEach(([material, amount]) => {
      if (updatedMaterials[material]) {
        updatedMaterials[material] += amount; // Ya es negativo, así que resta
      }
    });

    setCharacter((prev) => ({ ...prev, materials: updatedMaterials }));

    if (activeCharacterIndex !== null) {
      const updatedCharacters = [...characters];
      updatedCharacters[activeCharacterIndex] = { ...character, materials: updatedMaterials };
      setCharacters(updatedCharacters);
      localStorage.setItem("characters", JSON.stringify(updatedCharacters));
    }

    setIsForgeVisible(false);
  };

  const handleMaterialsChange = (materialsNeeded: { [key: string]: number }) => {
    setMaterialsToSubtract(materialsNeeded);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow relative">
      <CharacterForm
        character={character}
        classOptions={classOptions}
        onChange={handleInputChange}
        onSave={saveCharacter}
        onClassChange={handleClassChange}
      />

      {character.class && (
        <div className="mb-4 flex items-center">
          <img
            src={classOptions.find(option => option.name === character.class)?.icon}
            alt={character.class}
            className="w-8 h-8 mr-2"
          />
          <span>{character.class}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {isForgeVisible ? (
          <div className="bg-white shadow-lg rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-black font-bold">Forge Shop</h2>
              <button
                onClick={toggleForgeVisibility}
                className="p-1 bg-red-500 text-white rounded-lg text-sm"
              >
                Close
              </button>
            </div>
            <Shop
              onPurchase={handlePurchase}
              characterMaterials={character.materials}
            />
          </div>
        ) : (
          <SkillTree
            skills={character.skills}
            onChange={(key, index, value) => handleInputChange("skills", key, value, index)}
          />
        )}
        <div className="relative">
          <Section
            title="materials"
            items={{
              ...character.materials,
              ...materialsToSubtract, // Aquí mostramos el número negativo
            }}
            icons={materialIcons}
            onChange={(key, value) => handleInputChange("materials", key, value)}
          />
          <button
            onClick={toggleForgeVisibility}
            className="p-1 bg-red-500 text-white rounded-lg text-sm"
          >
            Forge
          </button>
        </div>

        <Section
          title="plants"
          items={character.plants}
          icons={plantIcons}
          onChange={(key, value) => handleInputChange("plants", key, value)}
        />
        <Section
          title="elements"
          items={character.elements}
          icons={elementIcons}
          onChange={(key, value) => handleInputChange("elements", key, value)}
        />
      </div>

      <Notes
        notes={character.notes}
        onChange={(value) => handleInputChange("notes", "notes", value)}
      />

      <CharacterList
        characters={characters}
        onSelect={handleCharacterSelect}
        onDelete={deleteCharacter}
      />
    </div>
  );
};

export default CharacterSheet;
