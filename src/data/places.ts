import type {ImageSourcePropType} from 'react-native';
import {distanceBetweenCoordinates} from '../utils/geo';

export type PlaceCategory =
  | 'nature'
  | 'history'
  | 'culture'
  | 'adventure'
  | 'food'
  | 'photography'
  | 'relaxation';

export type PlaceType =
  | 'attraction'
  | 'village'
  | 'monastery'
  | 'church'
  | 'fortress'
  | 'mountain'
  | 'waterfall'
  | 'nature_reserve'
  | 'viewpoint'
  | 'museum'
  | 'restaurant';

export interface PlaceCoordinates {
  latitude: number;
  longitude: number;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  type?: PlaceType;
  category: PlaceCategory;
  cityId: string;
  cityName: string;
  coordinates?: PlaceCoordinates;
  imageUrl?: string;
  imageUrls?: string[];
  recommendedDuration: number;
  tags: string[];
  isFeatured?: boolean;
  rating?: number;
  address?: string;
  openingHours?: string;
  website?: string;
  bestTimeToVisit?: string;
  difficulty?: 'easy' | 'moderate' | 'hard';
  priority?: 'recommended' | 'optional';
  createdAt?: string;
  coordinatesStatus?: 'verified' | 'incomplete';
  image: ImageSourcePropType;
  gallery: ImageSourcePropType[];
}

const corePlaces: Place[] = [
  {
    id: 'tatev-monastery', name: 'Tatev Monastery', cityId: 'goris', cityName: 'Goris', category: 'history', tags: ['monastery', 'heritage', 'viewpoint'], recommendedDuration: 90, isFeatured: true, difficulty: 'easy',
    shortDescription: 'A medieval monastery above the Vorotan gorge.',
    description: 'Tatev Monastery is one of Syunik’s defining landmarks, set on a dramatic plateau above the Vorotan gorge.',
    image: require('../assets/images/for-travel/tatev.png'), gallery: [require('../assets/images/for-travel/tatev.png'), require('../assets/images/for-travel/hermitage_tatev.png')],
    coordinates: {latitude: 39.379367, longitude: 46.250031}, address: 'Tatev, Syunik Province', bestTimeToVisit: 'Late spring to early autumn', coordinatesStatus: 'verified',
  },
  {
    id: 'khndzoresk', name: 'Khndzoresk Cave Village', cityId: 'goris', cityName: 'Goris', category: 'adventure', tags: ['caves', 'hiking', 'heritage'], recommendedDuration: 90, difficulty: 'moderate',
    shortDescription: 'Cave dwellings and a historic swinging bridge.',
    description: 'Walk through the canyon of old Khndzoresk to discover cave homes, rock formations, and the famous hanging bridge.',
    image: require('../assets/images/for-travel/khndzoresk_caves.png'), gallery: [require('../assets/images/for-travel/khndzoresk.png'), require('../assets/images/for-travel/khndzoresk_caves.png')],
    coordinates: {latitude: 39.51222, longitude: 46.43361}, address: 'Khndzoresk, Syunik Province', bestTimeToVisit: 'Late spring to early autumn', coordinatesStatus: 'verified',
  },
  {
    id: 'devils-bridge', name: "Devil's Bridge", cityId: 'tatev', cityName: 'Tatev area', category: 'nature', tags: ['nature', 'gorge', 'springs'], recommendedDuration: 60, difficulty: 'moderate',
    shortDescription: 'A natural stone bridge over warm mineral springs.',
    description: 'A striking natural formation in the Vorotan gorge, surrounded by mineral springs and steep canyon walls.',
    image: require('../assets/images/for-travel/devils_bridge.png'), gallery: [require('../assets/images/for-travel/devils_bridge.png')],
    address: 'Vorotan Gorge, Syunik Province', bestTimeToVisit: 'Summer', coordinatesStatus: 'incomplete',
  },
  {
    id: 'khustup-mountain', name: 'Khustup Mountain', cityId: 'kapan', cityName: 'Kapan', category: 'nature', tags: ['mountain', 'hiking', 'viewpoint'], recommendedDuration: 180, difficulty: 'hard',
    shortDescription: 'A high mountain viewpoint above Kapan.',
    description: 'Khustup rises above Kapan with broad views across the southern Syunik mountains and valleys.',
    image: require('../assets/images/for-travel/khustup.png'), gallery: [require('../assets/images/for-travel/khustup.png'), require('../assets/images/kapan/mountain_khustup.png')],
    coordinates: {latitude: 39.13556, longitude: 46.33139}, address: 'Kapan, Syunik Province', bestTimeToVisit: 'Summer to early autumn', coordinatesStatus: 'verified',
  },
  {
    id: 'zorats-karer', name: 'Zorats Karer', cityId: 'sisian', cityName: 'Sisian', category: 'history', tags: ['archaeology', 'heritage', 'photography'], recommendedDuration: 75, isFeatured: true, difficulty: 'easy',
    shortDescription: 'An ancient stone monument on the Sisian plateau.',
    description: 'Zorats Karer, also known as Karahunj, is an atmospheric prehistoric stone complex near Sisian.',
    image: require('../assets/images/for-travel/karahunj.png'), gallery: [require('../assets/images/for-travel/karahunj.png')],
    address: 'Near Sisian, Syunik Province', bestTimeToVisit: 'Spring to autumn', coordinatesStatus: 'incomplete',
  },
  {
    id: 'shaki-waterfall', name: 'Shaki Waterfall', cityId: 'sisian', cityName: 'Sisian', category: 'nature', tags: ['waterfall', 'nature', 'photography'], recommendedDuration: 60, difficulty: 'easy',
    shortDescription: 'A peaceful waterfall in the Vorotan valley.',
    description: 'Shaki Waterfall is an easy-to-recognize natural stop surrounded by green valley scenery near Sisian.',
    image: require('../assets/images/for-travel/shake.png'), gallery: [require('../assets/images/for-travel/shake.png')],
    coordinates: {latitude: 39.552256, longitude: 45.993825}, address: 'Shaki, near Sisian', bestTimeToVisit: 'Late spring to summer', coordinatesStatus: 'verified',
  },
  {
    id: 'meghri-old-town', name: 'Meghri Old Town', cityId: 'meghri', cityName: 'Meghri', category: 'culture', tags: ['old town', 'culture', 'food'], recommendedDuration: 90, difficulty: 'easy',
    shortDescription: 'Warm-colored streets and southern Syunik character.',
    description: 'Meghri’s old streets, churches, orchards, and hillside views reveal a distinctive southern Armenian atmosphere.',
    image: require('../assets/images/for-travel/meghri_viewpoint.png'), gallery: [require('../assets/images/for-travel/meghri_viewpoint.png'), require('../assets/images/meghri/old-street-Meghri-ai.jpg')],
    address: 'Meghri, Syunik Province', bestTimeToVisit: 'Spring and autumn', coordinatesStatus: 'incomplete',
  },
  {
    id: 'vahanavank', name: 'Vahanavank Monastery', cityId: 'kapan', cityName: 'Kapan', category: 'history', tags: ['monastery', 'heritage', 'forest'], recommendedDuration: 45, difficulty: 'easy',
    shortDescription: 'A forested monastery south of Kapan.',
    description: 'Vahanavank is a quiet medieval monastery framed by wooded hills and the mountain landscape around Kapan.',
    image: require('../assets/images/kapan/vahnavanq_kapan_ai.png'), gallery: [require('../assets/images/kapan/vahnavanq_kapan_ai.png')],
    coordinates: {latitude: 39.217778, longitude: 46.331944}, address: 'Kapan Municipality, Syunik Province', bestTimeToVisit: 'Late spring to early autumn', coordinatesStatus: 'verified',
  },
  {
    id: 'qajaran-historic-district', name: 'Qajaran Historic District', cityId: 'qajaran', cityName: 'Qajaran', category: 'culture', tags: ['mining', 'culture', 'mountains'], recommendedDuration: 90, difficulty: 'easy',
    shortDescription: 'Highland city life and mining heritage.',
    description: 'Qajaran offers a grounded view of eastern Syunik, where mining heritage meets dramatic highland scenery.',
    image: require('../assets/images/qajaran_city.png'), gallery: [require('../assets/images/qajaran_city.png')],
    address: 'Qajaran, Syunik Province', bestTimeToVisit: 'Summer', coordinatesStatus: 'incomplete',
  },
  {
    id: 'agarak-ancient-site', name: 'Agarak Ancient Site', cityId: 'agarak', cityName: 'Agarak', category: 'history', tags: ['archaeology', 'heritage', 'history'], recommendedDuration: 60, difficulty: 'easy',
    shortDescription: 'An archaeological site in the Agarak area.', description: 'Agarak’s ancient site is a historical place entry in the southern Syunik catalog.',
    address: 'Agarak, Syunik Province', bestTimeToVisit: 'Spring to autumn', coordinatesStatus: 'incomplete', image: require('../assets/images/agarak/agarak_ancient_site_ai.png'), gallery: [require('../assets/images/agarak/agarak_ancient_site_ai.png')],
  },
  {
    id: 'agarak-old-town', name: 'Agarak Old Town', cityId: 'agarak', cityName: 'Agarak', category: 'culture', tags: ['town', 'culture', 'photography'], recommendedDuration: 60, difficulty: 'easy',
    shortDescription: 'Agarak’s historic town area.', description: 'Agarak Old Town is included as a place record for future walking routes and local context.',
    address: 'Agarak, Syunik Province', bestTimeToVisit: 'Spring to autumn', coordinatesStatus: 'incomplete', image: require('../assets/images/agarak/old_town_agarak.png'), gallery: [require('../assets/images/agarak/old_town_agarak.png')],
  },
];

const additionalPlaces: Place[] = [
  // Goris
  {
    id: 'goris-town', name: 'Goris Town', cityId: 'goris', cityName: 'Goris', category: 'culture',
    shortDescription: 'A historic mountain town with distinctive stone architecture.', description: 'Goris is a cultural center of Syunik surrounded by dramatic rock landscapes.', tags: ['town', 'culture', 'architecture'], recommendedDuration: 120, image: require('../assets/images/goris_city.png'), gallery: [require('../assets/images/goris_city.png')], coordinates: {latitude: 39.50778, longitude: 46.33861}, coordinatesStatus: 'verified',
  },
  {
    id: 'old-goris', name: 'Old Goris', cityId: 'goris', cityName: 'Goris', category: 'history',
    shortDescription: 'The historic cave-settlement landscape east of Goris.', description: 'Old Goris is known for historic dwellings and stone formations carved by time.', tags: ['caves', 'heritage', 'photography'], recommendedDuration: 90, image: require('../assets/images/for-travel/old_goris.png'), gallery: [require('../assets/images/for-travel/old_goris.png')], coordinatesStatus: 'incomplete',
  },
  {
    id: 'khndzoresk-swinging-bridge', name: 'Khndzoresk Swinging Bridge', cityId: 'goris', cityName: 'Goris', category: 'adventure',
    shortDescription: 'The pedestrian bridge crossing the Khndzoresk gorge.', description: 'A walking bridge connecting the paths through the historic Khndzoresk cave settlement.', tags: ['bridge', 'caves', 'hiking'], recommendedDuration: 45, image: require('../assets/images/for-travel/khndzoresk.png'), gallery: [require('../assets/images/for-travel/khndzoresk.png')], coordinatesStatus: 'incomplete', difficulty: 'moderate',
  },
  {
    id: 'goris-cave-city', name: 'Goris Cave City', cityId: 'goris', cityName: 'Goris', category: 'history',
    shortDescription: 'Historic cave dwellings around Goris.', description: 'The cave-city landscape preserves the region’s historic relationship with its volcanic rock formations.', tags: ['caves', 'history', 'photography'], recommendedDuration: 75, image: require('../assets/images/goris/goris_rock_forest_ai.png'), gallery: [require('../assets/images/goris/goris_rock_forest_ai.png')], coordinatesStatus: 'incomplete',
  },
  {
    id: 'goris-rock-formations', name: 'Goris Rock Formations', cityId: 'goris', cityName: 'Goris', category: 'nature',
    shortDescription: 'Distinctive stone pillars and cliffs around Goris.', description: 'The rock formations are among the defining natural features of the Goris valley.', tags: ['rocks', 'nature', 'photography'], recommendedDuration: 60, image: require('../assets/images/goris/goris_rock_forest_ai.png'), gallery: [require('../assets/images/goris/goris_rock_forest_ai.png')], coordinatesStatus: 'incomplete',
  },
  {
    id: 'goris-viewpoint', name: 'Goris Valley Viewpoint', cityId: 'goris', cityName: 'Goris', category: 'nature',
    shortDescription: 'A scenic overlook across Goris and the surrounding mountains.', description: 'A viewpoint entry is reserved for a confirmed public access point around the Goris valley.', tags: ['viewpoint', 'mountains', 'photography'], recommendedDuration: 30, image: require('../assets/images/syunik_view.png'), gallery: [require('../assets/images/syunik_view.png')], coordinatesStatus: 'incomplete',
  },
  // Tatev
  {
    id: 'tatev-village', name: 'Tatev Village', cityId: 'tatev', cityName: 'Tatev', category: 'culture',
    shortDescription: 'The village surrounding the Tatev monastery area.', description: 'Tatev village is the local gateway to the monastery, cableway, and Vorotan valley attractions.', tags: ['village', 'culture', 'gateway'], recommendedDuration: 60, image: require('../assets/images/for-travel/tatev.png'), gallery: [require('../assets/images/for-travel/tatev.png')], coordinates: {latitude: 39.38167, longitude: 46.24}, coordinatesStatus: 'verified',
  },
  {
    id: 'wings-of-tatev', name: 'Wings of Tatev', cityId: 'tatev', cityName: 'Tatev', category: 'adventure',
    shortDescription: 'The aerial tramway linking Halidzor and Tatev.', description: 'Wings of Tatev provides access between the Vorotan valley and Tatev area.', tags: ['cableway', 'adventure', 'viewpoint'], recommendedDuration: 60, image: require('../assets/images/for-travel/tatev.png'), gallery: [require('../assets/images/for-travel/tatev.png')], coordinatesStatus: 'incomplete',
  },
  {
    id: 'tatev-anapat', name: 'Tatevi Anapat', cityId: 'tatev', cityName: 'Tatev', category: 'history',
    shortDescription: 'A historic monastery in the Vorotan valley.', description: 'Tatevi Anapat is a historic hermitage located below Tatev in the Vorotan river valley.', tags: ['monastery', 'heritage', 'valley'], recommendedDuration: 75, image: require('../assets/images/for-travel/hermitage_tatev.png'), gallery: [require('../assets/images/for-travel/hermitage_tatev.png')], coordinates: {latitude: 39.387665, longitude: 46.260806}, coordinatesStatus: 'verified', difficulty: 'moderate',
  },
  {
    id: 'tatev-viewpoint', name: 'Tatev Plateau Viewpoint', cityId: 'tatev', cityName: 'Tatev', category: 'nature',
    shortDescription: 'A viewpoint over the Tatev plateau and Vorotan gorge.', description: 'A viewpoint entry is reserved for a confirmed public overlook around Tatev.', tags: ['viewpoint', 'gorge', 'photography'], recommendedDuration: 30, image: require('../assets/images/for-travel/hermitage_tatev.png'), gallery: [require('../assets/images/for-travel/hermitage_tatev.png')], coordinatesStatus: 'incomplete',
  },
  // Kapan villages
  {
    id: 'tsav', name: 'Tsav', type: 'village', cityId: 'kapan', cityName: 'Kapan', category: 'adventure', priority: 'recommended',
    shortDescription: 'A mountain village surrounded by forests and hiking routes.', description: 'Tsav is a mountain village in Kapan Municipality and a good base for exploring wooded trails, waterfalls, and the surrounding highlands. It suits travelers looking for an active outdoor experience with glimpses of local history.', tags: ['village', 'nature', 'hiking', 'waterfall', 'history', 'mountains'], recommendedDuration: 60, image: require('../assets/images/for-travel/tsav.png'), gallery: [require('../assets/images/for-travel/tsav.png')], coordinates: {latitude: 39.05194, longitude: 46.45806}, coordinatesStatus: 'verified', difficulty: 'moderate', bestTimeToVisit: 'Late spring to early autumn',
  },
  {
    id: 'chakaten', name: 'Chakaten', type: 'village', cityId: 'kapan', cityName: 'Kapan', category: 'history', priority: 'recommended',
    shortDescription: 'An old mountain settlement with religious heritage.', description: 'Chakaten offers a quiet visit centered on village history, churches, and the mountain landscape around its springs. It is suited to travelers interested in cultural heritage and slower rural walks.', tags: ['village', 'history', 'church', 'heritage', 'spring', 'mountains', 'nature'], recommendedDuration: 45, image: require('../assets/images/for-travel/chakaten.png'), gallery: [require('../assets/images/for-travel/chakaten.png')], coordinates: {latitude: 39.14837, longitude: 46.44117}, coordinatesStatus: 'verified', difficulty: 'easy', bestTimeToVisit: 'Late spring to early autumn',
  },
  {
    id: 'antarashat', name: 'Antarashat', type: 'village', cityId: 'kapan', cityName: 'Kapan', category: 'relaxation', priority: 'recommended',
    shortDescription: 'A peaceful mountain village for a relaxed outdoor visit.', description: 'Antarashat is a scenic rural village where travelers can enjoy quiet mountain surroundings, nature, and a nearby waterfall setting. It is a natural fit for an unhurried day outdoors, including locally guided activities such as horseback riding.', tags: ['village', 'nature', 'relaxation', 'waterfall', 'horseback-riding', 'mountains'], recommendedDuration: 60, image: require('../assets/images/for-travel/antarashat.png'), gallery: [require('../assets/images/for-travel/antarashat.png')], coordinates: {latitude: 39.30556, longitude: 46.34028}, coordinatesStatus: 'verified', difficulty: 'easy', bestTimeToVisit: 'Late spring to early autumn',
  },
  {
    id: 'nerkin-hand', name: 'Nerkin Hand', type: 'village', cityId: 'kapan', cityName: 'Kapan', category: 'adventure', priority: 'recommended',
    shortDescription: 'A remote mountain village near forests and protected nature.', description: 'Nerkin Hand is a wilderness-oriented village in Kapan Municipality, close to forested landscapes and protected natural areas. Travelers come for hiking, solitude, and an adventure-focused experience away from busy routes.', tags: ['village', 'nature', 'adventure', 'hiking', 'forest', 'mountains', 'protected-area'], recommendedDuration: 60, image: require('../assets/images/for-travel/nerqin-hand.png'), gallery: [require('../assets/images/for-travel/nerqin-hand.png')], coordinates: {latitude: 39.05697, longitude: 46.52328}, coordinatesStatus: 'verified', difficulty: 'moderate', bestTimeToVisit: 'Late spring to early autumn',
  },
  // {
  //   id: 'tandzaver', name: 'Tandzaver', type: 'village', cityId: 'kapan', cityName: 'Kapan', category: 'culture', priority: 'recommended',
  //   shortDescription: 'A highland village offering mountain scenery and local life.', description: 'Tandzaver gives travelers a chance to experience rural Armenian life in a scenic mountain setting. The visit is suited to slow exploration, landscape viewing, and learning about the character of Syunik’s highland communities.', tags: ['village', 'nature', 'culture', 'rural-life', 'mountains', 'local-life'], recommendedDuration: 75, image: require('../assets/images/syunik_landscape.png'), gallery: [require('../assets/images/syunik_landscape.png')], coordinates: {latitude: 39.3513, longitude: 46.3307}, coordinatesStatus: 'verified', difficulty: 'moderate', bestTimeToVisit: 'Late spring to early autumn',
  // },
  // Kapan landmarks
  {
    id: 'baghaberd-fortress', name: 'Baghaberd Fortress', cityId: 'kapan', cityName: 'Kapan', category: 'history',
    shortDescription: 'A fortress and former stronghold of the Syunik kingdom.', description: 'Baghaberd is a historic fortress west of Kapan on a rocky spur above the river valleys.', tags: ['fortress', 'heritage', 'history'], recommendedDuration: 75, image: require('../assets/images/kapan/baghaberd_fortress.png'), gallery: [require('../assets/images/kapan/baghaberd_fortress.png')], coordinates: {latitude: 39.214849, longitude: 46.277611}, coordinatesStatus: 'verified', difficulty: 'moderate',
  },
  // {
  //   id: 'kapan-historic-center', name: 'Kapan Historic Center', cityId: 'kapan', cityName: 'Kapan', category: 'culture',
  //   shortDescription: 'The urban center and cultural life of Kapan.', description: 'A city-center entry is reserved for confirmed locations and walking routes in Kapan.', tags: ['town', 'culture', 'history'], recommendedDuration: 90, image: require('../assets/images/kapan_city.png'), gallery: [require('../assets/images/kapan_city.png')], coordinatesStatus: 'incomplete',
  // },
  // {
  //   id: 'kapan-viewpoint', name: 'Kapan Mountain Viewpoint', cityId: 'kapan', cityName: 'Kapan', category: 'nature',
  //   shortDescription: 'A scenic view across Kapan and the surrounding mountains.', description: 'A viewpoint entry is reserved for a confirmed public access point around Kapan.', tags: ['viewpoint', 'mountains', 'photography'], recommendedDuration: 30, image: require('../assets/images/kapan/center-of-kapan.png'), gallery: [require('../assets/images/kapan/center-of-kapan.png')], coordinatesStatus: 'incomplete',
  // },
  {
    id: 'garegin-nzhdeh-memorial', name: 'Garegin Nzhdeh Memorial Area', cityId: 'kapan', cityName: 'Kapan', category: 'history',
    shortDescription: 'A memorial location connected with Syunik history.', description: 'The exact visitor location and coordinates require confirmation before being used for navigation.', tags: ['history', 'memorial', 'culture'], recommendedDuration: 45, image: require('../assets/images/kapan/nzhdeh-street.png'), gallery: [require('../assets/images/garegin_nzhdeh_syunik.png')], coordinatesStatus: 'incomplete',
  },
  // {
  //   id: 'halidzor-fortress', name: 'Halidzor Fortress', cityId: 'kapan', cityName: 'Kapan', category: 'history',
  //   shortDescription: 'A fortress associated with the historic Kapan area.', description: 'Halidzor Fortress is a regional heritage site; the exact place record needs coordinate confirmation.', tags: ['fortress', 'heritage', 'history'], recommendedDuration: 60, image: require('../assets/images/for-travel/halidzor.png'), gallery: [require('../assets/images/for-travel/halidzor.png')], coordinatesStatus: 'incomplete',
  // },
  // Meghri
  {
    id: 'meghri-fortress', name: 'Meghri Fortress', cityId: 'meghri', cityName: 'Meghri', category: 'history',
    shortDescription: 'An historic fortress overlooking Meghri.', description: 'Meghri Fortress stands on a hill above the old section of the town.', tags: ['fortress', 'heritage', 'viewpoint'], recommendedDuration: 60, image: require('../assets/images/meghri/Meghri_Fortress-ai.jpg'), gallery: [require('../assets/images/meghri/Meghri_Fortress-ai.jpg')], coordinates: {latitude: 38.90222, longitude: 46.24833}, coordinatesStatus: 'verified', difficulty: 'moderate',
  },
  {
    id: 'st-hovhannes-meghri', name: 'St. Hovhannes Church', cityId: 'meghri', cityName: 'Meghri', category: 'history',
    shortDescription: 'A historic church in Meghri.', description: 'The exact public map point for St. Hovhannes Church requires confirmation before navigation use.', tags: ['church', 'heritage', 'culture'], recommendedDuration: 30, image: require('../assets/images/meghri/old-street-Meghri-ai.jpg'), gallery: [require('../assets/images/meghri/old-street-Meghri-ai.jpg')], coordinatesStatus: 'incomplete',
  },
  {
    id: 'surb-astvatsatsin-meghri', name: 'Surb Astvatsatsin Church', cityId: 'meghri', cityName: 'Meghri', category: 'history',
    shortDescription: 'A historic church in the Meghri area.', description: 'The exact public map point for Surb Astvatsatsin Church requires confirmation before navigation use.', tags: ['church', 'heritage', 'culture'], recommendedDuration: 30, image: require('../assets/images/meghri/meghri_viewpoint.png'), gallery: [require('../assets/images/meghri/meghri_viewpoint.png')], coordinatesStatus: 'incomplete',
  },
  {
    id: 'meghri-viewpoint', name: 'Meghri Valley Viewpoint', cityId: 'meghri', cityName: 'Meghri', category: 'nature',
    shortDescription: 'A view across Meghri and the southern valley.', description: 'A viewpoint entry is reserved for a confirmed public overlook around Meghri.', tags: ['viewpoint', 'valley', 'photography'], recommendedDuration: 30, image: require('../assets/images/meghri/meghri_viewpoint.png'), gallery: [require('../assets/images/meghri/meghri_viewpoint.png')], coordinatesStatus: 'incomplete',
  },
  // Sisian
  {
    id: 'vorotnavank', name: 'Vorotnavank', cityId: 'sisian', cityName: 'Sisian', category: 'history',
    shortDescription: 'A monastic complex overlooking the Vorotan gorge.', description: 'Vorotnavank is a historic monastic complex east of Sisian on a ridge above the Vorotan gorge.', tags: ['monastery', 'heritage', 'gorge'], recommendedDuration: 75, image: require('../assets/images/for-travel/vorotnavanq.png'), gallery: [require('../assets/images/for-travel/vorotnavanq.png')], coordinates: {latitude: 39.4956, longitude: 46.1222}, coordinatesStatus: 'verified', difficulty: 'moderate',
  },
  {
    id: 'vorotnaberd', name: 'Vorotnaberd Fortress', cityId: 'sisian', cityName: 'Sisian', category: 'history',
    shortDescription: 'A fortress above the Vorotan gorge.', description: 'Vorotnaberd is a historic fortress between the villages of Vaghatin and Vorotan.', tags: ['fortress', 'heritage', 'gorge'], recommendedDuration: 60, image: require('../assets/images/for-travel/vorotnaberd.png'), gallery: [require('../assets/images/for-travel/vorotnaberd.png')], coordinates: {latitude: 39.4956, longitude: 46.1222}, coordinatesStatus: 'verified', difficulty: 'hard',
  },
  {
    id: 'sisian-viewpoint', name: 'Sisian Plateau Viewpoint', cityId: 'sisian', cityName: 'Sisian', category: 'nature',
    shortDescription: 'Open views across the Sisian plateau.', description: 'A viewpoint entry is reserved for a confirmed public overlook around Sisian.', tags: ['viewpoint', 'plateau', 'photography'], recommendedDuration: 30, image: require('../assets/images/syunik_view.png'), gallery: [require('../assets/images/syunik_view.png')], coordinatesStatus: 'incomplete',
  },
  {
    id: 'ughtasar', name: 'Mount Ughtasar', cityId: 'sisian', cityName: 'Sisian', category: 'adventure',
    shortDescription: 'A high mountain area north of Sisian.', description: 'The access route and exact visitor coordinates require seasonal and local verification.', tags: ['mountain', 'hiking', 'petroglyphs'], recommendedDuration: 240, image: require('../assets/images/moutain.png'), gallery: [require('../assets/images/moutain.png')], coordinatesStatus: 'incomplete', difficulty: 'hard',
  },
  // Dastakert and other Syunik locations
  {
    id: 'dastakert', name: 'Dastakert', cityId: 'dastakert', cityName: 'Dastakert', category: 'culture',
    shortDescription: 'A highland settlement in the Sisian Municipality.', description: 'Dastakert is a mountain settlement on the slopes of the Zangezur Range.', tags: ['village', 'mountains', 'culture'], recommendedDuration: 60, image: require('../assets/images/syunik_landscape.png'), gallery: [require('../assets/images/syunik_landscape.png')], coordinates: {latitude: 39.36833, longitude: 46.03667}, coordinatesStatus: 'verified',
  },
  {
    id: 'aghitu-church', name: 'Aghitu Memorial and Church', cityId: 'sisian', cityName: 'Sisian', category: 'history',
    shortDescription: 'A historic monument in the Sisian area.', description: 'The exact public map point and current visitor information require confirmation.', tags: ['church', 'heritage', 'history'], recommendedDuration: 45, image: require('../assets/images/sisian/st-hovhannes-church-sisian.png'), gallery: [require('../assets/images/sisian/st-hovhannes-church-sisian.png')], coordinatesStatus: 'incomplete',
  },
  {
    id: 'shikahogh', name: 'Shikahogh', type: 'village', cityId: 'kapan', cityName: 'Kapan', category: 'nature', priority: 'recommended',
    shortDescription: 'A forest village and gateway to the Shikahogh natural area.', description: 'Shikahogh is a historic village in Kapan Municipality surrounded by forest and rich biodiversity. It is a strong starting point for hiking and nature-focused trips, while its long settlement history adds a cultural dimension to the visit.', tags: ['village', 'nature', 'history', 'forest', 'biodiversity', 'hiking'], recommendedDuration: 120, image: require('../assets/images/for-travel/shikahox-view.png'), gallery: [require('../assets/images/for-travel/shikahox-view.png')], coordinates: {latitude: 39.09656, longitude: 46.47365}, coordinatesStatus: 'verified', difficulty: 'moderate', bestTimeToVisit: 'Late spring to early autumn',
  },
  {
    id: 'khot', name: 'Khot', cityId: 'goris', cityName: 'Goris area', category: 'culture',
    shortDescription: 'A traditional village in the Goris area.', description: 'The exact visitor point and route information require confirmation before navigation use.', tags: ['village', 'culture', 'mountains'], recommendedDuration: 60, image: require('../assets/images/for-travel/khot.png'), gallery: [require('../assets/images/for-travel/khot.png')], coordinatesStatus: 'incomplete',
  },
];

export const places: Place[] = [...corePlaces, ...additionalPlaces];

export const placesByCity: Record<string, Place[]> = places.reduce<Record<string, Place[]>>(
  (grouped, place) => {
    grouped[place.cityId] ??= [];
    grouped[place.cityId].push(place);
    return grouped;
  },
  {},
);

export function getPlaceById(placeId: string): Place | undefined {
  return places.find(place => place.id === placeId);
}

export function getPlaceByName(name: string): Place | undefined {
  return places.find(place => place.name.toLowerCase() === name.toLowerCase());
}

export function getPlacesForCity(cityId: string): Place[] {
  return places.filter(place => place.cityId === cityId);
}

export function searchPlaces(query: string): Place[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) {
    return places;
  }

  return places.filter(place =>
    [place.name, place.cityName, place.category, ...place.tags]
      .some(value => value.toLocaleLowerCase().includes(normalizedQuery)),
  );
}

export function getNearbyPlaces(place: Place, limit = 3): Place[] {
  if (!place.coordinates) {
    return [];
  }
  const coordinates = place.coordinates;

  return places
    .filter((candidate): candidate is Place & {coordinates: PlaceCoordinates} => candidate.id !== place.id && Boolean(candidate.coordinates))
    .map(candidate => ({candidate, distance: distanceBetweenCoordinates(coordinates, candidate.coordinates)}))
    .sort((left, right) => left.distance - right.distance)
    .slice(0, limit)
    .map(item => item.candidate);
}

export function getNearbyPlacesFromLocation(userLatitude: number, userLongitude: number, limit = 10) {
  return places
    .filter((place): place is Place & {coordinates: PlaceCoordinates} => Boolean(place.coordinates))
    .map(place => ({
      place,
      distanceKm: distanceBetweenCoordinates(place.coordinates, {latitude: userLatitude, longitude: userLongitude}),
    }))
    .sort((left, right) => left.distanceKm - right.distanceKm)
    .slice(0, limit);
}
