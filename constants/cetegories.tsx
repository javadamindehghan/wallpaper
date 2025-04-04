import {categoriesType} from '../type';

export const ApiKey = '49280435-40589e5d1c93cfa6fe1578777';

export const categories: categoriesType[] = [
  'backgrounds',
  'fashion',
  'nature',
  'science',
  'education',
  'feelings',
  'health',
  'people',
  'religion',
  'places',
  'animals',
  'industry',
  'computer',
  'food',
  'sports',
  'transportation',
  'travel',
  'buildings',
  'business',
  'music',
];
export const data = {
  categories,
};
export const Filters = {
 type: ['all', 'photo', 'illustration', 'vector'],
  orientation: ['all', 'horizontal', 'vertical'],
  colors: [
    'grayscale',
    'transparent',
    'red',
    'orange',
    'yellow',
    'green',
    'turquoise',
    'blue',
    'lilac',
    'pink',
    'white',
    'gray',
    'black',
    'brown',
  ],
  order:["popular", "latest"]
};
