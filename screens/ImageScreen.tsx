import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import RNFS from 'react-native-fs';
import {
  ArrowDownTrayIcon,
  PresentationChartBarIcon,
  XMarkIcon,
} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {hits} from '../type';
import {BlurView} from '@react-native-community/blur';
import { Share } from 'react-native';
const {height, width} = Dimensions.get('window');
export default function ImageScreen({route}: {route: {params: hits}}) {
  const navigation = useNavigation();
  const {webformatURL, imageWidth, imageHeight,} = route.params;
  const shareContent = async () => {
    try {
      const result = await Share.share({
        message: '   اشتراک  تصویر ',
         url: webformatURL
        
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // کاربر یک فعالیت خاص را انتخاب کرده است
        } else {
          // اشتراک‌گذاری موفقیت‌آمیز بود
        }
      } else if (result.action === Share.dismissedAction) {
        // کاربر پنجره اشتراک‌گذاری را بسته است
      }
    } catch (error:any) {
     Alert.alert(error)
    }
  }
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
    const imageUrl = uri; // آدرس عکس
    const fileName = imageUrl.split('/').pop();
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    try {
      const result = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: downloadDest,
      }).promise;

      if (result.statusCode === 200) {
        Alert.alert('دانلود موفقیت‌آمیز بود!');
      } else {
        Alert.alert('خطا در دانلود.');
      }
    } catch (error) {
      Alert.alert('خطا: ' + error);
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
              <ArrowDownTrayIcon size={24} color="white" />
            </TouchableOpacity>
         
       
            <TouchableOpacity
             className='mx-4  p-2 bg-gray-500 rounded-2xl'
              onPress={() => {
                shareContent()
              }}>
              <PresentationChartBarIcon size={24} color="white" />
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
