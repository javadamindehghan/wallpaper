import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {debounce} from 'lodash';
import {
  Bars3BottomRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from 'react-native-heroicons/solid';
import Categories from '../components/Categories';
import {ApiCall} from '../api/mageApi';
import {categoriesType, FiltersType, hits} from '../type';
import ImageGrid from '../components/ImageGrid';
import FiltersModal from '../components/FiltersModal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useStore} from '../store/Store';
const {height, width} = Dimensions.get('window');
export default function HomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const Page = useRef<number>(2);
  const {count} = useStore();
  const [SearchValue, SetSearchValue] = useState<string>('');
  const [Image, setImage] = useState<hits[]>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [CurrentFilter, setCurrentFilter] = useState<FiltersType>();
  const [currentCategories, setCurrentCategories] =
    useState<categoriesType>('backgrounds');
  const {top} = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const GetImageCategories = async () => {
    const result = await ApiCall('/', {
      category: currentCategories,
      ...count,
    });
    if (!result) {
      Alert.alert('اتصال به اینترنت وفیلتر شکن را چک کنید');
    } else {
      setImage(result?.hits);
    }
  };
  const HandelChangeCategories = (categories: categoriesType) => {
    setCurrentCategories(categories);
    SetSearchValue('');
    Page.current = 2;
  };
  const GetImageSearch = async () => {
    const result = await ApiCall('/', {q: SearchValue, ...count});
    setImage(result?.hits);
    Page.current = 2;
  };

  const handleChangeFilters = (filter: FiltersType) => {
    setCurrentFilter(filter);
    console.log(CurrentFilter?.colors);
  };
  const nextPage = async () => {
    if (SearchValue) {
      const result = await ApiCall('/', {
        q: SearchValue,
        ...count,
        page: Page.current,
      });
      setImage(c => {
        if (c && result?.hits) {
          return [...c, ...result?.hits];
        }
      });
      if (result?.hits.length > 0) {
        Page.current += 1;
      }
      console.log(result?.hits);
      console.log(Page.current);
    } else {
      const result = await ApiCall('/', {
        category: currentCategories,
        ...count,
        page: Page.current,
      });
      console.log(result?.hits);
      console.log(Page.current);

      setImage(c => {
        if (c && result?.hits) {
          return [...c, ...result?.hits];
        }
      });
      if (result?.hits.length > 0) {
        Page.current += 1;
      }
    }
  };
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;

    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
    if (isAtBottom) {
      console.log('Reached the bottom!');
      nextPage();
    }
  };
  useEffect(() => {
    Page.current = 2;
    if (SearchValue) {
      GetImageSearch();
    } else {
      GetImageCategories();
    }
  }, [count]);
  useEffect(() => {
    GetImageSearch();
  }, [SearchValue]);
  useEffect(() => {
    GetImageCategories();
  }, [currentCategories]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  return (
    <View className="flex-1 gap-3 " style={{paddingTop: paddingTop}}>
      {/* header */}
      <View
        style={{paddingHorizontal: 0.04 * height}}
        className="flex-row justify-between items-center">
        <TouchableOpacity onPress={() => {}}>
          <Text
            className="text-neutral-900 font-semibold"
            style={{fontSize: 0.04 * height}}>
            pixels
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePresentModalPress()}>
          <Bars3BottomRightIcon color="neutral" size={48} />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{gap: 15}}>
        <View
          className=" mt-2 p-4 border-2 rounded-lg flex-row justify-center items-center  p-2 pl-4 border-neutral-500"
          style={{marginHorizontal: 0.04 * width}}>
          <TouchableOpacity>
            <MagnifyingGlassIcon size={24} color="neutral" />
          </TouchableOpacity>
          <TextInput
            value={SearchValue}
            onChangeText={value => {
              SetSearchValue(value);
            }}
            className="text-center font-bold "
            style={{width: 0.7 * width, fontSize: 0.02 * height}}
            placeholder="Search"
          />
          {SearchValue && (
            <TouchableOpacity
              onPress={() => {
                SetSearchValue('');
              }}
              className="p-2 rounded-xl bg-gray-300">
              <XMarkIcon size={24} color="neutral" />
            </TouchableOpacity>
          )}
        </View>
        {/* Categories */}
        <View>
          <Categories
            searchValue={SearchValue}
            HandelChangeCategories={HandelChangeCategories}
          />
        </View>
        {/* image grid */}
        <View>{Image?.length && <ImageGrid image={Image} />}</View>
      </ScrollView>
      {/* Filter */}
   
     
        <FiltersModal bottomSheetModalRef={bottomSheetModalRef} />
      
    </View>
  );
}
