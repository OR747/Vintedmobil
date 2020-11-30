import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, View, TouchableOpacity } from "react-native";

export default function HomeLoginScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text>J'ai déjà un compte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>S'inscrire sur Vinted</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
