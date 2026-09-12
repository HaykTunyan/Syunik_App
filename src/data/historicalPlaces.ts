export type HistoricalPlace = {
  name: string;
  address: string;
};

export type HistoricalPlacesByCity = {
  city: string;
  places: HistoricalPlace[];
};

export const historicalPlacesByCity: HistoricalPlacesByCity[] = [
  {
    city: 'Kapan',
    places: [
      {name: 'Vahanavank Monastery', address: 'Kapan Municipality, Syunik Province'},
      {name: 'Baghaberd Fortress', address: 'Near Kapan, Syunik Province'},
      {name: 'Halidzor Fortress', address: 'Halidzor, Kapan Municipality'},
    ],
  },
  {
    city: 'Goris',
    places: [
      {name: 'Old Goris Cave Dwellings', address: 'Goris, Syunik Province'},
      {name: 'St. Hripsime Church', address: 'Goris, Syunik Province'},
      {name: 'Khndzoresk Cave Village', address: 'Khndzoresk, near Goris'},
    ],
  },
  {
    city: 'Sisian',
    places: [
      {name: 'Zorats Karer (Karahunj)', address: 'Near Sisian, Syunik Province'},
      {name: 'St. Hovhannes Church', address: 'Sisian, Syunik Province'},
      {name: 'Shaki Waterfall', address: 'Shaki, near Sisian'},
    ],
  },
  {
    city: 'Agarak',
    places: [
      {name: 'Agarak Ancient Settlement', address: 'Agarak, Syunik Province'},
      {name: 'Agarak Old Town', address: 'Agarak, Syunik Province'},
    ],
  },
  {
    city: 'Meghri',
    places: [
      {name: 'Meghri Fortress', address: 'Meghri, Syunik Province'},
      {name: 'Surb Astvatsatsin Church', address: 'Meghri, Syunik Province'},
      {name: 'St. Sargis Church', address: 'Meghri, Syunik Province'},
    ],
  },
  {
    city: 'Qajaran',
    places: [
      {name: 'Qajaran Historic Mining District', address: 'Qajaran, Syunik Province'},
      {name: 'Lichk Village Heritage Area', address: 'Lichk, near Qajaran'},
    ],
  },
];
