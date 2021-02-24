import React from "react";
import { View, StyleSheet, Text } from "react-native";
// import colors
import colors from "../assets/colors";
const { red, grey, white } = colors;

const MainTitle = ({ text }) => {
    return <Text style={styles.h1}>{text}</Text>;
};

export default MainTitle;
const styles = StyleSheet.create({
    h1: {
        fontSize: 25,
        fontWeight: "600",
        color: grey,
    },
});
