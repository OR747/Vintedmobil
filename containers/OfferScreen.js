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
  ScrollView,
} from "react-native";

import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
export default function OfferScreen({ route }) {
  const { params } = useRoute();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);
  const [isClicked, setisClicked] = useState(false);
  //const id = route.params.id;
  const handlePress = () => {
    if (isClicked) {
      setisClicked(false);
    } else {
      setisClicked(true);
    }
  };
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
      <View style={styles.logo}>
        <Image
          source={require("../assets/logoVinted.jpg")}
          resizeMode="cover"
          style={{ height: 45, width: 75 }}
        ></Image>
      </View>

      <View style={styles.text}>
        <Text style={{ fontSize: 24, color: "gray" }}>
          Détails de l'annonce
        </Text>
      </View>
      <ScrollView>
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
          <Text style={{ color: "gray", marginTop: 5 }}>
            {data.product_details[1].TAILLE}
          </Text>

          <Text style={{ color: "black", fontSize: 16, marginTop: 5 }}>
            {data.product_price}€
          </Text>
        </View>

        {/* <TouchableOpacity
          style={styles.description}
          onPress={() => {
            setDisplayAllText(!displayAllText);
          }}
        >
          <Text style={{ color: "gray", marginLeft: -4, fontSize: 16 }}>
            {" "}
            Présentation de l'article
          </Text>
          <Text
            numberOfLines={displayAllText === false ? 3 : null}
            style={{ marginTop: 5 }}
          >
            {data.product_description}
          </Text>
        </TouchableOpacity> */}

        <View style={styles.description}>
          <Text style={{ color: "gray", fontSize: 16, marginBottom: 5 }}>
            Présentation de l'article
          </Text>
          {isClicked === false ? (
            <>
              <Text numberOfLines={3}>{data.product_description}</Text>
              <TouchableOpacity style={styles.showButton} onPress={handlePress}>
                <Text style={styles.show}>Show more</Text>
                <AntDesign name="caretdown" size={14} color="gray" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text numberOfLines={20}>{data.product_description}</Text>

              <TouchableOpacity style={styles.showButton} onPress={handlePress}>
                <Text style={styles.show}>Show less</Text>
                <AntDesign name="caretup" size={14} color="gray" />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.bloc2}>
          <View style={styles.commande}>
            <View style={styles.commandtouch}>
              <TouchableOpacity
                style={styles.touch}
                onPress={() => {
                  "";
                }}
              >
                <View style={styles.icone}>
                  <EvilIcons name="heart" size={24} color="gray" />
                  <Text style={{ color: "gray" }}> Favoris</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touch}
                onPress={() => {
                  "";
                }}
              >
                <View style={styles.icone}>
                  <Entypo name="share" size={24} color="gray" />
                  <Text style={{ color: "gray" }}> Partager</Text>
                </View>
              </TouchableOpacity>
            </View>
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
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  //Header

  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
    overflow: "hidden",
  },
  text: { borderBottomWidth: 1, borderBottomColor: "gray" },
  logo: {
    height: 55,
    width: "100%",
    // borderWidth: 2,
    // borderColor: "#FC8083",
    alignItems: "center",
    marginTop: 30,
  },

  //image de l'offre

  image: { marginTop: 5 },
  img1: {
    height: 430,
    width: "100%",
    borderRadius: 10,
  },

  //compte utilisateur

  compte: {
    // borderWidth: 2,
    // borderColor: "#FC8083",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    paddingTop: 10,
    paddingBottom: 10,
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

  // details de l'offre

  container1: {
    // borderWidth: 2,
    // borderColor: "#FC8083",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    paddingTop: 10,
    paddingBottom: 10,
  },

  // description de l'article

  description: {
    // borderWidth: 2,
    // borderColor: "#FC8083",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },

  //bloc2

  // bloc2: { borderWidth: 2, borderColor: "#FC8083" },

  icone: { flexDirection: "row", alignItems: "center" },
  button: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#29b6be",
    height: 55,
    borderRadius: 4,
    backgroundColor: "#29b6be",
  },
  button1: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#29b6be",
    height: 55,
    borderRadius: 4,
    backgroundColor: "white",
  },
  commandtouch: {
    flexDirection: "row",
    // borderWidth: 2,
    // borderColor: "#FC8083",
  },
  touch: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "gray",

    height: 35,
    borderRadius: 4,
    backgroundColor: "white",
    width: "50%",
  },

  showButton: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingTop: 12,
  },

  show: {
    color: "gray",
    paddingRight: 5,
  },
});
