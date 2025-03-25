import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Button, FAB, Text } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type RootStackParamList = {
  Home: undefined;
  SafeRoute: undefined;
  Emergency: undefined;
  Profile: undefined;
};

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth === 'granted') {
          getCurrentLocation();
        }
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          ...location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        Alert.alert('Error', 'Location not found');
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleEmergency = () => {
    Alert.alert(
      'Emergency',
      'Do you want to trigger emergency alert?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => navigation.navigate('Emergency'),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={location}
        showsUserLocation
        showsMyLocationButton
      />
      
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('SafeRoute')}
          style={styles.button}
          icon="map-marker-path"
        >
          Find Safe Route
        </Button>
      </View>

      <FAB
        style={styles.fab}
        icon="alert"
        label="SOS"
        color="#fff"
        onPress={handleEmergency}
      />

      <TouchableOpacity
        style={styles.shareLocation}
        onPress={() => Alert.alert('Share Location', 'Location sharing activated')}
      >
        <Icon name="share-variant" size={24} color="#fff" />
        <Text style={styles.shareText}>Share Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#FF4B8C',
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF0000',
  },
  shareLocation: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 