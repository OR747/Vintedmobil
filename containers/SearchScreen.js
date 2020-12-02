import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";

export default function SearchScreen({ setToken }) {
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

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
