import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { EvilIcons } from "@expo/vector-icons";
export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
        // "http://localhost:3000/offer",
      );
      // console.log(response.data);

      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    console.log("Rentre dans le useEffect");
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="#29b6be" />
  ) : (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../assets/logoVinted.jpg")}
          resizeMode="cover"
          style={{ height: 45, width: 75 }}
        ></Image>
      </View>

      <View style={styles.text}>
        <Text style={{ fontSize: 24, color: "gray" }}>Annonces</Text>
      </View>
      <FlatList
        style={styles.container0}
        data={data.offers}
        numColumns={2}
        renderItem={({ item }) => {
          // console.log(item);
          return (
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                navigation.navigate("Offer", {
                  id: item._id,
                });
              }}
            >
              <View style={styles.compte}>
                <View style={styles.image}>
                  {item.owner.account.avatar && (
                    <Image
                      source={{
                        uri: item.owner.account.avatar.url,
                      }}
                      resizeMode="cover"
                      style={styles.img}
                    ></Image>
                  )}
                </View>
                <View>
                  <Text style={{ color: "black", fontSize: 20 }}>
                    {item.owner.account.username}
                  </Text>
                </View>
              </View>
              <View style={styles.image}>
                <Image
                  source={{
                    uri: item.product_image.secure_url,
                  }}
                  resizeMode="cover"
                  style={styles.img1}
                ></Image>
              </View>
              <View style={styles.price}>
                <Text style={{ color: "black", fontSize: 20 }}>
                  {item.product_price}€
                </Text>
                <View style={styles.icone}>
                  <EvilIcons name="heart" size={24} color="gray" />
                  <Text style={{ color: "gray" }}> 2</Text>
                </View>
              </View>
              <View style={styles.container2}>
                <Text style={{ color: "gray" }}>
                  {item.product_details[0].MARQUE}
                </Text>
                <Text style={{ color: "gray" }}>
                  {item.product_details[1].TAILLE}
                </Text>
                {/* <Text>{item._id}</Text> */}
              </View>
            </TouchableOpacity>
          );
        }}
        // keyExtractor={(item) => item._id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  // les containers
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 80,
    backgroundColor: "white",
    // borderWidth: 2,
    // borderColor: "#FC8083",
  },
  text: { borderBottomWidth: 1, borderBottomColor: "gray" },
  logo: {
    height: 55,
    width: "100%",
    // borderWidth: 2,
    // borderColor: "#FC8083",
    alignItems: "center",
    marginTop: -50,
  },
  container0: {
    // borderWidth: 2,
    // borderColor: "black",
    // flexDirection: "row",
    // flexWrap: "wrap",
    marginTop: 10,
  },

  compte: {
    // borderWidth: 2,
    // borderColor: "#FC8083",
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  // container2: { borderWidth: 2, borderColor: "#FC8083" },

  //touche
  touchableOpacity: {
    height: 380,
    width: 187,
    // borderWidth: 2,
    // borderColor: "#FC8083",
    // width: "100%",
    marginBottom: 10,
    marginRight: 5,
  },

  //price
  price: {
    // borderWidth: 2,
    // borderColor: "#FC8083",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  //icones

  icone: { flexDirection: "row" },

  //les images,

  img: {
    height: 25,
    width: 25,
    borderRadius: 10,
    // borderWidth: 2,
    // borderColor: "#FC8083",
    // top: -30,
  },
  img1: {
    height: 230,
    width: "100%",
    borderRadius: 10,
  },
});
