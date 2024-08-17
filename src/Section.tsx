// Section.tsx
import React, { ChangeEvent } from 'react';

interface SectionProps<T> {
  title: string;
  items: T;
  icons: { [key: string]: string };
  onChange: (key: string, value: number) => void;
}

const Section = <T extends Record<string, number>>({
  title,
  items,
  icons,
  onChange,
}: SectionProps<T>) => (
  <div className="mb-4">
    <h3 className="font-bold mb-2 text-white bg-black p-2">{title.toUpperCase()}</h3>
    <div className="grid grid-cols-1 gap-2">
      {Object.entries(items).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center">
          <span className="capitalize flex items-center">
            <img src={icons[key]} alt={key} className="w-6 h-6 mr-2" />
            {key}
          </span>
          <input
            type="number"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(key, parseInt(e.target.value) || 0)
            }
            className="w-12 p-1 border rounded"
          />
        </div>
      ))}
    </div>
  </div>
);

export default Section;
