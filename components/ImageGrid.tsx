import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {hits} from '../type';
import {MasonryFlashList} from '@shopify/flash-list';
import ImageCard from './ImageCard';
const {height,width}=Dimensions.get('window')
export default function ImageGrid({image}: {image: hits[]}) {
    const getcolumns=()=>{
        if (width>=1024) {
            return 4
        }
        else if(width>=768){
            return 3
        }else {
            return 2
        }
    }
  return (
    <View style={{paddingHorizontal:.04*width}}>
      <MasonryFlashList
        data={image}
        numColumns={getcolumns()}
        renderItem={({item ,index}) => <ImageCard columns={getcolumns()} item={item} index={index}/>}
        estimatedItemSize={200}
        
      />
    </View>
  );
}
