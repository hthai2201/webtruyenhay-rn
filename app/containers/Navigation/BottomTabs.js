import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import { useIsFocused, RouteProp } from '@react-navigation/native';
import color from 'color';

import HomeScreen from '../Home';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = (props) => {
  const routeName = props.route.state ? props.route.state.routes[props.route.state.index].name : 'Home';

  const theme = useTheme();
  const safeArea = useSafeArea();
  const isFocused = useIsFocused();

  let icon = 'feather';

  const tabBarColor = color(theme.colors.purple).lighten(0.05);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      shifting={true}
      inactiveColor={theme.colors.blueGreen}
      activeColor={theme.colors.gray}
      sceneAnimationEnabled={false}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: 'home',
          tabBarColor,
          params: {
            headerTitle: 'Trang chủ',
          },
          title: 'Trang chủ',
        }}
      />
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          tabBarIcon: 'home',
          tabBarColor,
          params: {
            headerTitle: 'Trang chủ',
          },
          title: 'Trang chủ',
        }}
      />
    </Tab.Navigator>
  );
};
