import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Welcome to VINTED Home!</Text>
      <Button
        title="Go to Offer"
        onPress={() => {
          navigation.navigate("Offer", { userId: 123 });
        }}
      />
    </View>
  );
}
