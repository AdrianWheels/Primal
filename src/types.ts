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
    Tarmaret: number;
    Albalacea: number;
    Mellis: number;
    Anthemon: number;
    Saelicornia: number;
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
    plants: Plants;
    elements: Elements;
    notes: string;
  }
  
