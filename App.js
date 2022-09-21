import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from'react-native-maps';

export default function App() {
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({
    name: 'Haaga-Helia',
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const showMap = () => {
    let key = 'EAJgHWDo0rpGAnA6kGbhO4GmYnNYNsy7'
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${address}&maxResults=1`)
    .then(response => response.json())
    .then(res => {
      setRegion({
        ...region,
        name: res.results[0].providedLocation.location,
        latitude: res.results[0].locations[0].latLng.lat,
        longitude: res.results[0].locations[0].latLng.lng
      })
    })
  }

  return (
    <View style={styles.container}>

      <MapView
        style={{ flex: 1, height: '75%'}}
        region={region}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude
          }}
          title={region.name}
        />
      </MapView>
      
      <View style={styles.viewSearch}>
        <TextInput
          style={styles.addressInput}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <Button
          style={{ width: '75%' }}
          title="Show"
          onPress={showMap}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewSearch: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressInput: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    width: '75%',
  },
});
