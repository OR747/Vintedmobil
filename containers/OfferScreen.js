import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";

import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
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
      <View style={styles.image}>
        <Image
          source={{
            uri: data.product_image.secure_url,
          }}
          resizeMode="cover"
          style={styles.img1}
        ></Image>
      </View>
      <View style={styles.compte}>
        <View style={styles.image}>
          {data.owner.account.avatar && (
            <Image
              source={{
                uri: data.owner.account.avatar.url,
              }}
              resizeMode="cover"
              style={styles.img}
            ></Image>
          )}
        </View>
        <View style={styles.owner}>
          <Text style={{ color: "black", fontSize: 16 }}>
            {data.owner.account.username}
          </Text>
          <View style={styles.stars}>
            <FontAwesome name="star" size={14} color="#F5CC0B" />
            <FontAwesome name="star" size={14} color="#F5CC0B" />
            <FontAwesome name="star" size={14} color="#F5CC0B" />
            <FontAwesome name="star" size={14} color="#F5CC0B" />
            <FontAwesome name="star" size={14} color="#F5CC0B" />
            <Text style={{ color: "gray", marginLeft: 10, fontSize: 14 }}>
              2 évaluations
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.container1}>
        <Text>{data.product_details[0].MARQUE}</Text>
        <Text>{data.product_details[1].TAILLE}</Text>

        <Text style={{ color: "black", fontSize: 16 }}>
          {data.product_price}€
        </Text>
      </View>

      <TouchableOpacity
        style={styles.description}
        onPress={() => {
          setDisplayAllText(!displayAllText);
        }}
      >
        <Text numberOfLines={displayAllText === false ? 3 : null}>
          {data.product_description}
        </Text>
      </TouchableOpacity>

      <View style={styles.commande}>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            "";
          }}
        >
          {" "}
          <View style={styles.icone}>
            <EvilIcons name="heart" size={24} color="gray" />
            <Text style={{ color: "gray" }}> 2</Text>
          </View>
          <Text>Favoris</Text>
        </TouchableOpacity> */}
        <View style={styles.button1}>
          <Button
            title="Envoyer un message"
            color="gray"
            onPress={() => {
              "";
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Acheter"
            color="white"
            onPress={() => {
              "";
            }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 100,
  },
  compte: {
    borderWidth: 2,
    borderColor: "#FC8083",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  owner: { marginLeft: 15 },
  stars: { flexDirection: "row" },
  img: {
    height: 55,
    width: 55,
    borderRadius: 50,
    //borderWidth: 2,
    // borderColor: "#FC8083",
    // top: -30,
  },
  img1: {
    height: 230,
    width: "100%",
  },
  container1: { borderWidth: 2, borderColor: "#FC8083" },
  description: { borderWidth: 2, borderColor: "#FC8083" },
  button: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#29b6be",
    height: 55,
    borderRadius: 4,
    backgroundColor: "#29b6be",
  },
  button1: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#29b6be",
    height: 55,
    borderRadius: 4,
    backgroundColor: "white",
  },
});
