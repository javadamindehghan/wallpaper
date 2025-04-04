import axios from 'axios';
import {ApiKey} from '../constants/cetegories';
const BaseUrl = `https://pixabay.com/api`;
export const Axios = axios.create({
  baseURL: BaseUrl,
  params: {key: ApiKey},
});
