import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, StyleSheet, TextInput } from "react-native";

export default function PriceScreen() {
  const [priceMin, setPrcieMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers/${priceMin}&${priceMax}`
      );
      //console.log(response.data);
      if (response.data.priceMin && response.data.priceMax) {
        setPriceMax(response.data.priceMax);
        setPrcieMin(response.data.price);
        navigation.navigate("Recherche");
      } else {
        alert("An error occurred");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container0}>
      <Text>Welcome to Price!</Text>
      <View style={styles.input2}>
        <TextInput
          placeholder="priceMin"
          value={priceMin}
          onChangeText={(number) => {
            setPrcieMin(number);
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
      <Button
        title="Afficher les résultats"
        onPress={() => {
          handleSubmit;
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container0: {
    flex: 1,
    //backgroundColor: "white",
    //justifyContent: "center",
    marginTop: 90,
  },
  input2: {
    marginTop: 50,
    borderBottomColor: "#29b6be",
    borderBottomWidth: 2,
  },
});
