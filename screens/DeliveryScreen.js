import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white">Order Help</Text>
        </View>

        <View className="bg-white rounded-md shadow-md my-2 mx-5 p-5 z-50">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text text-gray-400">
                Estimated Arrival
              </Text>
              <Text className="font-bold text-4xl">45-55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://links.papareact.com/fls",
              }}
              className="h-20 w-20"
            />
          </View>

          <Progress.Bar size={30} color="#04645D" indeterminate={true} />

          <Text className="text-gray-500 mt-2">
            Your order at {restaurant.title} is being prepared.
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="z-0 flex-1 -mt-10"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#A40A27"
        />
      </MapView>

      {/* Rider details */}
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          {(restaurant.title == "KFC" || restaurant.title == "Burger King")? (
            <Text className="text-lg">Sarath Kumara</Text>
          ) : (
            <Text className="text-lg">G.N.Karunarathne</Text>
          )}

          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="text-[#04645D] font-bold mr-5 text-lg">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
