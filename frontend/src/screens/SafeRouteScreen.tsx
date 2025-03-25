import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SafeRouteScreen = () => {
  const [destination, setDestination] = useState('');
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: 'Recommended Safe Route',
      duration: '25 mins',
      distance: '2.3 km',
      safety_score: '95%',
      description: 'Well-lit streets with regular police patrols',
    },
    {
      id: 2,
      name: 'Alternative Route',
      duration: '20 mins',
      distance: '2.1 km',
      safety_score: '85%',
      description: 'Moderate traffic, mixed residential area',
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          label="Enter Destination"
          value={destination}
          onChangeText={setDestination}
          right={<TextInput.Icon icon="map-marker" />}
          style={styles.input}
        />
        <Button 
          mode="contained" 
          onPress={() => {}} 
          style={styles.searchButton}
        >
          Find Routes
        </Button>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <ScrollView style={styles.routesContainer}>
        {routes.map((route) => (
          <Card key={route.id} style={styles.routeCard}>
            <Card.Content>
              <Title>{route.name}</Title>
              <View style={styles.routeDetails}>
                <View style={styles.routeInfo}>
                  <Icon name="clock-outline" size={20} color="#666" />
                  <Paragraph>{route.duration}</Paragraph>
                </View>
                <View style={styles.routeInfo}>
                  <Icon name="map-marker-distance" size={20} color="#666" />
                  <Paragraph>{route.distance}</Paragraph>
                </View>
                <View style={styles.routeInfo}>
                  <Icon name="shield-check" size={20} color="#666" />
                  <Paragraph>{route.safety_score}</Paragraph>
                </View>
              </View>
              <Paragraph>{route.description}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => {}}>Select Route</Button>
              <Button onPress={() => {}}>Details</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    marginBottom: 8,
  },
  searchButton: {
    backgroundColor: '#FF4B8C',
  },
  map: {
    height: 300,
  },
  routesContainer: {
    flex: 1,
    padding: 16,
  },
  routeCard: {
    marginBottom: 16,
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

export default SafeRouteScreen; 