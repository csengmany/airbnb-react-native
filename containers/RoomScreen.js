import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    FlatList,
    Dimensions,
    Image,
} from "react-native";
import MapView from "react-native-maps";
import { useState, useEffect } from "react";
import axios from "axios";
// import icon
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// import colors
import colors from "../assets/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { red, grey, lightGrey, white, yellow } = colors;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function RoomScreen({ route, navigation }) {
    const { itemId } = route.params;
    // console.log(route.params.itemId);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [displayFullText, setDisplayFullText] = useState(false);

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
                    `https://express-airbnb-api.herokuapp.com/rooms/${itemId}`
                );
                // console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
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
        <ScrollView style={styles.container}>
            <View style={styles.photos}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ backgroundColor: white }}
                    data={data.photos}
                    renderItem={({ item }) => {
                        return (
                            <Image
                                style={styles.bgImage}
                                source={{
                                    uri: item.url,
                                }}
                                key={item.picture_id}
                            />
                        );
                    }}
                    keyExtractor={(item) => item._id}
                ></FlatList>
                <View style={styles.price}>
                    <Text style={styles.priceText}>{data.price} €</Text>
                </View>
            </View>

            <View style={styles.informationsSection}>
                <View style={styles.informations}>
                    <View style={styles.informationsDetails}>
                        <Text
                            style={styles.title}
                            numberOfLines={!displayFullText ? 1 : null}
                        >
                            {data.title}
                        </Text>
                        <View>
                            <View style={styles.rating}>
                                {displayStars(data.ratingValue)}
                                <Text style={styles.greyTxt}>
                                    {data.reviews} reviews
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Image
                        style={styles.profilePicture}
                        source={{
                            uri: data.user.account.photo.url,
                        }}
                    />
                </View>

                <Text
                    style={styles.description}
                    numberOfLines={!displayFullText ? 3 : null}
                >
                    {data.description}
                </Text>
                <TouchableWithoutFeedback
                    onPress={() => {
                        setDisplayFullText(!displayFullText);
                    }}
                >
                    <View style={styles.horizontalSection}>
                        <Text style={{ color: grey, marginRight: 5 }}>
                            Show {displayFullText ? "less" : "more"}
                        </Text>
                        {displayFullText ? (
                            <AntDesign name="caretup" size={14} color={grey} />
                        ) : (
                            <AntDesign
                                name="caretdown"
                                size={14}
                                color={grey}
                            />
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <MapView
                style={styles.mapView}
                initialRegion={{
                    latitude: 48.86234379578587,
                    longitude: 2.3355256732980734,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                showsUserLocation={true}
            >
                <MapView.Marker
                    key={data._id}
                    coordinate={{
                        latitude: data.location[1],
                        longitude: data.location[0],
                    }}
                    title={data.title}
                    description={data.description}
                />
            </MapView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    bgImage: {
        width: width,
        height: 200,
        justifyContent: "flex-end",
        position: "relative",
    },
    price: {
        backgroundColor: "black",
        height: 40,
        width: 85,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        position: "absolute",
        bottom: 5,
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
    description: { marginVertical: 10 },
    informationsSection: {
        padding: 15,
    },
    photos: {
        flexDirection: "row",
        flexWrap: "nowrap",
        height: 200,
        width: "100%",
    },
    horizontalSection: {
        flexDirection: "row",
    },
    mapView: {
        height: 200,
        width: "100%",
    },
});
