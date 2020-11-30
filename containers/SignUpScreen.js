import React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container0}>
      <View>
        <View style={styles.input1}>
          <TextInput
            placeholder="Nom d'utilisateur"
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
        </View>
        <View style={styles.input1}>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
        </View>

        <View style={styles.input2}>
          <TextInput
            placeholder="Mot de passe"
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
          />
        </View>
        <Image
          style={styles.img1}
          source={require("../assets/conditions.png")}
          resizeMode="contain"
        />
        <View style={styles.button}>
          <Button title="S'inscrire" color="white" onPress={""} />
        </View>
        <View style={styles.touch}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.touchstyle}>
              Vous avez peut-être un compte ? Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container0: {
    flex: 1,
    backgroundColor: "white",
    //justifyContent: "center",
    marginTop: 90,
    paddingHorizontal: 15,
    // alignContent: "center",
    // justifyContent: "center",
  },

  input1: {
    marginTop: 50,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
  },
  input2: {
    marginTop: 50,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
    flexWrap: "wrap",
  },
  img1: {
    height: 110,
    width: "100%",
    marginTop: 50,
    // borderWidth: 2,
    // borderColor: "#29b6be",
  },
  button: {
    backgroundColor: "#29b6be",
    width: "100%",
    height: 45,
    marginTop: 50,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#29b6be",
  },
  touch: { marginTop: 30, alignItems: "center" },
  touchstyle: { color: "#29b6be" },
});
