import React, {useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {loginUser} from '../redux/slices/userSlice';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector((state: any) => state.user);


  const handleLogin = () => {
    dispatch(loginUser({ email, password}))
  };
 

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} disabled={loading} />
        <Button
            title="Don't have an account? Register"
            onPress={() => navigation.navigate('Register')}
        />
    </View>
);
};

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', padding: 16 },
title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
input: { height: 40, borderBottomWidth: 1, marginBottom: 16 },
error: { color: 'red', marginBottom: 16 },
});

export default LoginScreen