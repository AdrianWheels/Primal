// Notes.tsx
import React, { ChangeEvent } from 'react';

interface NotesProps {
  notes: string;
  onChange: (value: string) => void;
}

const Notes: React.FC<NotesProps> = ({ notes, onChange }) => (
  <div className="mt-4">
    <h3 className="font-bold mb-2 text-white bg-black p-2">NOTES</h3>
    <textarea
      value={notes}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      className="w-full p-2 border rounded"
      rows={4}
    />
  </div>
);

export default Notes;
