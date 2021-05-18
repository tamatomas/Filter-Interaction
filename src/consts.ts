import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('screen');
export const BTN_SIZE = 52;
export const PADDING = 12;
export const BTN_RADIUS = BTN_SIZE / 2;

export const COLOR_PRIMARY = '#0197A1';
export const COLOR_SECONDARY = '#FBC27E';
export const COLOR_BCKG = '#016467';
export const COLOR_LABEL = '#FFF3E4';

export const btnIcons = [
  'movie-filter',
  'image-auto-adjust',
  'image-filter-black-white',
  'image-filter-tilt-shift',
];
export const btnNames = [
  'Movie filter',
  'Photo filter',
  'Black and white',
  'Tilt and shift',
];

export const closeIcon = 'window-close';
export const filterIcon = 'filter-variant';
