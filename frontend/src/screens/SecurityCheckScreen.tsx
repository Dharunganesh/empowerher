import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Surface,
  useTheme,
} from 'react-native-paper';
import securityService from '../services/securityService';
import authService from '../services/authService';

interface SecurityCheckScreenProps {
  navigation: any;
}

const SecurityCheckScreen: React.FC<SecurityCheckScreenProps> = ({
  navigation,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [securitySettings, setSecuritySettings] = useState<any>(null);
  const theme = useTheme();

  useEffect(() => {
    loadSecuritySettings();
  }, []);

  const loadSecuritySettings = async () => {
    try {
      const settings = await securityService.getSecuritySettings();
      setSecuritySettings(settings);
    } catch (err) {
      console.error('Error loading security settings:', err);
    }
  };

  const handleSecurityCheck = async () => {
    try {
      setLoading(true);
      setError('');

      if (securitySettings?.pinEnabled) {
        const isValid = await securityService.validatePin(pin);
        if (!isValid) {
          setError('Invalid PIN');
          return;
        }
      }

      // Update last activity
      await securityService.updateLastActivity();
      
      navigation.navigate('Home');
    } catch (err: any) {
      setError(err.message || 'Security check failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigation.navigate('Auth');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  if (!securitySettings) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Surface style={styles.surface}>
          <Text variant="headlineMedium" style={styles.title}>
            Security Check
          </Text>

          {securitySettings.pinEnabled && (
            <TextInput
              label="Enter PIN"
              value={pin}
              onChangeText={setPin}
              mode="outlined"
              style={styles.input}
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
            />
          )}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            mode="contained"
            onPress={handleSecurityCheck}
            loading={loading}
            style={styles.button}
            disabled={loading}
          >
            Verify
          </Button>

          <Button
            mode="text"
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </Button>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  surface: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  logoutButton: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default SecurityCheckScreen; 