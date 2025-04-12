import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
 
} from 'react-native';
import * as Progress from 'react-native-progress';
import React, { useState } from 'react';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {
  ArrowDownTrayIcon,
  PresentationChartBarIcon,
  XMarkIcon,
} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {hits} from '../type';
import {BlurView} from '@react-native-community/blur';
import ShareIcon from '../Icon/IconShare';
import IconShare from '../Icon/IconShare';

const {height, width} = Dimensions.get('window');
export default function ImageScreen({route}: {route: {params: hits}}) {
  const navigation = useNavigation();
  const {webformatURL, imageWidth, imageHeight ,imageURL,userImageURL ,id} = route.params;
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const shareImage = async (imagePath:string) => {
    const shareOptions = {
      title: 'Share Image',
      url: imagePath, // آدرس فایل
      type: 'image/jpeg', // نوع فایل
    };
  
    try {
      await Share.open(shareOptions);
      Alert.alert('عکس با موفقیت به اشتراک گذاشته شد!');
    } catch (error) {
      Alert.alert('خطا در به اشتراک‌گذاری: ' + error);
    }
  };
  const GetSize = () => {
    const acceptRatio = imageWidth / imageHeight;
    const maxW = 0.92 * width;
    let calculaateH = maxW / acceptRatio;
    let calculaateW = maxW;
    if (acceptRatio < 1) {
      calculaateW = calculaateH * acceptRatio;
    }
    return {height: calculaateH, width: calculaateW};
  };

  const downloadImage = async (uri:string) => {
    setIsLoading(true)
    console.log(imageURL);
    console.log(userImageURL);
    
    const imageUrl = uri; // آدرس عکس
    const fileName = imageUrl.split('/').pop();
    const downloadDest = `${RNFS.PicturesDirectoryPath}/${fileName}.jpg`;
    try {
      const result = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: downloadDest,
      }).promise;

      if (result.statusCode === 200) {
        Alert.alert('دانلود موفقیت‌آمیز بود!');
        setIsLoading(false)
      } else {
        Alert.alert('اتصال خود به اینترنت و فیلتر شکن را چک کنید');
        setIsLoading(false)
      }
    } catch (error) {
      Alert.alert('اتصال خود به اینترنت و فیلتر شکن را چک کنید'+error);
      setIsLoading(false)
    }
  };

  return (
    <>
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={2}
        reducedTransparencyFallbackColor="white"
      />

      <View className="flex-1 justify-center items-center ">
        <Image source={{uri: webformatURL}} style={GetSize()} />
        <View className='flex-row justify-center mt-8'>
          
            <TouchableOpacity
            className='mx-4  p-2 bg-gray-500 rounded-2xl'
              onPress={() => {
                navigation.goBack();
              }}>
              <XMarkIcon size={24} color="white" />
            </TouchableOpacity>
      
        
            <TouchableOpacity
             className='mx-4  p-2 bg-gray-500 rounded-2xl'
              onPress={() => {
                downloadImage(webformatURL)
              }}>
              {isLoading ? <Progress.CircleSnail color={['red', 'green', 'blue']} /> :<ArrowDownTrayIcon size={24} color="white" /> }
             
            </TouchableOpacity>
         
       
            <TouchableOpacity
             className='mx-4  p-2 bg-gray-500 rounded-2xl'
              onPress={() => {
                shareImage(webformatURL)
              }}>
           <IconShare/>
            </TouchableOpacity>
      
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5,
  },
});
