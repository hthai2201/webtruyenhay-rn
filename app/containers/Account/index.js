import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  Title,
  Subheading,
  Text,
  Surface,
  Divider,
  Avatar,
  useTheme,
  Snackbar,
  Portal,
} from 'react-native-paper';
import { FlatList, SafeAreaView, StyleSheet, BackHandler } from 'react-native';
import GradientBackground from '../../components/general/GradientBackground';
import { styles } from './styles';

const AccountScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [lastPressExitApp, setLastPressExitApp] = useState(null);
  const [exitAppSnackBarVisible, setExitAppSnackBarVisible] = useState(false);
  const exitApp = () => {
    let delay = 2000;
    let now = new Date().getTime();
    if (lastPressExitApp && now - lastPressExitApp < delay) {
      setExitAppSnackBarVisible(false);
      BackHandler.exitApp();
    } else {
      setLastPressExitApp(now);
      setExitAppSnackBarVisible(true);
    }
  };
  ('StorySearch');
  const RenderListItem = ({ icon, iconBackground, title, onPress }) => {
    return (
      <List.Item
        style={styles.listItem}
        title={title}
        titleStyle={{ color: theme.colors.yellow }}
        onPress={onPress}
        left={(props) => (
          <List.Icon
            {...props}
            icon={icon}
            color="#fff"
            style={{
              backgroundColor: iconBackground || '#111',
              borderRadius: 10,
            }}
          />
        )}
      />
    );
  };
  return (
    <GradientBackground>
      <SafeAreaView>
        <List.Section style={styles.container}>
          <RenderListItem icon="information-variant" iconBackground={theme.colors.blueGreen} title="Thông tin" />
          <RenderListItem icon="star" iconBackground={theme.colors.yellow} title="Term of use" />
          <RenderListItem icon="feather" title="Đánh giá" />
          <RenderListItem icon="delete" title="Xoá dữ liệu" onPress={() => dispatch({ type: 'CLEAR_DATA' })} />
          <RenderListItem icon="exit-to-app" iconBackground={theme.colors.pink} title="Thoát" onPress={exitApp} />
        </List.Section>
        <Portal>
          <Snackbar visible={exitAppSnackBarVisible}>Hey there! I'm a Snackbar.</Snackbar>
        </Portal>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default AccountScreen;
