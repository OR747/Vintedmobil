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
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
          />
        </View>

        <Button
          title="Login"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    //justifyContent: "center",
  },

  input1: {
    marginTop: 120,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    marginLeft: 30,
    marginRight: 30,
  },
  input2: {
    marginTop: 50,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    marginLeft: 30,
    marginRight: 30,
    flexWrap: "wrap",
  },
});
