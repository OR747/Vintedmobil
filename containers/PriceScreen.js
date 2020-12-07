import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { Octicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function PriceScreen({ setData }) {
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [priceDesc, setPriceDesc] = useState(false);
  const [priceAsc, setPriceAsc] = useState(false);
  const [title, setTitle] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    let filters = "";
    let numberOfParams = 0;
    if (priceAsc === true) {
      if (numberOfParams === 0) {
        filters = filters + "?sort=price-asc";
      } else {
        filters = filters + "&sort=price-asc";
      }
      numberOfParams++;
    }
    if (priceDesc === true) {
      if (numberOfParams === 0) {
        filters = filters + "?sort=price-desc";
      } else {
        filters = filters + "&sort=price-desc";
      }
      numberOfParams++;
    }
    if (title) {
      if (numberOfParams === 0) {
        filters = filters + `?title=${title}`;
      } else {
        filters = filters + `&title=${title}`;
      }
      numberOfParams++;
    }
    if (priceMin) {
      if (numberOfParams === 0) {
        filters = filters + `?priceMin=${Number(priceMin)}`;
      } else {
        filters = filters + `&priceMin=${Number(priceMin)}`;
      }
      numberOfParams++;
    }
    if (priceMax) {
      if (numberOfParams === 0) {
        filters = filters + `?priceMax=${Number(priceMax)}`;
      } else {
        filters = filters + `&priceMax=${Number(priceMax)}`;
      }
      numberOfParams++;
    }

    console.log("ok=>", filters);
    try {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers${filters}`
      );
      // console.log(response.data.offers);
      setData(response.data);
      navigation.navigate("Recherche");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container0}>
      <KeyboardAwareScrollView>
        <View style={styles.logo}>
          <Image
            source={require("../assets/logoVinted.jpg")}
            resizeMode="cover"
            style={{ height: 45, width: 75 }}
          ></Image>
        </View>
        <View style={styles.text1}>
          <Text
            style={{
              color: "gray",
              fontSize: 24,
              marginTop: 20,
            }}
          >
            Trie par
          </Text>
        </View>

        <View style={styles.container1}>
          <View style={styles.input2}>
            <Text style={{ color: "gray" }}>Prix minimum</Text>
            <TextInput
              placeholder="€"
              value={priceMin}
              onChangeText={(number) => {
                setPriceMin(number);
              }}
            />
          </View>
          <View style={styles.input2}>
            <Text style={{ color: "gray" }}>Prix maximum</Text>
            <TextInput
              placeholder="€"
              value={priceMax}
              onChangeText={(number) => {
                setPriceMax(number);
              }}
            />
          </View>
        </View>
        <View style={styles.input2}>
          <Text style={{ color: "gray" }}>Titre</Text>
          <TextInput
            placeholder="ex: Zara"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
          />
        </View>
        <View style={styles.container12}>
          <View style={styles.container2}>
            <Text style={{ color: "gray" }}>Prix décroissant</Text>
            <View
              style={priceDesc === true ? styles.checkBox : styles.unchekBox1}
            >
              <TouchableOpacity
                onPress={() => {
                  if (priceDesc === true) {
                    // setPriceAsc(true);
                    setPriceDesc(false);
                  } else {
                    setPriceDesc(true);
                    setPriceAsc(false);
                  }
                  // setPriceDesc(!priceDesc);
                }}
              >
                {priceDesc === true ? (
                  <Octicons name="primitive-dot" size={35} color="#29b6be" />
                ) : (
                  <Octicons name="primitive-dot" size={35} color="white" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container2}>
            <Text style={{ color: "gray" }}>Prix croissant</Text>
            <View
              style={priceAsc === true ? styles.checkBox : styles.unchekBox1}
            >
              <TouchableOpacity
                onPress={() => {
                  if (priceAsc === true) {
                    setPriceAsc(false);
                    // setPriceDesc(true);
                  } else {
                    setPriceAsc(true);
                    setPriceDesc(false);
                  }
                }}
              >
                {priceAsc === true ? (
                  <Octicons name="primitive-dot" size={35} color="#29b6be" />
                ) : (
                  <Octicons name="primitive-dot" size={35} color="white" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.text}>
          {/* <Text style={{ color: "#29b6be" }}>En savoir plus</Text> */}
          <Text style={{ color: "gray" }}>
            En savoir plus sur la façon dont nous trions la pertinences des
            articles dans le fil d'actualité
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Afficher les résultats"
            color="white"
            onPress={() => {
              handleSubmit();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container0: {
    flex: 1,
    backgroundColor: "white",
    //justifyContent: "center",
    // marginTop: 90,
    paddingHorizontal: 15,
  },
  logo: {
    height: 55,
    width: "100%",
    // borderWidth: 2,
    // borderColor: "#FC8083",
    alignItems: "center",
    marginTop: +50,
  },
  text1: { borderBottomWidth: 1, borderBottomColor: "gray" },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 10,
  },
  container12: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 80,
  },
  text: { marginTop: 80, flexDirection: "row" },
  container2: {
    width: "45%",
    // borderWidth: 2,
    // borderColor: "#29b6be",
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkBox: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderColor: "#29b6be",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },

  unchekBox1: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderColor: "#29b6be",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  input2: {
    width: "45%",
    marginTop: 60,
    // borderColor: "#29b6be",
    // borderWidth: 1,
    borderBottomColor: "#29b6be",
    borderBottomWidth: 1,
  },
  button1: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#29b6be",
    height: 55,
    borderRadius: 4,
    // backgroundColor: "#29b6be",
  },
  button: {
    marginTop: 120,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#29b6be",
    height: 55,
    borderRadius: 4,
    backgroundColor: "#29b6be",
  },
  touchstyle: { marginTop: 10 },
});
