import React, { useState, useEffect } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
// import components
import ConnectionButton from "../components/ConnectionButton";
import Input from "../components/Input";
import LargeInput from "../components/LargeInput";
import Message from "../components/Message";
// import icons
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
// import colors
import colors from "../assets/colors";

const { red, grey, lightGrey, white, yellow } = colors;

export default function ProfileScreen({ setToken, setId, userId, token }) {
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState(null);

    const [isPictureModified, setIsPictureModified] = useState(false);
    const [isInfosModified, setIsInfosModified] = useState(false);

    const [displayMessage, setDisplayMessage] = useState(null);

    useEffect(() => {
        fetchData();
    }, [editInformations]);
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://express-airbnb-api.herokuapp.com/user/${userId}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setUserName(response.data.username);
            setEmail(response.data.email);
            setDescription(response.data.description);
            if (response.data.photo) {
                setPicture(response.data.photo[0].url);
            }
            console.log("DATA", response.data);
            setIsLoading(false);
        } catch (error) {
            setDisplayMessage({
                message: "An error occurred",
                color: "error",
            });
        }
    };
    const logOut = () => {
        setToken(null);
        setId(null);
    };
    // update informations
    const editInformations = async () => {
        setDisplayMessage(false);
        if (isPictureModified || isInfosModified) {
            setIsLoading(true);

            // send request to update picture
            if (isPictureModified) {
                try {
                    const uri = picture;
                    const uriParts = uri.split(".");
                    const fileType = uriParts[1];

                    const formData = new FormData();
                    formData.append("photo", {
                        uri,
                        name: `userPicture`,
                        type: `image/${fileType}`,
                    });

                    const response = await axios.put(
                        `https://express-airbnb-api.herokuapp.com/user/upload_picture`,
                        formData,
                        {
                            headers: {
                                Authorization: "Bearer " + token,
                            },
                        }
                    );

                    if (response.data) {
                        setPicture(response.data.photo.url);
                        setDisplayMessage({
                            message: "Your profile has been updated",
                            color: "success",
                        });
                    }
                } catch (error) {
                    setDisplayMessage({
                        message: error.response.data.error,
                        color: "error",
                    });
                }
            }

            // send request to update informations (except picture)
            if (isInfosModified) {
                try {
                    const obj = {};
                    obj.email = email;
                    obj.username = userName;
                    obj.description = description;
                    const response = await axios.put(
                        `https://express-airbnb-api.herokuapp.com/user/update`,
                        obj,
                        {
                            headers: {
                                Authorization: "Bearer " + token,
                            },
                        }
                    );

                    if (response.data) {
                        setUserName(response.data.username);
                        setEmail(response.data.email);
                        setDescription(response.data.description);
                        setDisplayMessage({
                            message: "Your profile has been updated",
                            color: "success",
                        });
                    } else {
                        setDisplayMessage({
                            message: "An error occurred",
                            color: "error",
                        });
                    }
                } catch (error) {
                    setDisplayMessage({
                        message: error.response.data.error,
                        color: "error",
                    });
                }
            }

            isPictureModified && setIsPictureModified(false);
            isInfosModified && setIsInfosModified(false);
            setIsLoading(false);
            fetchData();
        } else {
            setDisplayMessage({
                message: "Change at least one information",
                color: "error",
            });
        }
    };

    // get picture from image library
    const uploadPicture = async () => {
        const {
            status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === "granted") {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.cancelled) {
                setPicture(result.uri);
                if (!isPictureModified) {
                    setIsPictureModified(true);
                }
            }
        }
        setDisplayMessage(false);
    };
    // get picture from camera
    const takePicture = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === "granted") {
            const result = await ImagePicker.launchCameraAsync();
            if (!result.cancelled) {
                setPicture(result.uri);
                if (!isPictureModified) {
                    setIsPictureModified(true);
                }
            }
        }
        setDisplayMessage(false);
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <StatusBar barStyle="dark-content" />
            {isLoading ? (
                <ActivityIndicator
                    color={red}
                    size="large"
                    style={styles.activityIndicator}
                />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text>user id : {userId}</Text>
                    <View style={styles.topView}>
                        <TouchableOpacity style={styles.pictureView}>
                            {picture ? (
                                <Image
                                    source={{ uri: picture }}
                                    style={styles.picture}
                                    resizeMode="cover"
                                />
                            ) : (
                                <FontAwesome5
                                    name="user-alt"
                                    size={100}
                                    color={lightGrey}
                                />
                            )}
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
                                    color={grey}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => {
                                    takePicture();
                                }}
                            >
                                <FontAwesome5
                                    name="camera"
                                    size={30}
                                    color={grey}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Input
                        value={email}
                        setFunction={setEmail}
                        setDisplayMessage={setDisplayMessage}
                        setIsInfosModified={setIsInfosModified}
                        placeholder="email"
                    />
                    <Input
                        value={userName}
                        setFunction={setUserName}
                        setDisplayMessage={setDisplayMessage}
                        setIsInfosModified={setIsInfosModified}
                        placeholder="username"
                    />
                    <LargeInput
                        value={description}
                        setFunction={setDescription}
                        setDisplayMessage={setDisplayMessage}
                        setIsInfosModified={setIsInfosModified}
                        placeholder="description"
                    />
                    <View style={styles.view}>
                        {displayMessage && (
                            <Message
                                message={displayMessage.message}
                                color={displayMessage.color}
                            />
                        )}
                    </View>
                    <ConnectionButton
                        text="Update"
                        submitFunction={editInformations}
                    />
                    <ConnectionButton
                        text="Log Out"
                        submitFunction={logOut}
                        color={true}
                    />
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: white,
    },
    scrollView: {
        alignItems: "center",
        backgroundColor: white,
    },
    picture: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    pictureView: {
        marginVertical: 20,
        width: 170,
        height: 170,
        borderRadius: 170,
        alignItems: "center",
        justifyContent: "center",
        borderColor: red,
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
});
