import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

import HomeScreen from '../screens/HomeScreen';
import SafeRouteScreen from '../screens/SafeRouteScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthScreen from '../screens/AuthScreen';
import SecuritySetupScreen from '../screens/SecuritySetupScreen';
import SecurityCheckScreen from '../screens/SecurityCheckScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isLoading, needsSecurityCheck } = useAuth();

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