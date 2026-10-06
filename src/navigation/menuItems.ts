import type {AppScreen} from './types';

export type NavigationMenuItem = {
  key: Exclude<AppScreen, 'menu'>;
  label: string;
  description: string;
  icon: string;
};

export const navigationMenuItems: NavigationMenuItem[] = [
  {key: 'home', label: 'Home', description: 'Your Syunik overview', icon: '⌂'},
  {key: 'about', label: 'About Syunik', description: 'The region, at a glance', icon: 'i'},
  {key: 'tourism', label: 'Tourism', description: 'Places worth discovering', icon: '⌖'},
  {key: 'restaurants', label: 'Restaurants', description: 'Taste regional cooking', icon: '◉'},
  {key: 'roads', label: 'Roads', description: 'Routes across Syunik', icon: '↗'},
  {key: 'products', label: 'Local products', description: 'Made in Syunik', icon: '✦'},
  {key: 'history', label: 'History', description: 'Stories and heritage', icon: '◷'},
  {key: 'contact', label: 'Contact us', description: 'Get in touch with our team', icon: '✉'},
  {key: 'profile', label: 'My profile', description: 'Manage your travel name', icon: '●'},
];
