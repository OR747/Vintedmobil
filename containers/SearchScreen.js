import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";

export default function SearchScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Welcome to Search!</Text>
      <Button
        title="Trier par"
        onPress={() => {
          navigation.navigate("Sort");
        }}
      />

      <Button
        title="Prix"
        onPress={() => {
          navigation.navigate("Price");
        }}
      />
    </View>
  );
}
