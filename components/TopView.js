import React from "react";
import { View, StyleSheet, Text } from "react-native";
// import colors
import colors from "../assets/colors";
const { red, grey, white } = colors;

const TopView = ({ title }) => {
    return (
        <View style={styles.topView}>
            <Text style={[styles.h1, styles.greyTxt]}>{title}</Text>
        </View>
    );
};

export default TopView;
const styles = StyleSheet.create({
    topView: {
        alignItems: "center",
        justifyContent: "center",
    },
    h1: {
        fontSize: 25,
        fontWeight: "600",
    },
    greyTxt: {
        color: grey,
    },
});
