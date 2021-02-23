import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

// import colors
import colors from "../assets/colors";
const { red, grey, white } = colors;
// import components
import SignButtons from "../components/SignButtons";
import TopView from "../components/TopView";
import Input from "../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function SignInScreen({ setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [visibility, setVisibility] = useState(true);

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: white }}>
            <View style={styles.container}>
                <TopView title="Sign in" />

                <Input
                    placeholder="email"
                    boolean={false}
                    onChangeText={(email) => {
                        console.log("email", email);
                        setEmail(email);
                    }}
                />
                <Input
                    placeholder="password"
                    boolean={visibility}
                    setBoolean={setVisibility}
                    onChangeText={(password) => {
                        console.log("password", password);
                        setPassword(password);
                    }}
                />

                <Text style={styles.errorMessage}>{message}</Text>

                <SignButtons
                    setToken={setToken}
                    name="Sign in"
                    or="No account ? Register"
                    to="SignUp"
                    email={email}
                    password={password}
                    setMessage={setMessage}
                    request="https://express-airbnb-api.herokuapp.com/user/log_in"
                    headers={{ email: email, password: password }}
                />
            </View>
        </KeyboardAwareScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: white,
    },
    errorMessage: {
        color: red,
        marginVertical: 10,
    },
});
