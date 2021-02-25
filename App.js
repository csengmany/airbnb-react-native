import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import navagiation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import bottom tab navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
// import containers
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import MapScreen from "./containers/MapScreen";
import RoomScreen from "./containers/RoomScreen";
// import components
import Logo from "./components/Logo";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const setToken = async (token) => {
        if (token) {
            AsyncStorage.setItem("userToken", token);
        } else {
            AsyncStorage.removeItem("userToken");
        }

        setUserToken(token);
    };

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            // We should also handle error for production apps
            const userToken = await AsyncStorage.getItem("userToken");

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            setIsLoading(false);
            setUserToken(userToken);
        };

        bootstrapAsync();
    }, []);

    return (
        <NavigationContainer>
            {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
                // No token found, user isn't signed in
                <Stack.Navigator headerMode="none">
                    <Stack.Screen
                        name="SignIn"
                        options={{ animationEnabled: false }}
                    >
                        {() => <SignInScreen setToken={setToken} />}
                    </Stack.Screen>
                    <Stack.Screen name="SignUp">
                        {() => <SignUpScreen setToken={setToken} />}
                    </Stack.Screen>
                </Stack.Navigator>
            ) : (
                // User is signed in
                <Stack.Navigator>
                    <Stack.Screen
                        name="Tab"
                        options={{
                            headerShown: false,
                            animationEnabled: false,
                        }}
                    >
                        {() => (
                            <Tab.Navigator
                                tabBarOptions={{
                                    activeTintColor: "tomato",
                                    inactiveTintColor: "gray",
                                }}
                            >
                                <Tab.Screen
                                    name="Home"
                                    options={{
                                        tabBarLabel: "Home",
                                        tabBarIcon: ({ color, size }) => (
                                            <Ionicons
                                                name={"ios-home"}
                                                size={size}
                                                color={color}
                                            />
                                        ),
                                    }}
                                >
                                    {() => (
                                        <Stack.Navigator>
                                            <Stack.Screen
                                                name="Home"
                                                options={{
                                                    headerTitle: (props) => (
                                                        <Logo
                                                            {...props}
                                                            size={30}
                                                        />
                                                    ),
                                                    headerTitleAlign: "center",
                                                }}
                                            >
                                                {(props) => (
                                                    <HomeScreen {...props} />
                                                )}
                                            </Stack.Screen>
                                            <Stack.Screen
                                                name="Room"
                                                options={{
                                                    animationEnabled: false,
                                                }}
                                            >
                                                {(props) => (
                                                    <RoomScreen {...props} />
                                                )}
                                            </Stack.Screen>

                                            {/* <Stack.Screen
                                                name="Profile"
                                                options={{
                                                    title: "User Profile",
                                                }}
                                            >
                                                {() => <ProfileScreen />}
                                            </Stack.Screen> */}
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen>

                                <Tab.Screen
                                    name="Map"
                                    options={{
                                        tabBarLabel: "Around me",
                                        tabBarIcon: ({ color, size }) => (
                                            <FontAwesome
                                                name="map-marker"
                                                size={size}
                                                color={color}
                                            />
                                        ),
                                    }}
                                >
                                    {() => (
                                        <Stack.Navigator>
                                            <Stack.Screen
                                                name="Map"
                                                component={MapScreen}
                                                options={{
                                                    headerTitle: (props) => (
                                                        <Logo
                                                            {...props}
                                                            size={30}
                                                        />
                                                    ),
                                                    headerTitleAlign: "center",
                                                }}
                                            ></Stack.Screen>
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen>

                                <Tab.Screen
                                    name="Profile"
                                    options={{
                                        tabBarLabel: "Profile",
                                        tabBarIcon: ({ color, size }) => (
                                            <FontAwesome5
                                                name="user-alt"
                                                size={size}
                                                color={color}
                                            />
                                        ),
                                    }}
                                >
                                    {() => (
                                        <Stack.Navigator>
                                            <Stack.Screen
                                                name="Profile"
                                                options={{
                                                    headerTitle: (props) => (
                                                        <Logo
                                                            {...props}
                                                            size={30}
                                                        />
                                                    ),
                                                    headerTitleAlign: "center",
                                                    // title: "Profile",
                                                    // tabBarLabel: "Profile",
                                                }}
                                            >
                                                {() => (
                                                    <SettingsScreen
                                                        setToken={setToken}
                                                    />
                                                )}
                                            </Stack.Screen>
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen>

                                {/* <Tab.Screen
                                    name="Settings"
                                    options={{
                                        tabBarLabel: "Settings",
                                        tabBarIcon: ({ color, size }) => (
                                            <Ionicons
                                                name={"ios-options"}
                                                size={size}
                                                color={color}
                                            />
                                        ),
                                    }}
                                >
                                    {() => (
                                        <Stack.Navigator>
                                            <Stack.Screen
                                                name="Settings"
                                                options={{
                                                    title: "Settings",
                                                    tabBarLabel: "Settings",
                                                }}
                                            >
                                                {() => (
                                                    <SettingsScreen
                                                        setToken={setToken}
                                                    />
                                                )}
                                            </Stack.Screen>
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen> */}
                            </Tab.Navigator>
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}
