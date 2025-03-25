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
  useTheme,
} from 'react-native-paper';
import authService from '../services/authService';
import securityService from '../services/securityService';

interface AuthScreenProps {
  navigation: any;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();

  const handleAuth = async () => {
    try {
      setLoading(true);
      setError('');

      if (isLogin) {
        // Login
        const response = await authService.login({ email, password });
        // After successful login, check if PIN/biometric is enabled
        const securitySettings = await securityService.getSecuritySettings();
        if (securitySettings.pinEnabled || securitySettings.biometricEnabled) {
          navigation.navigate('SecurityCheck');
        } else {
          navigation.navigate('Home');
        }
      } else {
        // Register
        const response = await authService.register({
          email,
          password,
          name,
          phoneNumber,
        });
        // After registration, set up security settings
        navigation.navigate('SecuritySetup');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
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
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Text>

          {!isLogin && (
            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              autoCapitalize="words"
            />
          )}

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {!isLogin && (
            <TextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              mode="outlined"
              style={styles.input}
              keyboardType="phone-pad"
            />
          )}

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            mode="contained"
            onPress={handleAuth}
            loading={loading}
            style={styles.button}
            disabled={loading}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>

          <Button
            mode="text"
            onPress={() => setIsLogin(!isLogin)}
            style={styles.switchButton}
          >
            {isLogin
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
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
  button: {
    marginTop: 8,
  },
  switchButton: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default AuthScreen; 