import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);
  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">
      {/* Animated Video */}
      <Animatable.Image
        source={require("../assets/order_delivery.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-60 w-full"
      />

      {/* Animated Text */}
      <Animatable.Text
        animation="flipInY"
        iterationCount={1}
        className="text-lg text-center font-bold my-10 px-3"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      {/* Progress bar */}
      <Progress.Circle size={40} indeterminate={true} color="black" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
