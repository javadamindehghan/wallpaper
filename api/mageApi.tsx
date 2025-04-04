import {Alert} from 'react-native';
import axios from 'axios';
import {Axios} from './Api';
import {
  categoriesType,
  colors,
  image_type,
  orderType,
  orientation,
  ResponseData,
} from '../type';
export const ApiCall = async (
  uri: string,
  params?: {
    page?: number;
    category?: categoriesType;
    order?: orderType;
    q?: string;
    colors?: colors;
    orientation?: orientation;
    image_type?: image_type;
  },
) => {
  try {
    const response = await Axios.get<ResponseData>(uri, {
      params: {...params, per_page: 24, safesearch: true, editors_choice: true},
    });

    return response.data;
  } catch (error) {
    console.log(error);
   
  }
};
