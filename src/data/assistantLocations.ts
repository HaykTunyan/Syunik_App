export type AssistantDestination =
  | {kind: 'city'; id: string; title: string; context: string}
  | {kind: 'village'; id: string; title: string; context: string};

type LocationEntry = AssistantDestination & {aliases: string[]};

/**
 * Maps names a visitor is likely to say to screens which already contain the
 * relevant city, road, landmark, and historical-location information.
 */
const locations: LocationEntry[] = [
  {kind: 'village', id: 'tatev', title: 'Tatev', context: 'Tatev village, Tatev Monastery, and the mountain route from Goris.', aliases: ['tatev monastery', 'wings of tatev', 'tatev cableway', 'tatev']},
  {kind: 'village', id: 'khndzoresk', title: 'Khndzoresk', context: 'Khndzoresk cave village, its hanging bridge, and the canyon road from Goris.', aliases: ['old khndzoresk', 'khndzoresk bridge', 'khndzoresk']},
  {kind: 'village', id: 'halidzor', title: 'Halidzor', context: 'Halidzor Fortress and the historic Tatev route.', aliases: ['halidzor fortress', 'halidzor']},
  {kind: 'village', id: 'shaki', title: 'Shaki', context: 'Shaki Waterfall and the Sisian highland route.', aliases: ['shaki waterfall', 'shake waterfall', 'shaki']},
  {kind: 'village', id: 'shikahogh', title: 'Shikahogh', context: 'Shikahogh village and its wooded Kapan mountain route.', aliases: ['shikahogh', 'shikahox']},
  {kind: 'village', id: 'Khot', title: 'Khot', context: 'Khot village and the Goris mountain corridor.', aliases: ['khot village', 'khot']},
  {kind: 'city', id: 'Kapan', title: 'Kapan', context: 'Kapan, Khustup Mountain, Vahanavank Monastery, and Baghaberd Fortress.', aliases: ['baghaberd fortress', 'vahanavank monastery', 'khustup mountain', 'khustup', 'kapan']},
  {kind: 'city', id: 'Goris', title: 'Goris', context: 'Goris, its rock forest and nearby Tatev and Khndzoresk destinations.', aliases: ['goris rock forest', 'medieval goris cave', 'goris']},
  {kind: 'city', id: 'Sisian', title: 'Sisian', context: 'Sisian, Zorats Karer (Karahunj), and St. Hovhannes Church.', aliases: ['zorats karer', 'zorat karer', 'karahunj', 'carahunge', 'sisian']},
  {kind: 'city', id: 'Meghri', title: 'Meghri', context: 'Meghri, its fortress, old street, bridge, and viewpoint.', aliases: ['meghri fortress', 'meghri viewpoint', 'meghri bridge', 'meghri']},
  {kind: 'city', id: 'Qajaran', title: 'Qajaran', context: 'Qajaran, Lichk, Qajaran Bear, and Qajaran Park.', aliases: ['qajaran bear', 'qajaran park', 'qajaran', 'kajaran', 'lichk']},
  {kind: 'city', id: 'Agarak', title: 'Agarak', context: 'Agarak, its ancient site, old town, and Cori Waterfall.', aliases: ['agarak ancient site', 'cori waterfall', 'agarak old town', 'agarak']},
];

function normalise(value: string) {
  return value
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function resolveSyunikDestination(value: string): AssistantDestination | undefined {
  const query = normalise(value);
  if (!query) {
    return undefined;
  }

  const matches = locations.flatMap(location =>
    location.aliases
      .map(alias => ({location, alias: normalise(alias), index: query.indexOf(normalise(alias))}))
      .filter(match => match.index >= 0),
  );

  if (matches.length === 0) {
    return undefined;
  }

  matches.sort((a, b) => b.alias.length - a.alias.length || a.index - b.index);
  const {aliases: _aliases, ...destination} = matches[0].location;
  return destination;
}

export const supportedDestinationNames = locations.map(location => location.title).filter((name, index, all) => all.indexOf(name) === index);
