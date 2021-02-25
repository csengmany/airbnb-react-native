import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    FlatList,
    Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
// import colors
import colors from "../assets/colors";
const { red, grey, lightGrey, white, yellow } = colors;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function RoomScreen({ route, navigation }) {
    const { itemId } = route.params;
    // console.log(route.params.itemId);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const displayStars = (ratingValue) => {
        const tab = [];
        for (let i = 1; i <= 5; i++) {
            if (ratingValue >= i) {
                tab.push(
                    <Entypo name="star" size={24} color={yellow} key={index} />
                );
            } else {
                tab.push(
                    <Entypo
                        name="star"
                        size={24}
                        color={lightGrey}
                        key={index}
                    />
                );
            }
        }

        return tab;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `https://express-airbnb-api.herokuapp.com/rooms/${itemId}`
                );
                console.log(response.data);
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
        <View>
            <Text>{itemId}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
});
