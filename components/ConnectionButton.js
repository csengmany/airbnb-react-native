import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import colors
import colors from "../assets/colors";
const { red, grey, white } = colors;
export default function ConnectionButton({ text, submitFunction, color }) {
    return (
        <TouchableOpacity
            style={color ? [styles.btn, styles.bg] : styles.btn}
            onPress={() => {
                submitFunction();
            }}
        >
            <Text style={color ? [styles.text, styles.color] : styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: grey,
        textAlign: "center",
    },
    btn: {
        height: 50,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: red,
        borderRadius: 50,
        marginVertical: 10,
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
    color: {
        color: white,
    },
    bg: {
        backgroundColor: red,
    },
});
