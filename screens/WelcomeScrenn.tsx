import {
  View,
  StatusBar,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {FadeInDown} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
export default function WelcomeScrenn() {
  const navigation=useNavigation()
  return (
    <View className="flex-1 justify-center items-center">
      <StatusBar />
      <Image
        source={require('../assets/image/welcome.png')}
        resizeMode="cover"
        style={{height: height, width: width}}
        className="absolute"
      />
      <Animated.View entering={FadeInDown.duration(1000)}
      className='absolute w-full bottom-0 flex-1 items-center justify-center'
      >
        <LinearGradient
        className=''
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 0.8}}
          style={{
            width: width,
            height: 0.5 * height,
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            gap: 14,
            paddingTop: 150,
          }}
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']}
          locations={[0, 0.5]}>
          {/* content */}

          <View className='flex-1 items-center justify-center '>
            <Animated.Text
              entering={FadeInDown.delay(400).springify()}
              style={{fontSize: 0.07 * height}}
              className="text-neutral-900 font-bold">
              Pixels
            </Animated.Text>
            <Animated.Text
              entering={FadeInDown.delay(600).springify()}
              style={{fontSize: 0.02 * height}}
              className="mb-10 font-semibold">
              Every Pixels Tells a Story
            </Animated.Text>

            <Animated.View
            entering={FadeInDown.delay(700).springify()}
            
              style={{
                marginTop: 20,
                borderRadius: 30,
                padding: 16,
                paddingHorizontal: 90,
                backgroundColor: 'gray',
              }}>
              <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 0.03 * height,
                    letterSpacing: 1,
                    color: 'white',
                  }}>
                  start Explore
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
   
  );
}
