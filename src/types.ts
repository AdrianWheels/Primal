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
    Tamaret: number; 
    Albalacea: number; 
    Mellis: number;
    Saelicornia: number;
<<<<<<< HEAD
    Tarmaret: number;
    Anthemon: number;
=======
>>>>>>> d81dd43de374df374a984dc35f8c22a2f226ae2e
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
<<<<<<< HEAD
=======

>>>>>>> d81dd43de374df374a984dc35f8c22a2f226ae2e
