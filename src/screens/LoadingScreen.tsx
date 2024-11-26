import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import store from '../redux/store';
import { loadToken } from '../redux/slices/userSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';

// Get device dimensions
const { width, height } = Dimensions.get('window')

const LoadingScreen = () => {
    const { user, token} = useAppSelector((state) => state.user);
const dispatch = useAppDispatch(); 
// Create an animated value to control opacity
const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0 (fully transparent)

// Use useEffect to start the animation as soon as the component mounts
useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1, // Final opacity value (fully opaque)
    duration: 5000, // Animation duration (2 seconds)
    useNativeDriver: true, // Enable native driver for performance
  }).start();
}, [fadeAnim]);

useEffect(() => {
    console.log(user);
    dispatch(loadToken()); // Load token from AsyncStorage
}, []);

  return (
    <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}} colors={['#0B6477','#80ED99']} style={styles.container}>
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Welcome to Ecom</Animated.Text>
        <Image source={require('../assets/images/logo1.png')} style={styles.logo}/>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        overflow: 'hidden',
        backgroundColor: 'gray'
     },
    title: { 
        fontSize: width * 0.09, 
        textAlign: 'center', 
        color: 'black',
        fontFamily: 'Parkinsans-SemiBold' 
    },
    logo: {
        overflow: 'hidden',
    }    
});

export default LoadingScreen;