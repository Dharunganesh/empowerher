import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  TextInput,
  Switch,
  List,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  const [name, setName] = useState('Sarah Johnson');
  const [phone, setPhone] = useState('+1234567890');
  const [locationSharing, setLocationSharing] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleSaveProfile = () => {
    Alert.alert('Success', 'Profile settings saved successfully');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={{ uri: 'https://placekitten.com/200/200' }}
          style={styles.avatar}
        />
        <Title style={styles.name}>{name}</Title>
      </View>

      <Card style={styles.section}>
        <Card.Content>
          <Title>Personal Information</Title>
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Content>
          <Title>Emergency Contacts</Title>
          <List.Item
            title="Add Emergency Contact"
            left={() => <Icon name="plus-circle" size={24} color="#FF4B8C" />}
            onPress={() => Alert.alert('Add Contact', 'Feature coming soon')}
          />
          <List.Item
            title="Mom"
            description="+1234567890"
            left={() => <Icon name="account-heart" size={24} color="#FF4B8C" />}
            right={() => (
              <TouchableOpacity>
                <Icon name="pencil" size={24} color="#666" />
              </TouchableOpacity>
            )}
          />
          <List.Item
            title="Sister"
            description="+1234567891"
            left={() => <Icon name="account-heart" size={24} color="#FF4B8C" />}
            right={() => (
              <TouchableOpacity>
                <Icon name="pencil" size={24} color="#666" />
              </TouchableOpacity>
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.section}>
        <Card.Content>
          <Title>Safety Settings</Title>
          <List.Item
            title="Location Sharing"
            description="Share location with trusted contacts"
            right={() => (
              <Switch
                value={locationSharing}
                onValueChange={setLocationSharing}
                color="#FF4B8C"
              />
            )}
          />
          <List.Item
            title="Safety Notifications"
            description="Receive alerts about unsafe areas"
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color="#FF4B8C"
              />
            )}
          />
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleSaveProfile}
        style={styles.saveButton}
      >
        Save Changes
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    margin: 16,
    marginTop: 8,
  },
  input: {
    marginBottom: 12,
  },
  saveButton: {
    margin: 16,
    marginTop: 8,
    backgroundColor: '#FF4B8C',
    padding: 8,
  },
});

export default ProfileScreen; 