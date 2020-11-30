import React, { useState, useEffect } from "react";
//import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-community/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//import { StyleSheet, Text, View } from "react-native";

//Importation des containers

// import Home from "./containers/Home"
import HomeLoginScreen from "./containers/HomeLoginScreen";
import LoginScreen from "./containers/LoginScreen";
import SignUpScreen from "./containers/SignUpScreen";
// import OfferScreen from "./containers/OfferScreen"
// import SearchScreen from "./containers/SearchScreen"
// import SortScreen from "./containers/SortScreen"
// import PublishScreen from "./containers/PublishScreen"
// import ProfilScreen from "./containers/ProfilScreen"

//StackNavigator and BottomNavigator

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  // Ascyncstorage avec le Token et l'Id

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setId = async (id) => {
    if (id) {
      AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("UserId");
    }
    setUserId(id);
  };

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      setUserId(userId);
      setUserToken(userToken);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? (
        <Stack.Navigator>
          <Stack.Screen name="HomeLogin">
            {() => <HomeLoginScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>

          <Stack.Screen
            name="SignUp"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignUpScreen setToken={setToken} />}
          </Stack.Screen>

          <Stack.Screen name="Login">
            {() => <LoginScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator></Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
