import React from "react";

import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    Image,
    ActivityIndicator,
    Dimensions,
    ImageBackground,
} from "react-native";
// import LottieView from "lottie-react-native";
import Ball from "../components/Ball";
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// import icon
import { Entypo } from "@expo/vector-icons";
// import colors
import colors from "../assets/colors";
const { red, grey, lightGrey, white, yellow } = colors;

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function HomeScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const displayStars = (ratingValue) => {
        const tab = [];
        for (let i = 1; i <= 5; i++) {
            if (ratingValue >= i) {
                tab.push(
                    <Entypo name="star" size={24} color={yellow} key={i} />
                );
            } else {
                tab.push(
                    <Entypo name="star" size={24} color={lightGrey} key={i} />
                );
            }
        }

        return tab;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://express-airbnb-api.herokuapp.com/rooms"
                );
                // console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                // console.log(error.response.data.error);
                alert("An error occured");
            }
        };
        fetchData();
    }, []);

    return isLoading ? (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            {/* <ActivityIndicator size="large" color={red} /> */}
            <Ball />
        </View>
    ) : (
        <FlatList
            style={{ backgroundColor: white }}
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        style={styles.container}
                        onPress={() =>
                            navigation.navigate("Room", {
                                itemId: item._id,
                            })
                        }
                    >
                        <ImageBackground
                            style={styles.bgImage}
                            source={{
                                uri: item.photos[0].url,
                            }}
                        >
                            <View style={styles.price}>
                                <Text style={styles.priceText}>
                                    {item.price} €
                                </Text>
                            </View>
                        </ImageBackground>

                        <View style={styles.informations}>
                            <View style={styles.informationsDetails}>
                                <Text style={styles.title} numberOfLines={1}>
                                    {item.title}
                                </Text>
                                <View>
                                    <View style={styles.rating}>
                                        {displayStars(item.ratingValue)}
                                        <Text style={styles.greyTxt}>
                                            {item.reviews} reviews
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Image
                                style={styles.profilePicture}
                                source={{
                                    uri: item.user.account.photo.url,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                );
            }}
        ></FlatList>
    );
}
const styles = StyleSheet.create({
    container: {
        borderBottomColor: lightGrey,
        borderBottomWidth: 1,
        marginHorizontal: 10,
        marginBottom: 20,
        paddingBottom: 10,
        marginTop: 10,
    },
    bgImage: {
        width: "100%",
        height: 200,
        justifyContent: "flex-end",
    },
    price: {
        backgroundColor: "black",
        height: 40,
        width: 85,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    priceText: {
        color: white,
        fontSize: 18,
    },
    profilePicture: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    informations: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    informationsDetails: {
        flex: 1,
        justifyContent: "space-around",
        marginRight: 5,
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
    },
    greyTxt: {
        color: lightGrey,
        fontSize: 15,
        marginLeft: 10,
    },
});
