import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

import color from 'color';

import HomeScreen from '../Home';
import CategoryScreen from '../Categories';
import AccountScreen from '../Account';
import LibraryScreen from '../Library';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = (props) => {
  const theme = useTheme();

  const tabBarColor = color(theme.colors.purple).lighten(0.05);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      shifting={true}
      barStyle={{ backgroundColor: theme.colors.darkPurple }}
      activeColor={theme.colors.yellow}
      sceneAnimationEnabled={false}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: 'home',
          tabBarColor,
          title: 'Trang chủ',
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
          tabBarIcon: 'view-list',
          tabBarColor,
          title: 'Thể loại',
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: 'library',
          tabBarColor,
          title: 'Thư viện',
        }}
      />
      {/* <Tab.Screen
        name="Comunicate"
        component={HomeScreen}
        options={{
          tabBarIcon: 'view-dashboard',
          tabBarColor,
          title: 'Cộng đồng',
        }}
      /> */}
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: 'account-box',
          tabBarColor,
          title: 'Cá Nhân',
        }}
      />
    </Tab.Navigator>
  );
};
