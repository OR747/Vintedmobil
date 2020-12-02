import React from "react";
import { Image, StyleSheet } from "react-native";

const SearchProduct = () => {
  return (
    <Image
      source={require("../assets/logoVinted.jpg")}
      style={styles.logo}
      resizeMode="contain"
    />
  );
};

export default SearchProduct;

const styles = StyleSheet.create({
  Search: {
    height: 85,
    width: 85,
  },
});
