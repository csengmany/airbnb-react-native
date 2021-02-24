import React from "react";
import { StyleSheet, View, Image } from "react-native";

export default function Logo() {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        marginTop: 50,
        marginBottom: 20,
        height: 100,
    },
});
