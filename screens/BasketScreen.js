import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  selectBasketItems,
  removeFromBasket,
  selectBasketTotal,
} from "../features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const basketTotal = useSelector(selectBasketTotal);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();

  const [groupedItemsInBasket, setgroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setgroupedItemsInBasket(groupedItems);
  }, [items]);

  const deliveryFee = 140;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-gray-100 flex-1">
        <View className="bg-white border-b border-gray-100 shadow-sm">
          <View>
            <Text className="text-lg font-extrabold text-center pt-3">
              Basket
            </Text>
            <Text className="text-center text-gray-600 pb-2">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" size={40} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-3">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-9 w-9 bg-green-50 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 45 - 50 minutes</Text>
          <TouchableOpacity>
            <Text className="text-[#04645D]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-x-2 divide-y-2 divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="font-bold text-lg">{items.length} x</Text>

              {/* To get a one of them details and show */}

              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">LKR {items[0]?.price}</Text>

              <TouchableOpacity>
                <Text
                  className="text-[#04645D] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* total and place the order */}
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Sub Total</Text>
            <Text className="text-gray-500">LKR {basketTotal}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-500">Delivery Fee</Text>
            <Text className="text-gray-500">LKR {deliveryFee}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-700 font-bold"> Order Total</Text>
            <Text className="text-gray-700 font-bold">
              LKR {basketTotal + deliveryFee}
            </Text>
          </View>

          {/* Place order button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            className="bg-[#00CCBB] p-4 rounded-lg"
          >
            <Text className="text-center text-white font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>

        <></>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
