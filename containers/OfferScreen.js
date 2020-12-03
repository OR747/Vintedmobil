import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function OfferScreen({ route }) {
  const { params } = useRoute();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);
  //const id = route.params.id;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${params.id}`
      );
      //console.log(response.data);
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
        <Text style={{ color: "black", fontSize: 16 }}>
          {data.product_price}€
        </Text>
      </View>
      <View style={styles.container1}>
        <Text>{data.product_details[0].MARQUE}</Text>
        <Text>{data.product_details[1].TAILLE}</Text>
      </View>
      <View style={styles.image}>
        <Image
          source={{
            uri: data.product_image.secure_url,
          }}
          resizeMode="cover"
          style={styles.img1}
        ></Image>
      </View>
      <View style={styles.image}>
        <Image
          source={{
            uri: data.owner.account.avatar.url,
          }}
          resizeMode="cover"
          style={styles.img}
        ></Image>
      </View>
      <View>
        <Text style={{ color: "black", fontSize: 20 }}>
          {data.owner.account.username}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          setDisplayAllText(!displayAllText);
        }}
      >
        <Text
          numberOfLines={displayAllText === false ? 3 : null}
          style={styles.descirption}
        >
          {data.product_description}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 100,
  },
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
