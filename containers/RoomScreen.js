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
    let yellowStars = [];
    let greyStars = [];
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `https://express-airbnb-api.herokuapp.com/rooms/${itemId}`
                );
                console.log(response.data);
                setData(response.data);
                yellowStars = new Array(data.ratingValue).fill(undefined);
                // greyStars = new Array(5 - data.ratingValue).fill(undefined);
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
        // <View style={styles.container}>
        //     <Text>This is the RoomScreen component</Text>
        //     <Text>{itemId}</Text>

        //     <View style={styles.card}>
        //         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        //             <View style={styles.imgCard}>
        //                 {data.photos.map((file, index) => {
        //                     return (
        //                         <Image
        //                             style={styles.img}
        //                             resizeMode="cover"
        //                             source={{ uri: file.url }}
        //                             key={file.picture_id}
        //                         />
        //                     );
        //                 })}
        //             </View>
        //             <Text style={styles.price}>{data.price} €</Text>
        //         </ScrollView>

        //         <View style={styles.descriptionTxt}>
        //             <Text style={styles.title} numberOfLines={1}>
        //                 {data.title}
        //             </Text>
        //             <View>
        //                 <View style={styles.rating}>
        //                     {yellowStars.map((star, index) => {
        //                         return (
        //                             <Entypo
        //                                 name="star"
        //                                 size={24}
        //                                 color={yellow}
        //                                 key={index}
        //                             />
        //                         );
        //                     })}
        //                     {greyStars.map((star, index) => {
        //                         return (
        //                             <Entypo
        //                                 name="star"
        //                                 size={24}
        //                                 color={lightGrey}
        //                                 key={index}
        //                             />
        //                         );
        //                     })}
        //                     <Text style={styles.greyTxt}>
        //                         {data.reviews} reviews
        //                     </Text>
        //                 </View>
        //             </View>
        //         </View>
        //         <Image
        //             style={styles.owner}
        //             resizeMode="cover"
        //             source={{
        //                 uri: data.user.account.photo.url,
        //             }}
        //         />
        //     </View>
        // </View>
        <View></View>
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
