import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function HomeLoginScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../assets/image.jpg")}
          style={styles.img2}
          // resizeMode="contain"
        />
        <View style={styles.text}>
          <Text style={{ fontSize: 27, color: "#515151" }}>
            Vends sans frais ce que
          </Text>
          <Text style={{ fontSize: 27, color: "#515151" }}>
            tu ne portes plus.
          </Text>
          <Text style={{ fontSize: 27, color: "#515151" }}>
            Rejoignez-nous!
          </Text>
        </View>

        <TouchableOpacity
          style={styles.touch}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: "white" }}>J'ai déjà un compte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touch2}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={{ color: "#29b6be" }}>S'inscrire sur Vinted</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15, backgroundColor: "white", flex: 1 },

  logo: {
    height: 85,
    width: 85,
  },
  img2: {
    marginTop: 145,
    height: 216,
    width: 373,
    borderRadius: 4,
    backgroundColor: "#29b6be",
  },
  touch: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#29b6be",
    height: 55,
    borderRadius: 4,
    backgroundColor: "#29b6be",
  },
  text: {
    marginTop: 50,
    // borderWidth: 2,
    // borderColor: "#29b6be",
    alignItems: "center",
  },
  touch2: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#29b6be",
    height: 55,
    borderRadius: 4,
  },
});
