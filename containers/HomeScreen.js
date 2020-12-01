import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
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
      <View>
        <Text style={{ color: "black", fontSize: 20 }}>
          {data.product_price}€
        </Text>
      </View>
      <FlatList
        data={data}
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
              <View style={styles.container1}>
                <View style={styles.image}>
                  <Image
                    source={{
                      uri: item.product_image.secure_url,
                    }}
                    resizeMode="cover"
                    style={styles.img}
                  ></Image>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  img: {
    height: 85,
    width: 85,
    // borderRadius: 50,
    //borderWidth: 2,
    // borderColor: "#FC8083",
    // top: -30,
  },
});
