import React from 'react';
import { Stack } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: '#fff',
        headerLeft: ()=> <View/>,
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleLeft}>MAKS</Text>
            <Text style={styles.headerTitleRight}>NEWS</Text>
          </View>
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff', 
    height: 80, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20, 
  },
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleLeft: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EC3636',
    marginRight: 10, 
  },
  headerTitleRight: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000', 
  },
});
