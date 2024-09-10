import ScaleIcon from './iconos/escamas.png';
import BoneIcon from './iconos/huesos.png';
import BloodIcon from './iconos/sangre.png';
import ZimaIcon from './iconos/zima.png';
import IrideIcon from './iconos/iride.png';
import KobaureoIcon from './iconos/kobaureo.png';
import NilleaIcon from './iconos/nillea.png';
import TamaretIcon from './iconos/tamaret.png'; 
import AlbalaceaIcon from './iconos/albalacea.png'; 
import MellisIcon from './iconos/mellis.png'; 
import AnthemonIcon from './iconos/anthemon.png';
import SaelicorniaIcon from './iconos/saelicornia.png'; 
import FireIcon from './iconos/fuego.png';
import HornIcon from './iconos/cuerno.png';
import CoralIcon from './iconos/coral.png';
import CrystalIcon from './iconos/cristal.png';
import ThunderIcon from './iconos/rayo.png';
import MetalIcon from './iconos/metal.png';
import FeatherIcon from './iconos/pluma.png';
import PoisonIcon from './iconos/veneno.png';
import IceIcon from './iconos/hielo.png';
import GreatBowIcon from './iconos/GB.png';
import GreatSwordIcon from './iconos/GS.png';
import HammerIcon from './iconos/H.png';
import HeavyGunIcon from './iconos/HG.png';
import DualBladeIcon from './iconos/DB.png';
import SwordShieldIcon from './iconos/SS.png';

export const defaultCharacter = {
  name: "",
  class: "",
  skills: {
    A: [false, false],
    B: [false, false],
    C: [false, false],
    D: [false, false],
    E: [false, false],
  },
  materials: {
    Scales: 0,
    Bones: 0,
    Blood: 0,
    Zima: 0,
    Iride: 0,
    Kobaureo: 0,
  },
  plants: {
    Nillea: 0,
<<<<<<< Updated upstream
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
    Tamaret: 0, 
    Albalacea: 0, 
    Mellis: 0,
    Anthemon: 0,
    Saelicornia: 0, 
<<<<<<< Updated upstream
=======
    Tamanei: 0,
    Albalacea: 0,
    Mellis: 0,
    Anthemon: 0,
    Saelicornia: 0,
>>>>>>> 1e883948ff60f0475a348fe62444df60b014a9da
=======
>>>>>>> Stashed changes
  },
  elements: {
    Fire: 0,
    Horn: 0,
    Coral: 0,
    Crystal: 0,
    Thunder: 0,
    Metal: 0,
    Feather: 0,
    Poison: 0,
    Ice: 0,
  },
  notes: "",
};

export const classOptions = [
  { name: "Great Bow", icon: GreatBowIcon },
  { name: "Great Sword", icon: GreatSwordIcon },
  { name: "Hammer", icon: HammerIcon },
  { name: "Heavy Gun", icon: HeavyGunIcon },
  { name: "Dual Blade Karah", icon: DualBladeIcon },
  { name: "Sword and Shield Ljonar", icon: SwordShieldIcon },
];

export const materialIcons = {
  Scales: ScaleIcon,
  Bones: BoneIcon,
  Blood: BloodIcon,
  Zima: ZimaIcon,
  Iride: IrideIcon,
  Kobaureo: KobaureoIcon,
};

export const plantIcons = {
  Nillea: NilleaIcon,
<<<<<<< Updated upstream
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
  Tamaret: TamaretIcon, 
  Albalacea: AlbalaceaIcon, 
  Mellis: MellisIcon, 
  Anthemon: AnthemonIcon,
  Saelicornia: SaelicorniaIcon,
<<<<<<< Updated upstream
=======
  Tamanei: TamaneiIcon,
  Albalacea: AlmalexiaIcon,
  Mellis: MeliusIcon,
  Anthemon: AnthemonIcon,
  Saelicornia: SkellicorniaIcon,
>>>>>>> 1e883948ff60f0475a348fe62444df60b014a9da
=======
>>>>>>> Stashed changes
};

export const elementIcons = {
  Fire: FireIcon,
  Horn: HornIcon,
  Coral: CoralIcon,
  Crystal: CrystalIcon,
  Thunder: ThunderIcon,
  Metal: MetalIcon,
  Feather: FeatherIcon,
  Poison: PoisonIcon,
  Ice: IceIcon,
};
