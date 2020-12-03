import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default function PublishScreen({ setToken, userId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [newPicture, setNewPicture] = useState(null);
  const navigation = useNavigation();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("brand", selectedBrand);
  formData.append("size", selectedSize);
  formData.append("color", color);
  formData.append("condition", condition);
  formData.append("city", city);
  formData.append("price", price);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log(token);
      console.log(userId);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        { headers: { authorization: "Bearer " + token } }
      );
      console.log("coucou");
      if (response.data.token && response.data._id) {
        setToken(response.data.token);
        setId(response.data._id);
        navigation.navigate("Offer");
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity style={styles.pictureView}>
          {newPicture ? (
            <Image
              source={{ uri: newPicture }}
              style={styles.picture}
              resizeMode="cover"
            />
          ) : (
            <Text>+ Ajouter photos</Text>
          )}
        </TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() => {
              uploadPicture();
            }}
          >
            <MaterialIcons name="photo-library" size={30} color={colors.grey} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              takePicture();
            }}
          >
            <FontAwesome5 name="camera" size={30} color={colors.grey} />
          </TouchableOpacity>
        </View>
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
      <View style={styles.input2}>
        <Text>Prix</Text>
        <TextInput
          placeholder="0,00 €"
          onChangeText={(text) => {
            setPrice(text);
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Ajouter"
          color="black"
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    //justifyContent: "center",
  },
  //images et photos
  picture: {
    height: 150,
    width: 150,
    borderRadius: 150,
  },
  pictureView: {
    marginVertical: 20,
    marginTop: 80,
    width: 170,
    height: 170,
    // borderRadius: 170,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#29b6be",
    borderWidth: 2,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  icons: {
    marginLeft: 20,
  },
  iconButton: {
    marginTop: 40,
  },
  view: {
    height: 30,
  },
  //input

  input1: {
    marginTop: 30,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 2,
  },
  input2: {
    marginTop: 50,
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 2,
  },
  input3: {
    height: 100,

    backgroundColor: "white",
    marginTop: 50,
    borderWidth: 2,
    borderColor: "#D7D7D7",
  },
  button: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#29b6be",
    height: 55,
    borderRadius: 4,
    backgroundColor: "#29b6be",
  },
});
