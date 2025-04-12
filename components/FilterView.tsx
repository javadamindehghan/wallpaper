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
const {height, width} = Dimensions.get('window');
const FilterView = () => {
  const [CurrentFilters, setCurrentFilters] = useState<FiltersType>({
    orientation: 'all',
    order: 'popular',
    image_type: 'all',
  });
  const {inc,count} = useStore();
  return (
    <>
      <View className="mb-2">
        <Text className="font-bold text-2xl mb-2">Order</Text>
        <View className="  flex-row ">
          {Filters.order.map((Order, index) => {
            return (
              <TouchableOpacity
              key={index}
                onPress={() => {
                  setCurrentFilters({...CurrentFilters, order: `${Order}`});
                }}>
                <Text style={{}} className="mr-6 p-4 bg-slate-300 rounded-full">
                  {Order}
                </Text>
              </TouchableOpacity>
            );
          })}
         
        </View>
      </View>
      <View className="mb-2">
        <Text className="font-bold text-2xl mb-2">orientation</Text>
        <View className="  flex-row ">
        {Filters.orientation.map((item, index) => {
            return (
              <TouchableOpacity
              key={index}
                onPress={() => {
                  setCurrentFilters({...CurrentFilters, orientation: `${item}`});
                }}>
                <Text  className="mr-6 p-4 bg-slate-300 rounded-full">
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View className="mb-2">
        <Text className="font-bold text-2xl mb-2">Type</Text>
        <View className="  flex-row ">
        {Filters.type.map((item, index) => {
            return (
              <TouchableOpacity
              key={index}
                onPress={() => {
                  setCurrentFilters({...CurrentFilters, image_type: `${item}`});
                }}>
                <Text style={{}} className="mr-6 p-4 bg-slate-300 rounded-full">
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View className="mb-2">
        <Text className="font-bold text-2xl mb-2">Colors</Text>
        <View className="  flex-wrap flex-row  ">
          <TouchableOpacity
            onPress={() => {
              setCurrentFilters({...CurrentFilters, colors: 'red'});
            }}
            className=" mb-2  mr-2 p-8 bg-red-600 rounded-full"></TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentFilters({...CurrentFilters, colors: 'orange'});
            }}
            className=" mb-2   mr-2 p-8 bg-orange-400 rounded-full"></TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentFilters({...CurrentFilters, colors: 'yellow'});
            }}
            className=" mb-2   mr-2 p-8 bg-yellow-300 rounded-full"></TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentFilters({...CurrentFilters, colors: 'green'});
            }}
            className=" mb-2   mr-2 p-8 bg-green-500 rounded-full"></TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentFilters({...CurrentFilters, colors: 'lilac'});
            }}
            className=" mb-2   mr-2 p-8 bg-blue-300 rounded-full"></TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentFilters({...CurrentFilters, colors: 'blue'});
            }}
            className=" mb-2   mr-2 p-8 bg-blue-700 rounded-full"></TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentFilters({...CurrentFilters, colors: 'pink'});
            }}
            className=" mb-2   mr-2 p-8 bg-pink-400 rounded-full"></TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentFilters({...CurrentFilters, colors: 'gray'});
            }}
            className=" mb-2   mr-2 p-8 bg-slate-300 rounded-full"></TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity></TouchableOpacity>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </View>
      <View className="flex-row justify-between mt-2">
        <TouchableOpacity
          onPress={() =>
            setCurrentFilters({
              orientation: 'all',
              order: 'popular',
              image_type: 'all',
            })
          }
          style={{width: 0.4 * width}}
          className=" rounded-3xl p-4 items-center bg-slate-400 border-zinc-700 border-spacing-1">
          <Text>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            inc(CurrentFilters);
          }}
          style={{width: 0.4 * width}}
          className="text-red-500 rounded-3xl p-4 items-center bg-gray-700 border-zinc-700 border-spacing-1 ">
          <Text className="text-slate-400">Apply</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FilterView;
