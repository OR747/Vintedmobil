import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, StyleSheet, TextInput } from "react-native";

export default function PublishScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.input1}>
        <Text>Titre</Text>
        <TextInput
          placeholder="ex: Chemise Sézane verte"
          onChangeText={(text) => {
            setTitle(text);
          }}
        />
      </View>
      <View style={styles.input1}>
        <Text>Titre</Text>
        <TextInput
          placeholder="ex: Chemise Sézane verte"
          onChangeText={(text) => {
            setTitle(text);
          }}
        />
      </View>

      <View style={styles.input3}>
        <Text>Décris ton article</Text>
        <TextInput
          placeholder="ex: porté quelquefois, taille correctement"
          multiline={true}
          numberOfLines={10}
          maxLength={200}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
      </View>
      <View style={styles.input2}>
        <Text>Marque</Text>
        <TextInput
          placeholder="ex: Zara"
          onChangeText={(text) => {
            setSelectedBrand(text);
          }}
        />
      </View>
      <View style={styles.input2}>
        <Text>Taille</Text>
        <TextInput
          placeholder="ex: L / 40 / 12"
          onChangeText={(text) => {
            setSelectedSize(text);
          }}
        />
      </View>

      <View style={styles.input2}>
        <Text>Couleur</Text>
        <TextInput
          placeholder="ex: Fushia"
          onChangeText={(text) => {
            setColor(text);
          }}
        />
      </View>
      <View style={styles.input2}>
        <Text>État</Text>
        <TextInput
          placeholder="ex:neuf avec étiquette"
          onChangeText={(text) => {
            setCondition(text);
          }}
        />
      </View>
      <View style={styles.input2}>
        <Text>Ville</Text>
        <TextInput
          placeholder="ex: Paris"
          onChangeText={(text) => {
            setCity(text);
          }}
        />
      </View>
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate("Home", { userId: 123 });
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //justifyContent: "center",
  },

  input1: {
    marginTop: 30,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 2,
    marginLeft: 30,
    marginRight: 30,
  },
  input2: {
    marginTop: 50,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 2,
    marginLeft: 30,
    marginRight: 30,
  },
  input3: {
    height: 100,

    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "white",
    marginTop: 50,
    borderWidth: 2,
    borderColor: "#D7D7D7",
  },
  button: {
    backgroundColor: "white",

    width: 210,
    height: 65,
    marginTop: 30,
    alignItems: "center",
    borderRadius: 90,
    marginLeft: 105,
    borderWidth: 2,
    borderColor: "#FC8083",
    justifyContent: "center",
    alignContent: "center",
  },
});
