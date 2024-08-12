import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCards = ({
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
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        // We have to give a key value which we used in App.js and
        // pass the parameters(props) which we want in that particular screen
        navigation.navigate("Restaurant", {
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
        });
      }}
      className="bg-white mr-3 shadow-md"
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="h-36 w-64 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold pt-2 text-lg">{title}</Text>
        <View className="items-center space-x-1 flex-row">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-gray-500 text-xs">
            <Text className="text-green-700">{rating}</Text> . {genre}
          </Text>
        </View>
        <View className="pt-1 flex-row space-x-1 items-center">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-gray-500 text-xs">Near by . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCards;
