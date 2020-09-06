import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Drawer from './Drawer';
const Stack = createStackNavigator();

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Root" component={Drawer} />
    </Stack.Navigator>
  );
};
