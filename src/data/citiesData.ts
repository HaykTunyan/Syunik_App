import type {ImageSourcePropType} from 'react-native';

export interface CityData {
  id: string;
  name: string;
  latinName: string;
  description: string;
  population: string;
  size: string;
  founding: string;
  coords: [number, number];
  image: ImageSourcePropType;
  placeIds: string[];
}

export const citiesData: CityData[] = [
  {
    id: 'kapan',
    name: 'Kapan',
    latinName: 'Kapan',
    description:
      'A regional center of Syunik, surrounded by the mountains and natural beauty of the area.',
    population: '~42,000',
    size: '36 km²',
    founding: '10th century',
    coords: [39.2075, 46.4058],
    image: require('../assets/images/kapan_city.png'),
    placeIds: ['baghaberd-fortress', 'vahanavank', 'khustup-mountain', 'shikahogh', 'tsav', 'chakaten', 'antarashat', 'nerkin-hand', 'tandzaver'],
  },
  {
    id: 'goris',
    name: 'Goris',
    latinName: 'Goris',
    description: 'A city of unique architecture and dramatic cave landscapes set in the mountains.',
    population: '~20,000',
    size: '5.03 km²',
    founding: '1870',
    coords: [39.5126, 46.3382],
    image: require('../assets/images/goris_city.png'),
    placeIds: ['tatev-monastery', 'khndzoresk', 'goris-cave-city', 'goris-rock-formations'],
  },
  {
    id: 'sisian',
    name: 'Sisian',
    latinName: 'Sisian',
    description: 'A historic town on the banks of the Vorotan River, rich in heritage and mountain scenery.',
    population: '~15,000',
    size: '9 km²',
    founding: '8th century BCE',
    coords: [39.5181, 46.0306],
    image: require('../assets/images/sisian_city.png'),
    placeIds: ['shaki-waterfall', 'zorats-karer', 'aghitu-church'],
  },
  {
    id: 'agarak',
    name: 'Agarak',
    latinName: 'Agarak',
    description: 'A mining town in Syunik, known for its molybdenum and copper deposits.',
    population: '~7,500',
    size: '2.5 km²',
    founding: '1950',
    coords: [38.88, 46.252],
    image: require('../assets/images/agarak_city.png'),
    placeIds: ['agarak-ancient-site', 'agarak-old-town'],
  },
  {
    id: 'meghri',
    name: 'Meghri',
    latinName: 'Meghri',
    description: 'The southernmost city in Armenia, known for its mild climate and scenic valley.',
    population: '~4,500',
    size: '3 km²',
    founding: '906',
    coords: [38.9029, 46.2446],
    image: require('../assets/images/meghri_city.png'),
    placeIds: ['meghri-fortress', 'meghri-viewpoint', 'meghri-old-town', 'st-hovhannes-meghri', 'surb-astvatsatsin-meghri'],
  },
  {
    id: 'qajaran',
    name: 'Qajaran',
    latinName: 'Qajaran',
    description:
      'An industrial city in eastern Syunik, recognized for its mining heritage and natural surroundings.',
    population: '~8,000',
    size: '4.1 km²',
    founding: '1958',
    coords: [39.1441, 46.2553],
    image: require('../assets/images/qajaran_city.png'),
    placeIds: ['qajaran-historic-district'],
  },
];
