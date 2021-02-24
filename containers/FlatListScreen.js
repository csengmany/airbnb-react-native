import * as React from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
// import colors
import colors from "../assets/colors";
const { red, grey, white } = colors;

function FlatListScreen() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    "https://express-airbnb-api.herokuapp.com/rooms"
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

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text style={styles.text}>FlatList Screen</Text>
            {isLoading && (
                <View>
                    <ActivityIndicator size="large" color={red} />
                </View>
            )}
            <FlatList
                data={[
                    { id: 1, name: "Brice" },
                    { id: 2, name: "Alexis" },
                    { id: 3, name: "Pierre" },
                ]}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <Text>{item.name}</Text>}
            />
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container}>
                            {item.photos.map((file, index) => {
                                return (
                                    <Image
                                        style={styles.img}
                                        source={{ uri: file.url }}
                                        key={file.picture_id}
                                    />
                                );
                                // console.log(file.url);
                            })}

                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.title}>{item.description}</Text>
                            {/* <Text style={styles.title}>{item.price}</Text> */}
                            <Text style={styles.title}>{item.reviews}</Text>
                        </View>
                    );
                }}
                keyExtractor={(item) => item._id}
            ></FlatList>
        </View>
    );
}

export default FlatListScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        marginTop: 40,
    },
    title: {
        fontSize: 20,
        marginTop: 40,
        color: red,
    },
});
