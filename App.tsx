/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { locationHook } from './src/locationHook.ts';

function App() {
  const {latitude, longitude} = locationHook();

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View>
        <Text>
          La latitud es: {latitude}
        </Text>
        <Text>
          La longitud es: {longitude}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
