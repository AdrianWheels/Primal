import React, { useState, useEffect } from 'react';

const CampaignChapters: React.FC = () => {
  const chapters = Array.from({ length: 11 }, (_, i) => i + 1);
  const [checkedChapters, setCheckedChapters] = useState<number[]>(() => {
    // Recuperar los datos del localStorage al cargar la página
    const savedChapters = localStorage.getItem('checkedChapters');
    return savedChapters ? JSON.parse(savedChapters) : [];
  });

  const handleCheckboxChange = (chapter: number) => {
    const updatedChapters = checkedChapters.includes(chapter)
      ? checkedChapters.filter(c => c !== chapter)
      : [...checkedChapters, chapter];
    setCheckedChapters(updatedChapters);
  };

  const isSpecialChapter = (chapter: number) => {
    return chapter === 1 || chapter === 4 || chapter === 8;
  };

  useEffect(() => {
    // Guardar los datos en localStorage cada vez que `checkedChapters` cambie
    localStorage.setItem('checkedChapters', JSON.stringify(checkedChapters));
  }, [checkedChapters]);

  return (
    <div className="mb-4">
      <h3 className="font-bold mb-2 text-white bg-black p-2 text-center">Campaign Chapters</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4 p-2 bg-gray-200 rounded-lg">
        {chapters.map((chapter) => (
          <label
            key={chapter}
            className={`relative flex items-center justify-center w-full h-10 border border-gray-400 rounded cursor-pointer ${
              isSpecialChapter(chapter) ? 'border-orange-500' : ''
            }`}
          >
            <input
              type="checkbox"
              checked={checkedChapters.includes(chapter)}
              onChange={() => handleCheckboxChange(chapter)}
              className="appearance-none"
            />
            <span
              className={`absolute inset-0 flex items-center justify-center font-bold ${
                checkedChapters.includes(chapter)
                  ? 'text-white'
                  : isSpecialChapter(chapter)
                  ? 'text-orange-500'
                  : 'text-black'
              }`}
            >
              {chapter}
            </span>
            {checkedChapters.includes(chapter) && (
              <span
                className={`absolute inset-0 flex items-center justify-center text-white ${
                  isSpecialChapter(chapter) ? 'bg-red-500' : 'bg-orange-500'
                } rounded`}
              >
                &#10003;
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CampaignChapters;
