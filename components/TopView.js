import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
// import colors
import colors from "../assets/colors";
const { red, grey, white } = colors;

const TopView = ({ title }) => {
    return (
        <View style={styles.topView}>
            <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
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
    logo: {
        marginTop: 50,
        marginBottom: 20,
        height: 100,
    },
    h1: {
        fontSize: 25,
        fontWeight: "600",
    },
    greyTxt: {
        color: grey,
    },
});
