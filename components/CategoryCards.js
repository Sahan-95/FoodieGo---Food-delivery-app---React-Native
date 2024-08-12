import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { urlFor } from "../sanity";

const CategoryCards = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative mr-3">
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="h-20 w-20 rounded"
      />
      <Text className="absolute bottom-1 left-1 font-bold text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCards;
