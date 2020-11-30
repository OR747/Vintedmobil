import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LoginScreen({ setToken }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.input1}>
          <TextInput
            placeholder="Identifiant ou adresse email"
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

        <View style={styles.button}>
          <Button title="Se connecter" color="white" onPress={""} />
        </View>
        <View style={styles.touch}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.touchstyle}>
              Tu as oublié ton mot de passe?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    //justifyContent: "center",
    paddingHorizontal: 15,
  },

  input1: {
    marginTop: 120,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
  },
  input2: {
    marginTop: 50,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#29b6be",
    width: "100%",
    height: 45,
    marginTop: 90,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#29b6be",
  },
  touch: { marginTop: 30, alignItems: "center" },
  touchstyle: { color: "#29b6be" },
});
