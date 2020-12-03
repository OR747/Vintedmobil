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
  // const [priceDesc, setPriceDesc] = useState(false);
  // const [priceAsc, setPriceAsc] = useState(false);
  const [sort, setSort] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    // if (priceMin && priceMax) {
    //   console.log("ok");
    // } else if (priceMin || priceMax) {
    //   console.log("ok2");
    // }

    // const sort = {};

    try {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?priceMin=${Number(
          priceMin
        )}&priceMax=${Number(priceMax)}`
      );
      // console.log("coucou", response.data);

      // if (sort === price - asc) {
      //   setData(response.data);
      //   navigation.navigate("Recherche");
      // }
      // // if (sort === price - desc) {
      // //   setData(response.data);
      // //   navigation.navigate("Recherche");
      // }
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
      <View style={styles.button}>
        <Button
          title="Prix croissant"
          color="white"
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Prix décoissant"
          color="white"
          onPress={() => {
            handleSubmit();
          }}
        />
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
  input2: {
    marginTop: 50,
    borderBottomColor: "#29b6be",
    borderBottomWidth: 2,
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
