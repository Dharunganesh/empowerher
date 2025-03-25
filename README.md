# EmpowerHer - Women's Safety App (Frontend)

A React Native mobile application designed to enhance women's safety while traveling by providing safe route suggestions, real-time location sharing, and emergency assistance features.

## Features

- **Safe Route Planning**
  - Intelligent route suggestions avoiding unsafe areas
  - Alternative route options with safety scores
  - Interactive map interface

- **Location Sharing**
  - Share live location with trusted contacts
  - Real-time location tracking interface
  - Location history visualization

- **Emergency Assistance**
  - One-tap SOS button
  - Emergency contacts management
  - Quick access to emergency services
  - Safety tips and guidelines

- **Profile Management**
  - User profile customization
  - Emergency contacts management
  - Safety preferences settings

## Technical Stack

- React Native
- React Navigation
- React Native Maps
- React Native Paper (UI Components)
- TypeScript
- Axios for API calls

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)
- Google Maps API Key

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/empower-her-frontend.git
   cd empower-her-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```
   GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Run the application:
   ```bash
   # For iOS
   npm run ios
   # or
   yarn ios

   # For Android
   npm run android
   # or
   yarn android
   ```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── screens/         # Main application screens
├── navigation/      # Navigation configuration
├── assets/         # Images, fonts, and other static files
├── styles/         # Global styles and themes
└── utils/          # Utility functions and helpers
```

## Available Scripts

- `npm start` - Start the Metro bundler
- `npm run android` - Run the Android app
- `npm run ios` - Run the iOS app
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Contributing

We welcome contributions to improve the app's frontend. Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Safety Disclaimer

This app's frontend is designed to provide a user interface for safety features but should be integrated with appropriate backend services for full functionality. The frontend alone does not guarantee safety.
