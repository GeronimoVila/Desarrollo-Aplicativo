import '@expo/metro-runtime';
import { Text, View } from 'react-native';
import Background from './components/Background.js';

export default function App() {
  return (
    <Background>
      <View style={styles.container}>
        <Login/>
      </View>
    </Background>
  );
}