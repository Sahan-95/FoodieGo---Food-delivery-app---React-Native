import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { ShoppingCartIcon } from "react-native-heroicons/solid";

const BasketIcon = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  if(items.length ===0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Basket");
        }}
        className="bg-[#00CCBB] flex-row p-3 mx-5 items-center space-x-2 rounded-lg"
      >
        <View className="flex-row items-center space-x-1 bg-[#01A296] py-1 px-2">
          <ShoppingCartIcon color="#FFFFFF" size={30} />
          <Text className="text-white font-extrabold">{items.length}</Text>
        </View>
        <Text className="flex-1 text-center font-extrabold text-lg text-white">
          View Basket
        </Text>
        <Text className="font-extrabold text-white text-lg">
          LKR {basketTotal}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
