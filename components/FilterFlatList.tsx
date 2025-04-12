import { View, Text ,FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useStore } from '../store/Store'
import {
  CheckBadgeIcon
  } from 'react-native-heroicons/solid';
export default function FilterFlatList() {
    const {count,inc}=useStore()
  return (
    <View>
     <FlatList horizontal data={[1,2]} renderItem={()=>{
        return(
              <View className="mb-2">
                    <View className="  flex-row ">
                    
                     
                          <TouchableOpacity
                       
                            onPress={() => {
                             inc({...count,order:'popular'})
                            }}>
                            <Text className="mr-6 p-4 bg-slate-300 rounded-full">
                           {2}
                            </Text>
                          </TouchableOpacity>
                     
                   
                     
                    </View>
                  </View>
        )
     }}/>
    </View>
   
  )
}