import React, { useEffect } from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "../screens/LoginScreen";
import RegistatrionScreen from "../screens/RegistatrionScreen";
import HomeScreen from "../screens/HomeScreen";
import DashboadScreen from "../screens/Admin/DashboadScreen";
import LoadingScreen from "../screens/LoadingScreen";
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import { loadToken } from "../redux/slices/userSlice";

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { user, token} = useAppSelector((state) => state.user);
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     const initializeAuth = async () => {
    //         await dispatch(loadToken());
    //     };
    //     initializeAuth();
    // }, [dispatch, token]);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="loading" component={LoadingScreen} />
            {!token || !user ? (
                    <>
                        <Stack.Screen name="login" component={LoginScreen} />
                        <Stack.Screen name="register" component={RegistatrionScreen} />
                    </>
                ) : user.role === "admin" ? (
                    <Stack.Screen name="dashboard" component={DashboadScreen} />
                ) : (
                    <>
                        <Stack.Screen name="home" component={HomeScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;