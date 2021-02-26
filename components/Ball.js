import React from "react";
import { Button, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export default class Ball extends React.Component {
    componentDidMount() {
        this.animation.play(30, 120);
        // Or set a specific startFrame and endFrame with:
        // this.animation.play(30, 120);
    }

    resetAnimation = () => {
        this.animation.reset();
        this.animation.play();
    };

    render() {
        return (
            <View style={styles.animationContainer}>
                <LottieView
                    ref={(animation) => {
                        this.animation = animation;
                    }}
                    style={{
                        width: 400,
                        height: 400,
                        backgroundColor: "#fff",
                    }}
                    source={require("../assets/ball.json")}
                    // OR find more Lottie files @ https://lottiefiles.com/featured
                    // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
});
