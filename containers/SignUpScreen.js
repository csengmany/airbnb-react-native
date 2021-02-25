import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import axios from "axios";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import colors
import colors from "../assets/colors";
const { red, grey, white } = colors;

// import components
import Logo from "../components/Logo";
import MainTitle from "../components/MainTitle";
import Input from "../components/Input";
import LargeInput from "../components/LargeInput";
import ConnectionButton from "../components/ConnectionButton";
import RedirectButton from "../components/RedirectButton";

export default function SignUpScreen({ setToken }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [visibility, setVisibility] = useState(true);
    const [visibility2, setVisibility2] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const submit = async () => {
        setError("");
        if (email && username && description && password && confirmPassword) {
            if (password === confirmPassword) {
                try {
                    setIsLoading(true);
                    const response = await axios.post(
                        "https://express-airbnb-api.herokuapp.com/user/sign_up",
                        { email, username, password, description }
                    );
                    console.log(response.data.token);

                    // const userToken = "secret-token";
                    // setToken(userToken);
                    // setIsLoading(false);
                    if (response.data) {
                        // alert("Successful registration");
                        setToken(response.data.token);
                    } else {
                        setError("An error occurred");
                    }
                    setIsLoading(false);
                } catch (error) {
                    console.log(error.response.data.error);

                    const message = error.response.data.error;

                    if (message === "This email already has an account.") {
                        setError(message);
                    } else if (
                        message === "This username already has an account."
                    ) {
                        setError(message);
                    }
                }
            } else {
                setError("Password must be the same");
            }
        } else {
            setError("Please fill all fields");
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                <Logo />
                <MainTitle text="Sign up" />

                <Input placeholder="email" setFunction={setEmail} />
                <Input placeholder="username" setFunction={setUsername} />
                <LargeInput setFunction={setDescription} />
                <Input
                    placeholder="password"
                    secure={visibility}
                    setSecure={setVisibility}
                    setFunction={setPassword}
                />
                <Input
                    placeholder="confirm password"
                    secure={visibility2}
                    setSecure={setVisibility2}
                    setFunction={setConfirmPassword}
                />

                <Text style={styles.errorMessage}>{error}</Text>

                <ConnectionButton text="Sign up" submitFunction={submit} />
                {isLoading && (
                    <View>
                        <ActivityIndicator size="large" color={red} />
                    </View>
                )}
                <RedirectButton
                    text="Already have an account? Sign in"
                    screen="SignIn"
                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: white,
    },
    scrollView: {
        marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    },
    scrollViewContent: {
        alignItems: "center",
    },
    errorMessage: {
        color: red,
        marginTop: 20,
        fontSize: 12,
    },
});
