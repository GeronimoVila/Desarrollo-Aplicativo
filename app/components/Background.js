import { View, ImageBackground } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
        <ImageBackground 
          style={styles.background}
          source={{uri: ''}}
        >
          <text>Hola Mundo!</text>
            [children]
        </ImageBackground>
    </View>
  );
}