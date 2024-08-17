// src/components/Background.tsx

import React from 'react';
import HammerIcon from './iconos/Hammer.png'; // Asegúrate de que la ruta sea correcta

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <div
        className="fixed inset-0 bg-cover bg-center opacity-25 z-[-1]"
        style={{ backgroundImage: `url(${HammerIcon})` }}
      ></div>
    </div>
  );
};

export default Background;
