import React, { useState } from "react";
import Constants from "expo-constants";
import axios from "axios";
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    Platform,
    StatusBar,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import colors
import colors from "../assets/colors";
const { red, grey, white } = colors;

// import components
import Logo from "../components/Logo";
import MainTitle from "../components/MainTitle";
import Input from "../components/Input";
import ConnectionButton from "../components/ConnectionButton";
import RedirectButton from "../components/RedirectButton";

export default function SignInScreen({ setToken, setId }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visibility, setVisibility] = useState(true);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const submit = async () => {
        if (email && password) {
            if (error !== "") {
                setError("");
            }
            try {
                setIsLoading(true);
                const response = await axios.post(
                    "https://express-airbnb-api.herokuapp.com/user/log_in",
                    { email, password }
                );

                if (response) {
                    // alert("You are connected");
                    setIsLoading(false);
                    setToken(response.data.token);
                    setId(response.data.id);
                } else {
                    setIsLoading(false);
                    setError("An error occurred");
                }
            } catch (error) {
                if (error.response.status === 401) {
                    setError("Incorrect credentials");
                } else {
                    setError("An error occurred");
                }

                setIsLoading(false);
            }
        } else {
            setError("Please fill all fields");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={
                    Platform.OS === "ios" ? "dark-content" : "light-content"
                }
            />
            <KeyboardAwareScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                <Logo />
                <MainTitle text="Sign in" />
                <Input
                    placeholder="email"
                    boolean={false}
                    setFunction={setEmail}
                />
                <Input
                    placeholder="password"
                    secure={visibility}
                    setSecure={setVisibility}
                    setFunction={setPassword}
                />

                <Text style={styles.errorMessage}>{error}</Text>

                <ConnectionButton text="Sign in" submitFunction={submit} />
                {isLoading && (
                    <View>
                        <ActivityIndicator size="large" color={red} />
                    </View>
                )}
                <RedirectButton text="No account? Register" screen="SignUp" />
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
