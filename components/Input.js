import React from "react";
import { TextInput, StyleSheet, View, Dimensions } from "react-native";
// import colors
import colors from "../assets/colors";
const { red, grey, white, lightGrey } = colors;

import { Ionicons } from "@expo/vector-icons";
const width = Dimensions.get("window").width;

const Input = ({ placeholder, boolean, setBoolean, onChangeText }) => {
    return (
        <View style={styles.horizontal}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                secureTextEntry={boolean}
                onChangeText={onChangeText}
            />
            {(placeholder === "password" ||
                placeholder === "confirm password") && (
                <Ionicons
                    name={boolean ? "eye" : "eye-off"}
                    size={24}
                    color={lightGrey}
                    onPress={() => {
                        setBoolean(!boolean);
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
        borderBottomWidth: 1,
        borderBottomColor: red,
        padding: 10,
        width: 200,
    },
    horizontal: {
        flexDirection: "row",
        width: width,
        justifyContent: "center",
        alignItems: "center",
    },
    eye: {
        marginLeft: -30,
        marginTop: 3,
    },
});
