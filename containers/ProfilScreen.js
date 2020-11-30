import React from "react";
import { Button, Text, View } from "react-native";

export default function ProfilScreen({ setToken }) {
  return (
    <View>
      <Text>Hello!</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
