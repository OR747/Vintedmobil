import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";

export default function OfferScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Welcome to Offer!</Text>
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate("Home", { userId: 123 });
        }}
      />
    </View>
  );
}
