import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerItem, DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';  
import GradientBackground from './GradientBackground';
import { WithDrawerStackNavigator } from './WithDrawerStackNavigator';
const DrawerNavigator = createDrawerNavigator();
export function DrawerContent(props) {
  const theme = useTheme();
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <GradientBackground>
          <View style={styles.userInfoSection}>
            <Avatar.Icon icon="library" size={50} />
            <Title style={[styles.title, { color: theme.colors.yellow }]}>Web Truyện Hay</Title>
            <Caption style={[styles.caption, { color: theme.colors.yellow }]}>@hai</Caption>
          </View>
        </GradientBackground>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />}
            label="Trang chủ"
            onPress={() => navigation.navigate('Home')}
          />
          <DrawerItem
            icon={({ color, size }) => <MaterialCommunityIcons name="view-list" color={color} size={size} />}
            label="Thể loại"
            onPress={() => navigation.navigate('Categories')}
          />
          <DrawerItem
            icon={({ color, size }) => <MaterialCommunityIcons name="book" color={color} size={size} />}
            label="Truyện đang đọc"
            onPress={() => navigation.navigate('Library')}
          />
          <DrawerItem
            icon={({ color, size }) => <MaterialCommunityIcons name="cloud-download" color={color} size={size} />}
            label="Truyện tải về"
            onPress={() => navigation.navigate('Library', { screen: 'Download' })}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

export default () => {
  return (
    <DrawerNavigator.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <DrawerNavigator.Screen name="Home" component={WithDrawerStackNavigator} />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    height: '100%',
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingVertical: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 30,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
