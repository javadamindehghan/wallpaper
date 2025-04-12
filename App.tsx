/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import React from 'react';

import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import WelcomeScreen from './screens/WelcomeScrenn';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ImageScreen from './screens/ImageScreen';
function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider >
       
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Home/image" options={{presentation:'modal',animation:'fade'}} component={ImageScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({container: {}});
export default App;
