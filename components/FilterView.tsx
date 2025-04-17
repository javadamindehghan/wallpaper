import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {FiltersType} from '../type';

import {useStore} from '../store/Store';
import {Filters} from '../constants/cetegories';
import Test from './Test';
import {FlatList} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
const FilterView = () => {
  const [CurrentFilters, setCurrentFilters] = useState<FiltersType>({
    orientation: 'all',
    order: 'popular',
    image_type: 'all',
  });
  const {inc, count} = useStore();
  return (
    <>
     <Test  />
  
      
    </>
  );
};

export default FilterView;
