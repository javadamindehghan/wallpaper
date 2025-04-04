export type categoriesType =
  | 'backgrounds'
  | 'fashion'
  | 'nature'
  | 'science'
  | 'education'
  | 'feelings'
  | 'health'
  | 'people'
  | 'religion'
  | 'places'
  | 'animals'
  | 'industry'
  | 'computer'
  | 'food'
  | 'sports'
  | 'transportation'
  | 'travel'
  | 'buildings'
  | 'business'
  | 'music';
export type orderType = 'popular' | 'latest';
export interface hits {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}
export interface ResponseData {
  total: number;
  totalHits: number;
  hits: hits[];
}
export type colors =
  | 'grayscale'
  | 'transparent'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'turquoise'
  | 'blue'
  | 'lilac'
  | 'pink'
  | 'white'
  | 'gray'
  | 'black'
  | 'brown';
export type order = 'popular' | 'latest';
export type orientation = 'all' | 'horizontal' | 'vertical';
export type image_type = 'all' | 'photo' | 'illustration' | 'vector';
export interface FiltersType {
  colors?: colors;
  order?: order;
  orientation?: orientation;
  image_type?: image_type;
}
