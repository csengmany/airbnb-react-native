import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
// import components
import ConnectionButton from "../components/ConnectionButton";
import Input from "../components/Input";
import LargeInput from "../components/LargeInput";

export default function ProfileScreen({ setToken, setId, userId, token }) {
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const logOut = () => {
        setToken(null);
        setId(null);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://express-airbnb-api.herokuapp.com/user/${userId}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setUserName(response.data.username);
                setEmail(response.data.email);
                setDescription(response.data.description);
                console.log(response.data);
                setIsLoading(false);
            } catch (error) {
                // console.log(error.response.data.error);
                alert("An error occured");
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text>user id : {userId}</Text>
            <Input value={email} setFunction={setEmail} />
            <Input value={userName} setFunction={setUserName} />
            <LargeInput value={description} setFunction={setDescription} />
            <ConnectionButton text="Update" />
            <ConnectionButton
                text="Log Out"
                submitFunction={logOut}
                color={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
