import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import SanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setfeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Fetch api data from sanity.io
  useEffect(() => {
    SanityClient.fetch(
      `*[_type == "featured"]{
        ...,
        restaurants[]->{
          ...,
          dishes[]-> {
            ...,
          }
        }
      }`
    ).then((data) => {
      setfeaturedCategories(data);
    });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-2">
      {/* Header */}
      <View className="flex-row pb-3 mx-2 items-center space-x-3">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-9 w-9 bg-green-50 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="text-gray-500 font-bold text-xs">Delivery Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search bar */}
      <View className="flex-row space-x-3 mx-3 pb-2 items-end">
        <View className="flex-row bg-gray-200 flex-1 space-x-2 p-2">
          <MagnifyingGlassIcon />
          <TextInput
            placeholder="Restaurants & cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon size={25} color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured rows */}
        {featuredCategories.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
