// types.ts
export interface Skills {
    [key: string]: boolean[];
  } 
  
  export interface Materials {
    [key: string]: number;
    Scales: number;
    Bones: number;
    Blood: number;
    Zima: number;
    Iride: number;
    Kobaureo: number;
  }
  
 export interface Plants {
    [key: string]: number;
    Nillea: number;
<<<<<<< Updated upstream
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
    Tamaret: number; 
    Albalacea: number; 
    Mellis: number;
    Saelicornia: number; 
<<<<<<< Updated upstream
=======
    Tarmaret: number;
    Albalacea: number;
    Mellis: number;
    Anthemon: number;
    Saelicornia: number;
>>>>>>> 1e883948ff60f0475a348fe62444df60b014a9da
=======
>>>>>>> Stashed changes
  }
  
  export interface Elements {
    [key: string]: number;
    Fire: number;
    Horn: number;
    Coral: number;
    Crystal: number;
    Thunder: number;
    Metal: number;
    Feather: number;
    Poison: number;
    Ice: number;
  }
  
  export interface Character {
    name: string;
    class: string;
    skills: Skills;
    materials: Materials;
    plants: {
      Nillea: number;
      Tamaret: number;
      Albalacea: number;
      Mellis: number; 
      Anthemon: number;
      Saelicornia: number; 
    };
    elements: Elements;
    notes: string;
  }
<<<<<<< Updated upstream
<<<<<<< HEAD
=======
  
>>>>>>> 1e883948ff60f0475a348fe62444df60b014a9da
=======
>>>>>>> Stashed changes
