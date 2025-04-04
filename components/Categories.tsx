import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {data, categories} from '../constants/cetegories';
import Animated, {FadeInRight} from 'react-native-reanimated';
import { categoriesType } from '../type';
const {height, width} = Dimensions.get('window');
export default function Categories({HandelChangeCategories ,searchValue}:{searchValue:string;HandelChangeCategories:(categories:categoriesType)=>void}) {
  const [dataCtegories, setDataCategories] = useState<string>('');
  const hndleChangeCategories = (cat: string): void => {
    setDataCategories(cat);
  };
  const RenderItem = ({
    item,
    index,
    isActive,
  }: {
    item: string;
    index: number;
    isActive: boolean;
  }) => {
    useEffect(()=>{if (searchValue ) {
      setDataCategories('')
    }},[searchValue])
    return (
      <Animated.View
        entering={FadeInRight.delay(index * 25)
          .duration(1000)
          .damping(14)}>
        <TouchableOpacity
          onPress={() => {
            setDataCategories(item);
            HandelChangeCategories(item)
            
          }}
          className="rounded-lg bg-orange-300"
          style={{
            ...styles.category,
            backgroundColor: item == dataCtegories ? 'red' : '',
          }}>
          <Text className="font-medium" style={styles.title}>
            {item}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={categories}
      renderItem={({item, index}) => (
        <RenderItem
          item={item}
          index={index}
          isActive={item == dataCtegories}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.FlatListStyle}
      keyExtractor={item => item}
    />
  );
}
const styles = StyleSheet.create({
  FlatListStyle: {gap: 8, paddingHorizontal: width * 0.04},
  category: {
    // backgroundColor: 'white',
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderCurve: 'continuous',
    borderRadius: 20,
  },
  title: {
    fontSize: 0.02 * height,
  },
});
