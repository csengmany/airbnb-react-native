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
} from "react-native";
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
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
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
            <ActivityIndicator size="large" color={red} />
        </View>
    ) : (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    const yellowStars = new Array(item.ratingValue).fill(
                        undefined
                    );
                    const greyStars = new Array(5 - item.ratingValue).fill(
                        undefined
                    );
                    return (
                        <View style={styles.card}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={styles.imgCard}>
                                    {item.photos.map((file, index) => {
                                        return (
                                            <Image
                                                style={styles.img}
                                                resizeMode="cover"
                                                source={{ uri: file.url }}
                                                key={file.picture_id}
                                            />
                                        );
                                    })}
                                </View>
                                <Text style={styles.price}>{item.price} €</Text>
                            </ScrollView>
                            <TouchableOpacity
                                style={styles.description}
                                onPress={() =>
                                    navigation.navigate("Room", {
                                        itemId: item._id,
                                    })
                                }
                            >
                                <View style={styles.descriptionTxt}>
                                    <Text
                                        style={styles.title}
                                        numberOfLines={1}
                                    >
                                        {item.title}
                                    </Text>
                                    <View>
                                        <View style={styles.rating}>
                                            {yellowStars.map((star, index) => {
                                                return (
                                                    <Entypo
                                                        name="star"
                                                        size={24}
                                                        color={yellow}
                                                        key={index}
                                                    />
                                                );
                                            })}
                                            {greyStars.map((star, index) => {
                                                return (
                                                    <Entypo
                                                        name="star"
                                                        size={24}
                                                        color={lightGrey}
                                                        key={index}
                                                    />
                                                );
                                            })}
                                            <Text style={styles.greyTxt}>
                                                {item.reviews} reviews
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <Image
                                    style={styles.owner}
                                    resizeMode="cover"
                                    source={{
                                        uri: item.user.account.photo.url,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    );
                }}
                keyExtractor={(item) => item._id}
            ></FlatList>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        margin: 10,
        width: width,
        borderBottomColor: lightGrey,
        borderBottomWidth: 1,
    },
    imgCard: {
        width: "100%",
        height: 250,
        flexDirection: "row",
        position: "relative",
    },
    img: {
        width: width - 20,
        height: 220,
        marginRight: 10,
    },
    price: {
        backgroundColor: "black",
        color: white,
        position: "absolute",
        bottom: 40,
        padding: 10,
        width: 70,
        textAlign: "center",
    },
    description: {
        width: width,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingRight: 10,
    },
    descriptionTxt: {
        width: "65%",
        margin: 0,
    },
    owner: {
        height: 80,
        width: 80,
        borderRadius: 50,
        margin: 10,
    },
    title: {
        fontSize: 18,
        color: "black",
    },

    rating: {
        flexDirection: "row",
        alignItems: "center",
    },
    greyTxt: {
        color: lightGrey,
        fontSize: 14,
    },
});
