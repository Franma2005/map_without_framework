/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { locationHook } from './src/locationHook.ts';
import MapView, { Marker, UrlTile } from 'react-native-maps';
function App() {
  const { latitude, longitude } = locationHook();


  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={{ flex: 1 }}>
        {/* Si location está lleno, se muestra el mapa */}
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: latitude,  // Latitud obtenida del hook
            longitude: longitude, // Longitud obtenida del hook
            latitudeDelta: 0.0922,  // Nivel de zoom
            longitudeDelta: 0.0421, // Nivel de zoom
          }}
        >
          {/* Cargar OpenStreetMap como capa de tiles */}
          <UrlTile
            urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}  // Nivel máximo de zoom
          />

          {/* Coloca un marcador en la ubicación actual */}
          <Marker coordinate={{ latitude, longitude }} />
        </MapView>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  mapView: {
    flex: 1,
  }
});

export default App;
