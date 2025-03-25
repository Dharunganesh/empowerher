import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import authService from '../services/authService';
import securityService from '../services/securityService';

import HomeScreen from '../screens/HomeScreen';
import SafeRouteScreen from '../screens/SafeRouteScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthScreen from '../screens/AuthScreen';
import SecuritySetupScreen from '../screens/SecuritySetupScreen';
import SecurityCheckScreen from '../screens/SecurityCheckScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [needsSecurityCheck, setNeedsSecurityCheck] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = await authService.getToken();
      if (token) {
        setIsAuthenticated(true);
        // Check if security verification is needed
        const settings = await securityService.getSecuritySettings();
        const shouldCheck = await securityService.checkSessionTimeout();
        setNeedsSecurityCheck(
          (settings.pinEnabled || settings.biometricEnabled) && shouldCheck
        );
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? (needsSecurityCheck ? 'SecurityCheck' : 'Home') : 'Auth'}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FF4B8C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SecuritySetup"
              component={SecuritySetupScreen}
              options={{ title: 'Security Setup' }}
            />
          </>
        ) : (
          // Main App Stack
          <>
            <Stack.Screen
              name="SecurityCheck"
              component={SecurityCheckScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'EmpowerHer' }}
            />
            <Stack.Screen
              name="SafeRoute"
              component={SafeRouteScreen}
              options={{ title: 'Safe Route' }}
            />
            <Stack.Screen
              name="Emergency"
              component={EmergencyScreen}
              options={{ title: 'Emergency' }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'Profile' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 