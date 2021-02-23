import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import SignButtons from "../components/SignButtons";
import TopView from "../components/TopView";
import Input from "../components/Input";

// import colors
import colors from "../assets/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { red, grey, white } = colors;
export default function SignUpScreen({ setToken }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [visibility, setVisibility] = useState(true);
    const [visibility2, setVisibility2] = useState(true);

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: white }}>
            <View style={styles.container}>
                <TopView title="Sign up" />

                <Input
                    placeholder="email"
                    boolean={false}
                    onChangeText={(email) => {
                        setEmail(email);
                    }}
                />
                <Input
                    placeholder="username"
                    boolean={false}
                    onChangeText={(username) => {
                        setUsername(username);
                    }}
                />
                <TextInput
                    style={styles.textArea}
                    placeholder="Describe yourself in a few words..."
                    multiline={true}
                    editable
                    maxLength={200}
                    onChangeText={(description) => {
                        setDescription(description);
                    }}
                />
                <Input
                    placeholder="password"
                    boolean={visibility}
                    setBoolean={setVisibility}
                    onChangeText={(password) => {
                        console.log("pass", password);
                        setPassword(password);
                    }}
                />
                <Input
                    placeholder="confirm password"
                    boolean={visibility2}
                    setBoolean={setVisibility2}
                    onChangeText={(confirmPassword) => {
                        console.log("confirm pass", confirmPassword);
                        setConfirmPassword(confirmPassword);
                    }}
                />

                <Text style={styles.errorMessage}>{message}</Text>
                <SignButtons
                    setToken={setToken}
                    name={"Sign up"}
                    or={"Already have an account ? Sign in"}
                    to={"SignIn"}
                    request="https://express-airbnb-api.herokuapp.com/user/sign_up"
                    headers={{
                        email: email,
                        username: username,
                        description: description,
                        password: password,
                    }}
                    email={email}
                    password={password}
                    setMessage={setMessage}
                    confirmPassword={confirmPassword}
                    username={username}
                    description={description}
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
    textArea: {
        borderColor: red,
        borderWidth: 1,
        padding: 10,
        height: 100,
        width: 200,
        marginVertical: 20,
    },
    errorMessage: {
        color: red,
        marginVertical: 10,
    },
});
