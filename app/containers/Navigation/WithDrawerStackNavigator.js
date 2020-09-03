import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabs } from './BottomTabs';
const Stack = createStackNavigator();

export const WithDrawerStackNavigator = () => {
  const getHeaderTitle = (route) => {
    const routeName = route.state ? route.state.routes[route.state.index].name : 'Home';

    switch (routeName) {
      case 'Home':
        return 'Trang chủ';
      case 'Categories':
        return 'Thể loại';
      case 'Library':
        return 'Thư viện';
      case 'Comunicate':
        return 'Cộng đồng';
      case 'User':
        return 'Cá Nhân';
    }
  };

  return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={BottomTabs}
        options={({ route }) => {
          return { headerTitle: getHeaderTitle(route) };
        }}
      />
    </Stack.Navigator>
  );
};
