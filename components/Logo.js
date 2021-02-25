import React from "react";
import { StyleSheet, View, Image } from "react-native";

export default function Logo({ size }) {
    return (
        <Image
            source={require("../assets/logo.png")}
            style={[size ? { width: size, height: size } : styles.logo]}
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
