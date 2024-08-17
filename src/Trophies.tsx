import React, { useState, useEffect } from 'react';

// Importar imágenes de trofeos
import vyraxenIcon from './iconos/vyraxen.png';
import toramatIcon from './iconos/toramat.png';
import korowonIcon from './iconos/korowon.png';
import felaxirIcon from './iconos/felaxir.png';
import ozewIcon from './iconos/ozew.png';
import huromIcon from './iconos/hurom.png';
import hydarIcon from './iconos/hydar.png';
import sirkaajIcon from './iconos/sirkaaj.png';
import pazisIcon from './iconos/pazis.png';
import zekathIcon from './iconos/zekath.png';
import kharjaIcon from './iconos/kharja.png';
import dygoraxIcon from './iconos/dygorax.png';
import orouxenIcon from './iconos/orouxen.png';
import morkraasIcon from './iconos/morkraas.png';
import jekorosIcon from './iconos/jekoros.png';
import tarraguaIcon from './iconos/tarragua.png';
import reikalIcon from './iconos/reikal.png';
import mamuraakIcon from './iconos/mamuraak.png';
import nagarjasIcon from './iconos/nagarjas.png';
import zekalithIcon from './iconos/zekalith.png';
import xitherosIcon from './iconos/xitheros.png';
import taraskaIcon from './iconos/taraska.png';

const trophies = [
  { name: 'Vyraxen', icon: vyraxenIcon },
  { name: 'Toramat', icon: toramatIcon },
  { name: 'Korowon', icon: korowonIcon },
  { name: 'Felaxir', icon: felaxirIcon },
  { name: 'Ozew', icon: ozewIcon },
  { name: 'Hurom', icon: huromIcon },
  { name: 'Hydar', icon: hydarIcon },
  { name: 'Sirkaaj', icon: sirkaajIcon },
  { name: 'Pazis', icon: pazisIcon },
  { name: 'Zekath', icon: zekathIcon },
  { name: 'Taraska', icon: taraskaIcon },
  { name: 'Kharja', icon: kharjaIcon },
  { name: 'Dygorax', icon: dygoraxIcon },
  { name: 'Orouxen', icon: orouxenIcon },
  { name: 'Morkraas', icon: morkraasIcon },
  { name: 'Jekoros', icon: jekorosIcon },
  { name: 'Tarragua', icon: tarraguaIcon },
  { name: 'Reikal', icon: reikalIcon },
  { name: 'Mamuraak', icon: mamuraakIcon },
  { name: 'Nagarjas', icon: nagarjasIcon },
  { name: 'Zekalith', icon: zekalithIcon },
  { name: 'Xitheros', icon: xitherosIcon },
];

const Trophies: React.FC = () => {
  const [checkedTrophies, setCheckedTrophies] = useState<string[]>(() => {
    const savedTrophies = localStorage.getItem('checkedTrophies');
    return savedTrophies ? JSON.parse(savedTrophies) : [];
  });

  const handleCheckboxChange = (trophy: string) => {
    const updatedTrophies = checkedTrophies.includes(trophy)
      ? checkedTrophies.filter(t => t !== trophy)
      : [...checkedTrophies, trophy];
    setCheckedTrophies(updatedTrophies);
  };

  useEffect(() => {
    localStorage.setItem('checkedTrophies', JSON.stringify(checkedTrophies));
  }, [checkedTrophies]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-4">
        {trophies.map((trophy, index) => (
          <div key={index} className="flex items-center">
            <img src={trophy.icon} alt={trophy.name} className="w-8 h-8 mr-2"/>
            <span>{trophy.name}</span>
            <input
              type="checkbox"
              checked={checkedTrophies.includes(trophy.name)}
              onChange={() => handleCheckboxChange(trophy.name)}
              className="ml-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trophies;
