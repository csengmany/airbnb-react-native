import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import colors
import colors from "../assets/colors";
const { red, grey, white } = colors;

export default function RedirectButton({ text, screen }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(screen);
            }}
        >
            <Text style={[styles.text, styles.xs]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: grey,
        textAlign: "center",
    },
});
