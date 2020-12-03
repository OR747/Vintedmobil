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

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
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
      <FlatList
        data={data.offers}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                navigation.navigate("Offer", {
                  id: item._id,
                });
              }}
            >
              <View style={styles.image}>
                <Image
                  source={{
                    uri: item.owner.account.avatar.url,
                  }}
                  resizeMode="cover"
                  style={styles.img}
                ></Image>
              </View>
              <View>
                <Text style={{ color: "black", fontSize: 20 }}>
                  {item.owner.account.username}
                </Text>
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
              <View style={styles.container1}>
                <Text>{item.product_details[0].MARQUE}</Text>
                <Text>{item.product_details[1].TAILLE}</Text>
                {/* <Text>{item._id}</Text> */}
              </View>
              <View>
                <Text style={{ color: "black", fontSize: 16 }}>
                  {item.product_price}€
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, paddingTop: 80 },
  img: {
    height: 65,
    width: 65,
    borderRadius: 50,
    //borderWidth: 2,
    // borderColor: "#FC8083",
    // top: -30,
  },
  img1: {
    height: 230,
    width: 450,
  },
});
