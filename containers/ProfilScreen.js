import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

//package
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

//icons et colors
import colors from "../assets/colors";
import Message from "../components/Message";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function ProfilScreen({ setToken, userId }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [picture, setPicture] = useState(null);
  const [numbOffer, setNumbOffer] = useState();
  //New data

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPicture, setNewPicture] = useState(null);
  const [displayMessage, setDisplayMessage] = useState(null);

  useEffect(() => {
    console.log("Rentre dans le useEffect");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //const id = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      console.log(userId);
      console.log(token);

      // const response = await axios.get(
      //   `https://lereacteur-vinted-api.herokuapp.com/user/${userId}`,
      //   // `http://localhost:3000/user/${userId}`,
      //   {
      //     headers: {
      //       Authorization: "Bearer " + token,
      //     },
      //   }
      // );
      // console.log(response.data);
      // console.log(response.data.password);
      // setUsername(response.data.username);
      // setEmail(response.data.email);
      // // setPassword(response.data.password);
      // setNumbOffer(response.data.numbOffer);

      // setNewUsername(response.data.username);
      // setNewEmail(response.data.email);
      // setNewPassword(response.data.password);

      // if (response.data.owner.account) {
      //   setPicture(response.data.owner.account.avatar.url);
      //   setNewPicture(response.data.owner.account.avatar.url);
      // }

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  // //update informations

  const editInformations = async () => {
    setIsLoading(true);

    if (
      newEmail !== email ||
      newUsername !== username ||
      newPassword !== password ||
      newPicture !== picture
    ) {
      try {
        //update picture

        if (newPicture !== picture) {
          const uri = newPicture;
          const uriParts = uri.split(".");
          const fileType = uriParts[1];

          const formData = new FormData();
          formData.append("picture", {
            uri,
            name: `userPicture`,
            type: `image/${fileType}`,
          });
          const token = await AsyncStorage.getItem("userToken");

          // const response = await axios.put(
          //   `https://lereacteur-vinted-api.herokuapp.com/user/upload_picture`,

          //   formData,
          //   {
          //     headers: {
          //       Authorization: "Bearer " + token,
          //     },
          //   }
          // );
          console.log(response.data);
          if (response.data) {
            setPicture(response.data.photo[0].url);
            setIsLoading(false);
          }
        }

        // update email / username / password

        if (
          newEmail !== email ||
          newUsername !== username ||
          newPassword !== password
        ) {
          const obj = {};
          if (newEmail !== email) {
            obj.email = newEmail;
          }
          if (newUsername !== username) {
            obj.username = newUsername;
          }
          if (newPassword !== password) {
            obj.password = newPassword;
          }

          const token = await AsyncStorage.getItem("userToken");

          // const response = await axios.post(
          //   `https://lereacteur-vinted-api.herokuapp.com/update`,

          //   obj,
          //   {
          //     headers: {
          //       Authorization: "Bearer " + token,
          //     },
          //   }
          // );

          if (response.data) {
            setUsername(response.data.username);
            setEmail(response.data.email);
          } else {
            setDisplayMessage({
              message: "An error occurred",
              color: "error",
            });
          }
        }

        setDisplayMessage({
          message: "Your profile has been updated",
          color: "success",
        });
        setIsLoading(false);
      } catch (error) {
        setDisplayMessage({
          message: "error",
          color: "error",
        });
        setIsLoading(false);
        fetchData();
      }
    } else {
      setDisplayMessage({
        message: "Please change at least one information",
        color: "error",
      });
      setIsLoading(false);
    }
  };
  // get picture from image library

  const uploadPicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setNewPicture(result.uri);
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

  return isLoading ? (
    <ActivityIndicator size="large" color="#29b6be" />
  ) : (
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
            <FontAwesome5 name="user-alt" size={100} color={colors.lightGrey} />
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
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
      </View>
      <View style={styles.input2}>
        <TextInput
          placeholder="usurname"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
      </View>
      <View style={styles.input2}>
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>
      <View style={styles.input2}>
        <TextInput
          placeholder="nombre d'annonces"
          value={numbOffer}
          onChangeText={(number) => {
            setNumbOffer(number);
          }}
        />
      </View>

      <View style={styles.view}>
        {displayMessage && (
          <Message
            message={displayMessage.message}
            color={displayMessage.color}
          />
        )}
      </View>
      <View style={styles.button0}>
        <Button title="Update" color="gray" onPress={editInformations} />
      </View>
      <View style={styles.button}>
        <Button
          title="Log Out"
          color="white"
          onPress={() => {
            setToken(null);
          }}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, backgroundColor: "white" },
  //images et photos
  picture: {
    height: 150,
    width: 150,
    borderRadius: 150,
  },
  pictureView: {
    marginVertical: 20,
    width: 170,
    height: 170,
    borderRadius: 170,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#29b6be",
    borderWidth: 0.5,
  },
  topView: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 30,
    marginTop: 50,
  },
  icons: {
    flexDirection: "row",
    marginLeft: 20,
    // borderWidth: 2,
    // borderColor: "#FC8083",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    // marginTop: 20,
  },
  iconButton: {
    // marginTop: 40,
  },
  view: {
    height: 30,
  },
  //inputs//

  input1: {
    marginTop: 30,
    borderBottomColor: "#29b6be",
    borderBottomWidth: 2,
  },
  input2: {
    marginTop: 50,
    borderBottomColor: "#29b6be",
    borderBottomWidth: 2,
  },

  button0: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#29b6be",
    height: 55,
    borderRadius: 4,
    backgroundColor: "white",
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
});
