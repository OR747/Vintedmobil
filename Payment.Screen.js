import React from "react";
import { Image, StyleSheet } from "react-native";

const Payment = () => {
  return (
    <Image
      source={require("../assets/logoVinted.jpg")}
      style={styles.logo}
      resizeMode="contain"
    />
  );
};

export default Payment;

const styles = StyleSheet.create({
  logo: {
    height: 85,
    width: 85,
  },
});
