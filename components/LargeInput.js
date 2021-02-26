import React from "react";
import { StyleSheet, TextInput } from "react-native";
//iport colors
import colors from "../assets/colors";
const { red, grey, white } = colors;

export default function LargeInput({ placeholder, setFunction, value }) {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            multiline={true}
            editable
            maxLength={200}
            onChangeText={(text) => {
                setFunction(text);
            }}
            value={value && value}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: red,
        borderWidth: 1,
        width: "70%",
        height: 100,
        marginTop: 20,
        padding: 10,
    },
});
