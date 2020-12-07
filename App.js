import React, { useState, useEffect } from "react";
//import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-community/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

// Importation des icônes
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//import { StyleSheet, Text, View } from "react-native";

//Importation des components

import Logo from "./components/Logo";

//Importation des containers

import HomeScreen from "./containers/HomeScreen";
import HomeLoginScreen from "./containers/HomeLoginScreen";
import LoginScreen from "./containers/LoginScreen";
import SignUpScreen from "./containers/SignUpScreen";
import OfferScreen from "./containers/OfferScreen";
import SearchScreen from "./containers/SearchScreen";
import SortScreen from "./containers/SortScreen";
import PublishScreen from "./containers/PublishScreen";
import ProfilScreen from "./containers/ProfilScreen";
import PriceScreen from "./containers/PriceScreen";

//StackNavigator and BottomNavigator

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  // Ascyncstorage avec le Token et l'Id

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState({});
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
          <Stack.Screen
            name="HomeLogin"
            options={{
              headerStyle: { backgroundColor: "white" },
              headerTitle: () => <Logo />,
            }}
          >
            {() => <HomeLoginScreen />}
          </Stack.Screen>

          <Stack.Screen
            name="SignUp"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignUpScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>

          <Stack.Screen
            name="Login"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <LoginScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "#29b6be",
                  inactiveTintColor: "gray",
                }}
              >
                {/*Home*/}

                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          header: () => null,
                          animationEnabled: false,
                        }}
                      >
                        {(props) => <HomeScreen {...props} />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Offer"
                        options={{
                          header: () => null,
                          animationEnabled: false,
                        }}
                      >
                        {(props) => <OfferScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                {/*Recherche*/}

                <Tab.Screen
                  name="Recherche"
                  options={{
                    headerTitle: () => <Logo />,
                    // permet d'ajouter dans le header le logo
                    tabBarIcon: ({ color, size }) => (
                      <Octicons name="search" size={24} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Recherche"
                        options={{
                          header: () => null,
                          animationEnabled: false,
                        }}
                      >
                        {() => <SearchScreen setData={setData} data={data} />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Price"
                        options={{
                          header: () => null,
                          animationEnabled: false,
                        }}
                      >
                        {() => <PriceScreen setData={setData} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Offer"
                        options={{
                          header: () => null,
                          animationEnabled: false,
                        }}
                      >
                        {(props) => <OfferScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                {/*Vendre*/}

                <Tab.Screen
                  name="Vendre"
                  options={{
                    tabBarLabel: "Vendre",
                    tabBarIcon: ({ color, size }) => (
                      <Feather name="plus-circle" size={24} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Publish"
                        options={{
                          header: () => null,
                          animationEnabled: false,
                        }}
                      >
                        {() => (
                          <PublishScreen
                            setToken={setToken}
                            userToken={userToken}
                            setId={setId}
                            userId={userId}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                {/*Profile*/}

                <Tab.Screen
                  name="Profil"
                  options={{
                    tabBarLabel: "Profil",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="account-outline"
                        size={24}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profil"
                        options={{
                          header: () => null,
                          animationEnabled: false,
                        }}
                      >
                        {() => (
                          <ProfilScreen
                            setToken={setToken}
                            setId={setId}
                            userId={userId}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
