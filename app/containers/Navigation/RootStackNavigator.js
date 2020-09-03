import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { WithDrawerStackNavigator } from './WithDrawerStackNavigator';
import { Text } from 'react-native-paper';
const Stack = createStackNavigator();

export const RootStackNavigator = () => {
  const getHeaderTitle = (route) => {
    const routeName = route.state ? route.state.routes[route.state.index].name : 'Home';
  };
  
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        header: () => (
          <>
            <Text>Header</Text>
          </>
        ),
      }}>
      <Stack.Screen
        name="Home"
        component={WithDrawerStackNavigator}
        options={({ route }) => {
          return { headerTitle: getHeaderTitle(route) };
        }}
      />
    </Stack.Navigator>
  );
};
