import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";

import { EvilIcons } from "@expo/vector-icons";
import { FlatList, ScrollView } from "react-native-gesture-handler";
export default function SearchScreen({ setData, data }) {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
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
        <Text style={{ fontSize: 24, color: "gray" }}>Recherches</Text>
      </View>
      <View style={styles.container1}>
        <Button
          color="gray"
          title="Trie par"
          onPress={() => {
            navigation.navigate("Price");
          }}
        />
      </View>
      <ScrollView>
        <View style={styles.container2}>
          <FlatList
            data={data.offers}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <View style={styles.container3}>
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
                </View>
              );
            }}
            // keyExtractor={(item) => item._id}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 80,
    backgroundColor: "white",
  },
  container1: {
    // flexDirection: "row",
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "gray",
  },
  container3: {
    height: 380,
    width: 187,
    // borderWidth: 2,
    // borderColor: "#FC8083",
    // width: "100%",
    // marginBottom: 10,
    marginRight: 5,
  },
  text: { borderBottomWidth: 1, borderBottomColor: "gray" },
  compte: {
    // borderWidth: 2,
    // borderColor: "#FC8083",
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: 55,
    width: "100%",
    // borderWidth: 2,
    // borderColor: "#FC8083",
    alignItems: "center",
    marginTop: -50,
  },
  img: {
    height: 25,
    width: 25,
    borderRadius: 10,
    //borderWidth: 2,
    // borderColor: "#FC8083",
    // top: -30,
  },
  img1: {
    height: 230,
    width: "100%",
    borderRadius: 10,
  },
  price: {
    // borderWidth: 2,
    // borderColor: "#FC8083",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  icone: { flexDirection: "row" },
});
