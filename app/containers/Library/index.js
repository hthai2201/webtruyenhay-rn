import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'react-native-paper';
import color from 'color';
import HistoryStoryScreen from './HistoryStoryScreen';
import DownloadStoryScreen from './DownloadStoryScreen';

const Tab = createMaterialTopTabNavigator();

const LibraryScreen = ({ navigation }) => {
  const theme = useTheme();

  const tabBarColor = color(theme.colors.darkPurple).string();
  return (
    <Tab.Navigator
      initialRouteName="History"
      backBehavior="initialRoute"
      shifting={true}
      sceneAnimationEnabled={false}
      tabBarOptions={{
        style: {
          backgroundColor: tabBarColor,
        },
        activeTintColor: '#fff',
        //inactiveTintColor: theme.colors.gray,
        labelStyle: {
          fontWeight: 'bold',
          fontSize: 14,
        },
        indicatorStyle: {
          backgroundColor: '#FFF',
        },
      }}>
      <Tab.Screen
        name="History"
        component={HistoryStoryScreen}
        options={{
          params: {
            headerTitle: 'Lịch sử',
          },
          title: 'Lịch sử',
        }}
      />
      <Tab.Screen
        name="Download"
        component={DownloadStoryScreen}
        options={{
          tabBarIcon: 'view-list',
          tabBarColor,
          headerTitle: 'Tải về',
          title: 'Tải về',
        }}
      />
    </Tab.Navigator>
  );
};
export default LibraryScreen;
