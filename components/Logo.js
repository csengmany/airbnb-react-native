import React from "react";
import { StyleSheet, View, Image } from "react-native";

export default function Logo() {
    return (
        <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
        />
    );
}
const styles = StyleSheet.create({
    logo: {
        height: 100,
        width: 100,
    },
});
