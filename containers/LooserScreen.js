import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function HomeLoginScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../assets/logoVinted.jpg")}
          resizeMode="cover"
          style={{ height: 45, width: 75 }}
        ></Image>
      </View>
      <View style={styles.text}>
        <Text style={{ fontSize: 24, color: "gray" }}>Dommage!</Text>
      </View>
      <View>
        <Image
          source={require("../assets/homer.jpg")}
          style={styles.img2}
          // resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.touch2}
          onPress={() => {
            navigation.navigate("HomeLogin");
          }}
        >
          <Text style={{ color: "gray", fontSize: 18 }}>
            Revenir à la page d'acceuil
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15, backgroundColor: "white", flex: 1 },

  logo: {
    height: 55,
    width: "100%",
    // borderWidth: 2,
    // borderColor: "#FC8083",
    alignItems: "center",
    marginTop: +40,
  },
  img2: {
    marginTop: 145,
    height: 216,
    width: 373,
    borderRadius: 4,
    backgroundColor: "#29b6be",
  },

  touch2: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "#29b6be",
    height: 55,
    borderRadius: 4,
  },
});
