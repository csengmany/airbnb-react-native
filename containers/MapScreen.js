import * as React from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

// import colors
import colors from "../assets/colors";
const { red, grey, white } = colors;

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

function MapScreen({ navigation, id, setId }) {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [coords, setCoords] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const askPermissionAndGetLocation = async () => {
            const { status } = await Location.requestPermissionsAsync();
            console.log(status);

            if (status === "granted") {
                console.log("Permission acceptée");
                // Obtenir les coordonnées GPS
                const location = await Location.getCurrentPositionAsync({
                    enableHighAccuracy: true,
                    accuracy: Location.Accuracy.High,
                });
                // console.log(location);
            } else {
                console.log("Permission refusée");
            }
        };
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://express-airbnb-api.herokuapp.com/rooms/around"
                );
                // console.log("data", response.data);
                setData(response.data);
                if (response.data) {
                    // retrieve the gps coordinates of data
                    const newCoords = [];
                    response.data.map((item, index) => {
                        newCoords.push({
                            latitude: item.location[1],
                            longitude: item.location[0],
                            id: item._id,
                            name: item.title,
                        });
                    });
                    setCoords(newCoords);
                    // console.log(coords);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error.response.data.error);
                alert("An error occured");
            }
        };
        askPermissionAndGetLocation();
        fetchData();
    }, []);

    return (
        <View>
            <MapView
                style={styles.mapView}
                // provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 48.856614,
                    longitude: 2.3522219,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                showsUserLocation={true}
            >
                {coords.map((item, index) => {
                    return (
                        <MapView.Marker
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude,
                            }}
                            key={index}
                            onPress={() => {
                                navigation.navigate("Room", {
                                    itemId: item.id,
                                });
                            }}
                            title={item.name}
                        />
                    );
                })}
            </MapView>
        </View>
    );
}

export default MapScreen;

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
    mapView: {
        width: width,
        height: height,
    },
});
