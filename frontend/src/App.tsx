import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const theme = {
    colors: {
      primary: '#FF4B8C',
      accent: '#4A90E2',
      background: isDarkMode ? '#000000' : '#FFFFFF',
      surface: isDarkMode ? '#121212' : '#FFFFFF',
      text: isDarkMode ? '#FFFFFF' : '#000000',
      error: '#FF0000',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={theme.colors.background}
          />
          <AppNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
