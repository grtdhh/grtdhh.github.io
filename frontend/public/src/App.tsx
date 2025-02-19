import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import AudioGuideScreen from './screens/AudioGuideScreen';
import UserProfileScreen from './screens/UserProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: '敦煌莫高窟智能导游' }}
          />
          <Stack.Screen 
            name="Map" 
            component={MapScreen}
            options={{ title: '实时导览地图' }}
          />
          <Stack.Screen 
            name="AudioGuide" 
            component={AudioGuideScreen}
            options={{ title: '语音讲解' }}
          />
          <Stack.Screen 
            name="Profile" 
            component={UserProfileScreen}
            options={{ title: '个人中心' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App; 