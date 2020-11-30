import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => {
  return (
    <Image
      source={require("../assets/logoVinted.jpg")}
      style={styles.logo}
      resizeMode="contain"
    />
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    height: 85,
    width: 85,
  },
});
