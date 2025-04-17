import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useForm, SubmitHandler} from 'react-hook-form';
import {Filters} from '../constants/cetegories';
import {useStore} from '../store/Store';
import {colors, FiltersType, image_type, order, orientation} from '../type';

const {height, width} = Dimensions.get('window');

interface FormValues {
  Order: string;
  Orientation: string;
  Type: string;
  Color: string;
}

export default function Test() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<FiltersType>();

  const [CurrentFilters, setCurrentFilters] = useState<FiltersType>({
    orientation: 'all',
    order: 'popular',
    image_type: 'all',
  });

  const {inc, count} = useStore();
  const [selectedOrder, setSelectedOrder] = useState<order>(
    count.order || 'latest',
  );
  const [selectedOrientation, setSelectedOrientation] = useState<orientation>(
    count.orientation || 'all',
  );
  const [selectedType, setSelectedType] = useState<image_type>(
    count.image_type || 'all',
  );
  const [selectedColor, setSelectedColor] = useState<colors>(
    count.colors || '',
  );

  const onSubmit: SubmitHandler<FiltersType> = data => {
    console.log(data);
    inc(data);
  };

  useEffect(() => {
    setValue('order', selectedOrder);
    setValue('orientation', selectedOrientation);
    setValue('image_type', selectedType);
    setValue('colors', selectedColor);
  }, [selectedOrder, selectedOrientation, selectedType, selectedColor]);

  return (
    <View>
      <View className="mb-2">
        <Text className="font-bold text-2xl">Order</Text>
        <View className="flex-row ">
          {Filters.order.map((item, index) => {
            return (
              <TouchableOpacity
                style={[selectedOrder === item && styles.selectedRadio]}
                className="mb-2 justify-center mr-2 p-2 bg-slate-300 rounded-full"
                key={index}
                onPress={() => {
                  setSelectedOrder(item);
                }}>
                <Text className="p-4 bg-slate-300 rounded-full">{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View className="mb-2">
        <Text className="font-bold text-2xl">Orientation</Text>
        <View className="flex-row ">
          {Filters.orientation.map((item, index) => {
            return (
              <TouchableOpacity
                style={[selectedOrientation === item && styles.selectedRadio]}
                className="mb-2 flex-row mr-2 p-2 bg-slate-300 rounded-full"
                key={index}
                onPress={() => {
                  setSelectedOrientation(item);
                }}>
                <Text className="p-4 bg-slate-300 rounded-full">{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View className="mb-2">
        <Text className="font-bold text-2xl">Type</Text>
        <View className="flex-row">
          {Filters.type.map((item, index) => {
            return (
              <TouchableOpacity
                style={[selectedType === item && styles.selectedRadio]}
                className="mb-2 flex-wrap mr-2 bg-slate-300 rounded-full"
                key={index}
                onPress={() => {
                  setSelectedType(item);
                }}>
                <Text className="p-4 bg-slate-300 rounded-full">{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Text style={styles.label}>Color</Text>
      <View style={styles.radioContainer} className="flex-row flex-wrap">
        {Filters.colors.map((item, index) => {
          return (
            <TouchableOpacity
              className="w-8 h-8 p-4 m-2 rounded-2xl"
              style={[
                styles.radioText,
                selectedColor === item && styles.selectedRadio,
                {backgroundColor: item},
              ]}
              key={index}
              onPress={() => {
                setSelectedColor(item);
              }}>
              <Text style={[styles.radioText]}></Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View className="flex-row justify-between mt-2">
        <TouchableOpacity
          onPress={() => {
            setSelectedOrientation('all');
            setSelectedColor('')
            setSelectedOrder('popular')
            setSelectedType('all')
          }}
          style={{width: 0.4 * width}}
          className="rounded-3xl p-4 items-center bg-slate-400 border-zinc-700 border-spacing-1">
          <Text>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{width: 0.4 * width}}
          className="text-red-500 rounded-3xl p-4 items-center bg-gray-700 border-zinc-700 border-spacing-1 ">
          <Text className="text-slate-400">Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioText: {
    marginRight: 20,
  },
  selectedRadio: {
    fontWeight: 'bold',
    borderColor: 'blue',
    borderWidth: 2,
    boxShadow: '5px 2px 4px 5px gray',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
