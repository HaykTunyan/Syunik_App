export type CityCard = {
  route: string;
  title: string;
  image: number;
  description: string;
};

export const CITIES: CityCard[] = [
  {
    route: 'Kapan',
    title: 'Kapan',
    image: require('../assets/images/kapan_city.png'),
    description: 'The regional center of Syunik, located at the foot of Mount Khustup.',
  },
  {
    route: 'Goris',
    title: 'Goris',
    image: require('../assets/images/goris_city.png'),
    description: 'A city with unique architectural style, famous for its caves.',
  },
  {
    route: 'Sisian',
    title: 'Sisian',
    image: require('../assets/images/sisian_city.png'),
    description: 'Located on the banks of the Vorotan River, with a rich history.',
  },
  {
    route: 'Meghri',
    title: 'Meghri',
    image: require('../assets/images/meghri_city.png'),
    description: "Armenia's southernmost city with a mild climate.",
  },
  {
    route: 'Qajaran',
    title: 'Qajaran',
    image: require('../assets/images/qajaran_city.png'),
    description: 'Industrial city in Eastern Syunik, known for mining.',
  },
  {
    route: 'Agarak',
    title: 'Agarak',
    image: require('../assets/images/agarak_city.png'),
    description: 'Mining city of Syunik, famous for molybdenum and copper mines.',
  },
];