import React, { useState } from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignUpScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  // console.log("email", email);
  // console.log("password", password);
  // console.log("username", username);
  const handleSubmit = async () => {
    if (email && username && password) {
      console.log("on passe à la suite");

      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          // "http://localhost:3000/user/signup",
          {
            email,
            username,
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
    <View style={styles.container0}>
      <View style={styles.logo}>
        <Image
          source={require("../assets/logoVinted.jpg")}
          resizeMode="cover"
          style={{ height: 45, width: 75 }}
        ></Image>
      </View>
      <View style={styles.text}>
        <Text style={{ fontSize: 24, color: "gray" }}>S'inscrire</Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={{ marginTop: 80 }}>
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
            <Button title="S'inscrire" color="white" onPress={handleSubmit} />
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
          <View style={styles.errorView}>
            <Text style={styles.error}>{errorMessage}</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container0: {
    flex: 1,
    backgroundColor: "white",
    //justifyContent: "center",
    // marginTop: 90,
    paddingHorizontal: 15,
    // alignContent: "center",
    // justifyContent: "center",
  },
  logo: {
    height: 55,
    width: "100%",
    // borderWidth: 2,
    // borderColor: "#FC8083",
    alignItems: "center",
    marginTop: +40,
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
