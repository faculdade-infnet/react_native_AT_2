// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';  // Certifique-se de que o caminho está correto
import ImageDetailsScreen from './screens/ImageDetailsScreen';  // Certifique-se de que o caminho está correto

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Detalhes da Imagem" component={ImageDetailsScreen} />
</Stack.Navigator>
    </NavigationContainer>
  );
}
