import React, { useState } from 'react';
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
  Switch,
  useTheme,
} from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

interface SecuritySetupScreenProps {
  navigation: any;
}

const SecuritySetupScreen: React.FC<SecuritySetupScreenProps> = ({
  navigation,
}) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinEnabled, setPinEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { updateSecuritySettings } = useAuth();

  const handleSetup = async () => {
    try {
      setLoading(true);
      setError('');

      if (pinEnabled) {
        if (pin.length !== 4) {
          setError('PIN must be 4 digits');
          return;
        }
        if (pin !== confirmPin) {
          setError('PINs do not match');
          return;
        }
      }

      await updateSecuritySettings({
        pinEnabled,
        biometricEnabled,
        pin: pinEnabled ? pin : undefined,
        autoLogoutMinutes: 30,
      });

      navigation.navigate('Home');
    } catch (err: any) {
      setError(err.message || 'Failed to set up security');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Surface style={styles.surface}>
          <Text variant="headlineMedium" style={styles.title}>
            Security Setup
          </Text>

          <View style={styles.switchContainer}>
            <Text>Enable PIN Protection</Text>
            <Switch
              value={pinEnabled}
              onValueChange={setPinEnabled}
              color={theme.colors.primary}
            />
          </View>

          {pinEnabled && (
            <>
              <TextInput
                label="Enter 4-digit PIN"
                value={pin}
                onChangeText={setPin}
                mode="outlined"
                style={styles.input}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
              />

              <TextInput
                label="Confirm PIN"
                value={confirmPin}
                onChangeText={setConfirmPin}
                mode="outlined"
                style={styles.input}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
              />
            </>
          )}

          <View style={styles.switchContainer}>
            <Text>Enable Biometric Authentication</Text>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              color={theme.colors.primary}
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            mode="contained"
            onPress={handleSetup}
            loading={loading}
            style={styles.button}
            disabled={loading}
          >
            Set Up Security
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate('Home')}
            style={styles.skipButton}
          >
            Skip for Now
          </Button>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  skipButton: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default SecuritySetupScreen; 