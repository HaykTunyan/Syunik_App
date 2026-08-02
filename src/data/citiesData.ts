import type { ImageSourcePropType } from 'react-native';

export interface Attraction {
  id: string;
  image: ImageSourcePropType;
}

export interface CityAttraction {
  id: string;
  text: string;
  image: ImageSourcePropType;
}

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
  mostVisitedPlace: CityAttraction[];
  attractions: Attraction[];
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
    mostVisitedPlace: [
      {
        id: 'Baghaberd Fortress',
        text: 'Baghaberd Fortress',
        image: require('../assets/images/kapan/baghaberd_fortress.png'),
      },
      {
        id: 'Vahanavank Monastery',
        text: 'Vahanavank Monastery',
        image: require('../assets/images/kapan/vahnavanq_kapan_ai.png'),
      },
      {
        id: 'Khustup',
        text: 'Khustup Mountain',
        image: require('../assets/images/kapan/mountain_khustup.png'),
      },
    ],
    attractions: [
      {
        id: 'Khustup',
        image: require('../assets/images/kapan/mountain_khustup.png'),
      },
      {
        id: 'Vahanavank',
        image: require('../assets/images/kapan/vahnavanq_kapan_ai.png'),
      },
      {
        id: 'Baghaberd Fortress',
        image: require('../assets/images/kapan/baghaberd_fortress.png'),
      },
    ],
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
    mostVisitedPlace: [
      {
        id: 'Tatev Monastery',
        text: 'Tatev Monastery',
        image: require('../assets/images/goris/goris_tatev_monastery_ai.png'),
      },
      {
        id: 'Khndzoresk Bridge',
        text: 'Khndzoresk Bridge',
        image: require('../assets/images/goris/goris_khndzoresk_bridge_ai.png'),
      },
      {
        id: 'Medieval Goris Cave',
        text: 'Medieval Goris Cave',
        image: require('../assets/images/goris/goris_tatev_monastery_ai.png'),
      },
      {
        id: 'Goris Rock Forest',
        text: 'Goris Rock Forest',
        image: require('../assets/images/goris/goris_rock_forest_ai.png'),
      },
    ],
    attractions: [
      {
        id: 'Medieval Goris Cave',

        image: require('../assets/images/goris/goris_tatev_monastery_ai.png'),
      },
      {
        id: 'Goris Rock Forest',
        
        image: require('../assets/images/goris/goris_rock_forest_ai.png'),
      },
      {
        id: 'Khndzoresk Bridge',
        image: require('../assets/images/goris/goris_khndzoresk_bridge_ai.png'),
      },
    ],
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
    mostVisitedPlace: [
      {
        id: 'Shaki Waterfall',
        text: 'Shaki Waterfall',
        image: require('../assets/images/sisian/shaki-waterfall-sisian.png'),
      },
      {
        id: 'St. Hovhannes Church',
        text: 'St. Hovhannes Church',
        image: require('../assets/images/sisian/st-hovhannes-church-sisian.png'),

      },
      {
        id: 'Zorats Karer',
        text: 'Zorats Karer',
        image: require('../assets/images/sisian/zaorats-karer.png'),
      },
    ],
    attractions: [
      {
        id: 'Shaki Waterfall',
        image: require('../assets/images/sisian/shaki-waterfall-sisian.png'),
      },
      {
        id: 'Zorats Karer',
        image: require('../assets/images/sisian/zaorats-karer.png'),
      },
      {
        id: 'St. Hovhannes Church',
        image: require('../assets/images/sisian/st-hovhannes-church-sisian.png'),
      },
    ],
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
    mostVisitedPlace: [
      {
        id: 'Agarak Ancient Site',
        text: 'Agarak Ancient Site',
        image: require('../assets/images/agarak/agarak_ancient_site_ai.png'),
      },
      {
        id: 'Cori Waterfall',
        text: 'Cori Waterfall',
        image: require('../assets/images/agarak/cori-jrvezh_ai.png'),
      },
      {
        id: 'Agarak Old Town',
        text: 'Agarak Old Town',
        image: require('../assets/images/agarak/old_town_agarak.png'),
      }
    ],
    attractions: [
      {
        id: 'Agarak Ancient Site',
        image: require('../assets/images/agarak/agarak_ancient_site_ai.png'),
      },
      {
        id: 'Cori Waterfall',
        image: require('../assets/images/agarak/cori-jrvezh_ai.png'),
      },
      {
        id: 'Agarak Old Town',
        image: require('../assets/images/agarak/old_town_agarak.png'),
      },
    ],
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
    mostVisitedPlace: [
      {
        id: 'Meghri Fortress',
        text: 'Meghri Fortress',
        image: require('../assets/images/meghri/Meghri_Fortress-ai.jpg'),
      },
      {
        id: 'Meghri Viewpoint',
        text: 'Meghri Viewpoint',
        image: require('../assets/images/meghri/meghri_viewpoint.png'),
      },
      {
        id: 'Old Street',
        text: 'Old Street',
        image: require('../assets/images/meghri/old-street-Meghri-ai.jpg'),
      },
      {
        id: 'Meghri Bridge',
        text: 'Meghri Bridge',
        image: require('../assets/images/meghri/old-bridge-metaqs-way.png'),
      }
    ],
    attractions: [
      {
        id: 'Meghri Fortress',
        image: require('../assets/images/meghri/Meghri_Fortress-ai.jpg'),
      },
      {
        id: 'Meghri Viewpoint',
        image: require('../assets/images/meghri/meghri_viewpoint.png'),
      },
      {
        id: 'Old Street',
        image: require('../assets/images/meghri/old-street-Meghri-ai.jpg'),
      },
    ],
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
    mostVisitedPlace: [
      {
        id: 'Qajaran Bear',
        text: 'Qajaran Bear',
        image: require('../assets/images/qajaran/qajaran_bear_ai.png'),
      },
      {
        id: 'Qajaran Park',
        text: 'Qajaran Park',
        image: require('../assets/images/qajaran/qajaran_park_ai.png'),
      },
      {
        id: 'Lichk',
        text: 'Lichk',
        image: require('../assets/images/qajaran/qajaran_lichk_ai.png'),
      }
    ],
    attractions: [
      {
        id: 'Qajaran Bear',
        image: require('../assets/images/qajaran/qajaran_bear_ai.png'),
      },
      {
        id: 'Qajaran Park',
        image: require('../assets/images/qajaran/qajaran_park_ai.png'),
      },
      {
        id: 'Lichk',
        image: require('../assets/images/qajaran/qajaran_lichk_ai.png'),
      },
    ],
  },
];
