import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function LoginScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  // const [username, setUsername]= useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  console.log("email", email);
  console.log("password", password);
  const handleSubmit = async () => {
    if (email && password) {
      console.log("on passe à la suite");
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          // "http://localhost:3000/user/login",
          {
            email,

            password,
          }
        );

        console.log(response.data);
        if (response.data.token) {
          setToken(response.data.token);
          setId(response.data.id);
          navigation.navigate("Home");
        } else {
          alert("An error occurred");
        }
      } catch (error) {
        alert("catch");
        console.log(Object.keys(error)); // affiche les clés de l'objet error
        console.log(error.response.data.error); // Message du type : This email already has an account.
        console.log(error.response.status); // 400 par exemple

        setErrorMessage(error.response.data.error);
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
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
          <View style={styles.errorView}>
            <Text style={styles.error}>{errorMessage}</Text>
          </View>

          <View style={styles.button}>
            <Button title="Se connecter" color="white" onPress={handleSubmit} />
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
      </KeyboardAwareScrollView>
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
  error: {
    fontSize: 15,
    color: "red",
    marginLeft: 50,
  },
  errorView: {
    height: 30,
    backgroundColor: "white",
    width: 300,
    marginTop: 60,
    marginLeft: 60,
  },
});
