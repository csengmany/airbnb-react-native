import React from "react";
import { TextInput, StyleSheet, View, Dimensions } from "react-native";
// import colors
import colors from "../assets/colors";
const { red, grey, white, lightGrey } = colors;

import { Ionicons } from "@expo/vector-icons";
const width = Dimensions.get("window").width;

const Input = ({ placeholder, setFunction, secure, setSecure, value }) => {
    return (
        <View style={styles.horizontal}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                // secureTextEntry={boolean}
                onChangeText={(text) => {
                    setFunction(text);
                }}
                secureTextEntry={secure}
                value={value && value}
            />
            {(placeholder === "password" ||
                placeholder === "confirm password") && (
                <Ionicons
                    name={secure ? "eye" : "eye-off"}
                    size={24}
                    color={lightGrey}
                    onPress={() => {
                        setSecure(!secure);
                    }}
                    style={styles.eye}
                />
            )}
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderBottomColor: red,
        borderBottomWidth: 1,
        width: "70%",
        height: 40,
        marginTop: 20,
        position: "relative",
    },
    horizontal: {
        flexDirection: "row",
        width: width,
        justifyContent: "center",
        alignItems: "center",
    },
    eye: {
        top: 30,
        right: 60,
        position: "absolute",
    },
});
