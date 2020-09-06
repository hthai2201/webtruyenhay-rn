import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabs } from './BottomTabs';
import Header from './Header';
import StoryDetailScreen from '../StoryDetail';
import StoryChapterScreen from '../StoryChapter';
import StorySearchScreen from '../StorySearch';
const Stack = createStackNavigator();

export const WithDrawerStackNavigator = ({ navigation }) => {
  const getHeaderTitle = (routeName = 'Home') => {
    switch (routeName) {
      case 'Home':
        return 'Trang chủ';
      case 'Categories':
        return 'Thể loại';
      case 'Library':
        return 'Thư viện';
      case 'Comunicate':
        return 'Cộng đồng';
      case 'Account':
        return 'Cá Nhân';
    }
  };
  const getOpitons = ({ route }) => {
    let curRoute = route.state ? route.state.routes[route.state.index] : route;
    let { subtitle, headerTitle, jumpToPage, syncData } = curRoute.params || {};

    return { headerTitle: headerTitle || getHeaderTitle(curRoute.name), subtitle, jumpToPage, syncData };
  };
  return (
    <Stack.Navigator
      initialRouteName="BottomTabs"
      headerMode="screen"
      screenOptions={{
        header: Header,
      }}
      navi>
      <Stack.Screen name="BottomTabs" component={BottomTabs} options={getOpitons} />
      <Stack.Screen name="StoryDetail" component={StoryDetailScreen} options={getOpitons} />
      <Stack.Screen name="StoryChapter" component={StoryChapterScreen} options={getOpitons} />
      <Stack.Screen name="StorySearch" component={StorySearchScreen} options={getOpitons} />
    </Stack.Navigator>
  );
};
