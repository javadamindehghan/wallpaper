import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {hits} from '../type';
import { useNavigation } from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
export default function ImageCard({
  item,
  index,
  columns,
}: {
  item: hits;
  index: number;
  columns: number;
}) {
  const navigation = useNavigation();
  const getImageHeight = () => {
    const {imageHeight, imageWidth} = item;
    if (imageHeight > imageWidth) {
      return 300;
    } else if (imageHeight < imageWidth) {
      return 250;
    } else {
      return 200;
    }
  };
  const styles = StyleSheet.create({
    image: {
      height: getImageHeight(),
      width: '100%',
    },
    imageWraper:{
        overflow:'hidden',
        marginBottom:.02*width,
        marginRight:.02*width,
        borderRadius:30,
        borderCurve:'continuous'

    }
  });
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate('Home/image',item)
    }} style={styles.imageWraper}>
      <Image style={styles.image} source={{uri: item.webformatURL}} />
    </TouchableOpacity>
  );
 
}
