import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to Home Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' },
    title: { fontSize: 24, textAlign: 'center', color: 'white' },    
});

export default HomeScreen;