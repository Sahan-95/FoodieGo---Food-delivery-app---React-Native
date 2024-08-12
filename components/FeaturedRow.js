import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCards from "./RestaurantCards";
import SanityClient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    SanityClient.fetch(
      `*[_type == "featured" && _id == $id]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
              type-> {
                name
              }
          },
        }[0]`,
      { id }
    ).then((data) => {
      setRestaurant(data.restaurants);
    });
  }, [id]);

  return (
    <View>
      <View className="flex-row mt-4 px-3 justify-between items-center">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs px-3 text-gray-500">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          // Inner scroll view style
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        // overall scroll view style
        className="pt-4"
      >
        {/* Restaurant cards */}
        {restaurant.map((restaurant) => (
          <RestaurantCards
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            address={restaurant.address}
            genre={restaurant.type.name}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
