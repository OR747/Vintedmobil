import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, StyleSheet } from "react-native";

export default function SortScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container0}>
      <Text>Prix décroissant</Text>
      <Text>Prix croissant</Text>
      <Text>Plus anciennes</Text>
      <Text>Plus récentes</Text>

      <Button
        title="Afficher les résultats"
        onPress={() => {
          navigation.navigate("Recherche");
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
});
