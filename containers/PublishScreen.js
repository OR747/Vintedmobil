import React, { useState } from "react";
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
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default function PublishScreen({ setToken, userId, userToken }) {
  console.log(userToken);
  const [title, setTitle] = useState("test");
  const [description, setDescription] = useState("test");
  const [selectedBrand, setSelectedBrand] = useState("test");
  const [selectedSize, setSelectedSize] = useState("test");
  const [color, setColor] = useState("test");
  const [condition, setCondition] = useState("test");
  const [city, setCity] = useState("test");
  const [price, setPrice] = useState(2);
  const [picture, setPicture] = useState(null);
  const navigation = useNavigation();
  const [displayMessage, setDisplayMessage] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", selectedBrand);
      formData.append("size", selectedSize);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);
      //photo
      const uri = picture;
      const uriParts = uri.split(".");
      const fileType = uriParts[1];
      formData.append("picture", {
        uri,
        name: `userPicture`,
        type: `image/${fileType}`,
      });

      //console.log(formData);

      const response = await axios.post(
        `https://lereacteur-vinted-api.herokuapp.com/offer/publish`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      console.log("coucou");

      if (response.data) {
        navigation.navigate("Offer");
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // get picture from image library

  const uploadPicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setPicture(result.uri);
      }
    }
    setDisplayMessage(false);
  };

  // get picture from camera

  // const takePicture = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   if (status === "granted") {
  //     const result = await ImagePicker.launchCameraAsync();
  //     if (!result.cancelled) {
  //       setNewPicture(result.uri);
  //     }
  //   }
  //   setDisplayMessage(false);
  // };
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../assets/logoVinted.jpg")}
          resizeMode="cover"
          style={{ height: 45, width: 75 }}
        ></Image>
      </View>
      <View style={styles.text}>
        <Text style={{ fontSize: 24, color: "gray" }}>Publie une annonce</Text>
      </View>
      <ScrollView>
        <View style={styles.topView}>
          <TouchableOpacity style={styles.pictureView}>
            <Image
              source={{ uri: picture }}
              style={styles.picture}
              resizeMode="cover"
            />

            <Text>+ Ajouter photos</Text>
          </TouchableOpacity>
          <View style={styles.icons}>
            <TouchableOpacity
              onPress={() => {
                uploadPicture();
              }}
            >
              <MaterialIcons
                name="photo-library"
                size={30}
                color={colors.grey}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              takePicture();
            }}
          >
            <FontAwesome5 name="camera" size={30} color={colors.grey} />
          </TouchableOpacity> */}
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    //justifyContent: "center",
  },
  logo: {
    height: 55,
    width: "100%",
    // borderWidth: 2,
    // borderColor: "#FC8083",
    alignItems: "center",
    marginTop: +40,
  },
  text: { borderBottomWidth: 1, borderBottomColor: "gray" },
  //images et photos
  picture: {
    height: 150,
    width: 150,
    borderRadius: 150,
  },
  pictureView: {
    // marginVertical: 10,
    marginTop: 30,
    width: 270,
    height: 170,
    // borderRadius: 170,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
