import React from "react";

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
} from "react-native";
// import colors
import colors from "../assets/colors";
const { red, grey, white } = colors;
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

import { useState } from "react/cjs/react.development";
const width = Dimensions.get("window").width;
const SignButtons = ({
    setToken,
    name,
    or,
    to,
    email,
    password,
    setMessage,
    request,
    headers,
    confirmPassword,
    username,
    description,
}) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const handlePressBtn = async () => {
        if (
            (email && password) ||
            (request ===
                "https://express-airbnb-api.herokuapp.com/user/sign_up" &&
                username &&
                description &&
                confirmPassword)
        ) {
            if (
                request ===
                    "https://express-airbnb-api.herokuapp.com/user/sign_up" &&
                password !== confirmPassword
            ) {
                setMessage("Passwords different !");
            } else {
                setMessage("");
                try {
                    setIsLoading(true);

                    const response = await axios.post(request, headers);
                    console.log(response);
                    const userToken = "secret-token";
                    setToken(userToken);
                    setIsLoading(false);

                    alert(
                        request ===
                            "https://express-airbnb-api.herokuapp.com/user/sign_up"
                            ? "Successful registration"
                            : "You are connected"
                    );
                } catch (error) {
                    console.log(error.response.data.error);
                    setMessage(error.response.data.error);
                }
            }
        }
    };

    return (
        <View styles={styles.btnContainer}>
            {isLoading && (
                <View>
                    <ActivityIndicator size="large" color={red} />
                </View>
            )}
            <View style={styles.centerSection}>
                <TouchableOpacity
                    style={[styles.redBtn, styles.widthBtn]}
                    onPress={handlePressBtn}
                    disabled={isLoading}
                >
                    <Text style={styles.greyTxt}>{name}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(to);
                }}
            >
                <Text style={[styles.greyTxt, styles.xs]}>{or}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    greyTxt: {
        color: grey,
        textAlign: "center",
    },
    centerSection: {
        width: width,
        justifyContent: "center",
        alignItems: "center",
    },
    redBtn: {
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: red,
        borderRadius: 50,
        padding: 10,
        marginVertical: 10,
        width: 140,
    },

    xs: {
        fontSize: 12,
        marginTop: 5,
    },
});

export default SignButtons;
