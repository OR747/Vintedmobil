import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
} from "react-native";
import axios from "axios";

export default function OfferScreen() {
  const { params } = useRoute();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [displayAllText, setDisplayAllText] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers${params.id}`
      );
      console.log(response.data);
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
            <View>
              <View style={styles.image}>
                <Image
                  source={{
                    uri: item.product_image.secure_url,
                  }}
                  resizeMode="cover"
                  style={styles.img1}
                ></Image>
              </View>
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

              <View style={styles.container1}>
                <Text>{item.product_details[0].MARQUE}</Text>
                <Text>{item.product_details[1].TAILLE}</Text>
              </View>
              <View>
                <Text style={{ color: "black", fontSize: 16 }}>
                  {item.product_price}€
                </Text>
              </View>
            </View>
          );
        }}
      />

      {/* <TouchableOpacity
        onPress={() => {
          setDisplayAllText(!displayAllText);
        }}
      >
        <Text
          numberOfLines={displayAllText === false ? 3 : null}
          style={styles.descirption}
        >
          {item.product_description}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15 },
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
