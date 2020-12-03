import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function PriceScreen({ setData }) {
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [priceDesc, setPriceDesc] = useState(false);
  const [priceAsc, setPriceAsc] = useState(false);

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
      <View style={styles.input2}>
        <TextInput
          placeholder="priceMin"
          value={priceMin}
          onChangeText={(number) => {
            setPriceMin(number);
          }}
        />
      </View>
      <View style={styles.input2}>
        <TextInput
          placeholder="priceMax"
          value={priceMax}
          onChangeText={(number) => {
            setPriceMax(number);
          }}
        />
      </View>
      <View style={priceDesc === true ? styles.checkBox : styles.unchekBox1}>
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
            <Text style={{ backgroundColor: "#29b6be", color: "black" }}>
              desc
            </Text>
          ) : (
            <Text style={{ color: "red" }}>no desc</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={priceAsc === true ? styles.checkBox : styles.unchekBox}>
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
            <Text style={{ backgroundColor: "#29b6be", color: "black" }}>
              asc
            </Text>
          ) : (
            <Text style={{ color: "red" }}>no asc</Text>
          )}
        </TouchableOpacity>
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
    </View>
  );
}
const styles = StyleSheet.create({
  container0: {
    flex: 1,
    //backgroundColor: "white",
    //justifyContent: "center",
    marginTop: 90,
    paddingHorizontal: 15,
  },
  checkBox: {
    marginTop: 50,
    height: 40,
    width: 40,
    borderWidth: 2,
    borderColor: "#29b6be",
    alignItems: "center",
    justifyContent: "center",
  },
  unchekBox: {
    marginTop: 50,
    height: 40,
    width: 40,
    borderWidth: 2,
    borderColor: "#29b6be",
    alignItems: "center",
    justifyContent: "center",
  },
  unchekBox1: {
    marginTop: 50,
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: "#29b6be",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  input2: {
    marginTop: 50,
    borderBottomColor: "#29b6be",
    borderBottomWidth: 2,
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
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#29b6be",
    height: 55,
    borderRadius: 4,
    backgroundColor: "#29b6be",
  },
  touchstyle: { marginTop: 30 },
});
