
// import React from 'react';
// import { Text, View, FlatList} from 'react-native';
// import styles from './Styles';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import GenerationDetail from './GenerationDetail'; 
import PokemonDetail from './PokemonDetail';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './Home';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <NavigationContainer>
    <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="GenerationDetail" component={GenerationDetail} />
      <Stack.Screen name="PokemonDetail" component={PokemonDetail} /> 
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        <Stack.Screen name="GenerationDetail" component={GenerationDetail} />
        <Stack.Screen name="PokemonDetail" component={PokemonDetail} /> 
        
        
      </Tab.Navigator>
    
    </NavigationContainer>
    </GestureHandlerRootView>
    

  );
}


