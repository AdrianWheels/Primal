// SkillTree.tsx
import React from 'react';

interface SkillsProps {
  skills: { [key: string]: boolean[] };
  onChange: (key: string, index: number, value: boolean) => void;
}

const SkillTree: React.FC<SkillsProps> = ({ skills, onChange }) => (
  <div className="mb-4">
    <h3 className="font-bold mb-2 text-white bg-black p-2">SKILL TREE</h3>
    {Object.entries(skills).map(([key, values]) => (
      <div key={key} className="mb-2">
        <div className="font-semibold">{key}</div>
        <div className="flex space-x-2">
          {values.map((value, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={() => onChange(key, index, !value)}
                className="mr-2"
              />
              {index + 1}
            </label>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default SkillTree;
