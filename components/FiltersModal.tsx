import React, {useCallback, useMemo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TextInput,
} from 'react-native';

import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import FilterView from './FilterView';
import {FiltersType} from '../type';
import {ScrollView} from 'react-native-gesture-handler';
export default function FiltersModal({
  bottomSheetModalRef,
}: {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
}) {
  const {width, height} = Dimensions.get('window');
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      height:.9* height,
     
     
    },
  });

  // renders
  return (
    <BottomSheetModal
      enablePanDownToClose={true}
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}>
      <BottomSheetView style={styles.contentContainer}>
        <View className="gap-4 py-2 px-4 w-full  ">
          <Text
            className="font-semibold text-neutral-800 mb-1"
            style={{fontSize: 0.04 * height}}>
            Filter
          </Text>
          <ScrollView>
            <FilterView />
          </ScrollView>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
