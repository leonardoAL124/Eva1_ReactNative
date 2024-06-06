import { StyleSheet, View } from 'react-native';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { Navigation } from './src/navigator/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Navigation/>
      </PaperProvider>
    </NavigationContainer>
  );
}