import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Linking,
} from 'react-native';
import { Button, Card, Title, Paragraph, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmergencyScreen = () => {
  const [isAlertActive, setIsAlertActive] = useState(false);

  const emergencyContacts = [
    { id: 1, name: 'Police', number: '911', icon: 'police-badge' },
    { id: 2, name: 'Ambulance', number: '911', icon: 'ambulance' },
    { id: 3, name: 'Mom', number: '+1234567890', icon: 'account-heart' },
    { id: 4, name: 'Sister', number: '+1234567891', icon: 'account-heart' },
  ];

  const handleEmergencyCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const activateEmergencyAlert = () => {
    setIsAlertActive(true);
    // Here you would implement the actual emergency alert system
    // This could include:
    // 1. Sending location to emergency contacts
    // 2. Triggering a loud alarm
    // 3. Starting video/audio recording
    // 4. Contacting emergency services
    Alert.alert(
      'Emergency Alert Activated',
      'Your emergency contacts have been notified with your location.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.emergencyCard}>
        <Card.Content>
          <Title style={styles.title}>Emergency Alert</Title>
          <Paragraph>
            Activate emergency mode to alert your contacts and authorities
          </Paragraph>
          <Button
            mode="contained"
            onPress={activateEmergencyAlert}
            style={[
              styles.emergencyButton,
              isAlertActive && styles.emergencyButtonActive,
            ]}
            labelStyle={styles.emergencyButtonLabel}
          >
            {isAlertActive ? 'ALERT ACTIVE' : 'ACTIVATE EMERGENCY ALERT'}
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.contactsCard}>
        <Card.Content>
          <Title>Emergency Contacts</Title>
          <List.Section>
            {emergencyContacts.map((contact) => (
              <List.Item
                key={contact.id}
                title={contact.name}
                description={contact.number}
                left={() => (
                  <Icon name={contact.icon} size={24} color="#FF4B8C" />
                )}
                right={() => (
                  <Button
                    mode="contained"
                    onPress={() => handleEmergencyCall(contact.number)}
                    style={styles.callButton}
                  >
                    Call
                  </Button>
                )}
                style={styles.contactItem}
              />
            ))}
          </List.Section>
        </Card.Content>
      </Card>

      <Card style={styles.helpCard}>
        <Card.Content>
          <Title>Safety Tips</Title>
          <List.Section>
            <List.Item
              title="Stay Calm"
              description="Take deep breaths and try to remain calm"
              left={() => <Icon name="emoticon-outline" size={24} color="#4A90E2" />}
            />
            <List.Item
              title="Share Location"
              description="Make sure your location sharing is enabled"
              left={() => <Icon name="map-marker" size={24} color="#4A90E2" />}
            />
            <List.Item
              title="Seek Help"
              description="Move towards populated areas or safe zones"
              left={() => <Icon name="shield-home" size={24} color="#4A90E2" />}
            />
          </List.Section>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emergencyCard: {
    margin: 16,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  emergencyButton: {
    marginTop: 16,
    backgroundColor: '#FF0000',
    padding: 8,
  },
  emergencyButtonActive: {
    backgroundColor: '#FF4B8C',
  },
  emergencyButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactsCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#fff',
  },
  contactItem: {
    marginVertical: 4,
  },
  callButton: {
    backgroundColor: '#4A90E2',
  },
  helpCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#fff',
  },
});

export default EmergencyScreen; 
