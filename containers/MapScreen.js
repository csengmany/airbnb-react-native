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

function MapScreen() {
    return (
        <View>
            <Text style={styles.text}>Map Screen</Text>
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
});
