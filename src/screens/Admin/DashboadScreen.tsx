import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUser } from '../../redux/slices/userSlice';

const DashboadScreen = () => {
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector((state: any) => state.user);


  const handleLogout =()=> {
    dispatch(logoutUser());
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to Admin Dashboad</Text>
        <Button title="Logout" onPress={handleLogout} disabled={loading} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' },
    title: { fontSize: 24, textAlign: 'center', color: 'black' },    
});

export default DashboadScreen;