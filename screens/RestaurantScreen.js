import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { ChevronRightIcon, MapPinIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      address,
      genre,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(setRestaurant({
      id,
      imgUrl,
      title,
      rating,
      address,
      genre,
      short_description,
      dishes,
      long,
      lat,
    }));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        {/* image view */}
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="w-full h-56 p-4 bg-gray-300"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-6"
          >
            <ArrowLeftCircleIcon size={40} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        {/* description view */}
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="font-bold text-3xl">{title}</Text>

            <View className="items-center space-x-1 flex-row my-1">
              <StarIcon color="green" opacity={0.5} size={22} />
              <Text className="text-gray-500 text-xs">
                <Text className="text-green-700">{rating}</Text> . {genre}
              </Text>
              <MapPinIcon color="gray" opacity={0.4} size={22} />
              <Text className="text-gray-500 text-xs">Near by . {address}</Text>
            </View>

            <Text className="text-gray-500 mt-3 pb-4">{short_description}</Text>

            <TouchableOpacity className="flex-row border-y border-gray-300 p-2 items-center space-x-2">
              <QuestionMarkCircleIcon size={22} color="gray" opacity={0.5} />
              <Text className="font-bold text-sm flex-1 pl-2">
                Have a food allergy?
              </Text>
              <ChevronRightIcon size={22} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="pb-36">
          <Text className="pt-4 px-4 mb-3 font-bold text-xl ">Menu</Text>

          {/* Dishrows */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
