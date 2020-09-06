import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import {
  Appbar,
  Avatar,
  useTheme,
  Searchbar,
  Portal,
  Modal,
  TextInput,
  Button,
  Text,
  Surface,
} from 'react-native-paper';

import { storyActions } from '../Home/actions';
import { useDispatch, useSelector } from 'react-redux';
import color from 'color';
import GradientBackground from '../../components/general/GradientBackground';

const Header = ({ scene, previous, navigation }) => {
  //state
  const [visibleNextPageModal, setVisibleNextPageModal] = React.useState(false);
  const [nextPage, setNextPage] = useState('');
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  //props
  const { options = {} } = scene.descriptor || {};
  const { syncData, jumpToPage } = options;

  //define hook
  const theme = useTheme();
  const searchBarRef = useRef(null);
  const dispatch = useDispatch();
  //function
  const onChangeNextPage = (value) => {
    setNextPage(parseInt(value) || 1);
  };
  const hideNextPageModal = () => {
    setVisibleNextPageModal(false);
  };
  const showNextPageModal = () => {
    setVisibleNextPageModal(true);
  };
  const showSearchBar = () => {
    setSearchBarVisibility(!searchBarVisibility);
  };
  const updateData = () => {
    syncData && syncData();
  };
  const searchStory = () => {
    if (searchQuery) {
      ('StorySearch');
      navigation.navigate('StorySearch', {
        searchWords: searchQuery,
        headerTitle: searchQuery,
      });
      showSearchBar();
    }
  };
  const onChangeSearch = (value) => {
    setSearchQuery(value);
  };
  const onPressNextPage = () => {
    hideNextPageModal();
    jumpToPage && jumpToPage(nextPage);
  };
  //hook
  useEffect(() => {
    if (searchBarVisibility) {
      searchBarRef.current.focus();
    }
  }, [searchBarVisibility]);

  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
  const { subtitle } = options || {};

  //render
  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }} style={styles.headerTitle}>
      {searchBarVisibility ? (
        <>
          <Appbar.Action icon="arrow-left" onPress={showSearchBar} color={theme.colors.gray} />
          <Searchbar
            ref={searchBarRef}
            style={{ marginHorizontal: 5, flex: 1 }}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            iconColor={theme.colors.yellow}
            onIconPress={searchStory}
            onSubmitEditing={searchStory}
          />
        </>
      ) : (
        <>
          {previous ? (
            <Appbar.BackAction onPress={navigation.goBack} color={theme.colors.gray} />
          ) : (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}>
              <Avatar.Icon size={40} icon="library" />
            </TouchableOpacity>
          )}
          <Appbar.Content
            title={title}
            titleStyle={{
              fontSize: 18,
              fontWeight: 'bold',
              color: theme.colors.gray,
            }}
            subtitle={subtitle}
          />
          <Appbar.Action icon="magnify" onPress={showSearchBar} color={theme.colors.gray} />
          {syncData && <Appbar.Action icon="sync" onPress={updateData} color={theme.colors.gray} />}
          {jumpToPage && (
            <Appbar.Action icon="arrow-right-bold-circle" onPress={showNextPageModal} color={theme.colors.gray} />
          )}
        </>
      )}
      <Portal
        theme={{
          colors: { primary: theme.colors.yellow, background: 'transparent', surface: 'transparent' },
        }}>
        <Modal
          visible={visibleNextPageModal}
          onDismiss={hideNextPageModal}
          contentContainerStyle={{
            paddingVertical: 20,
            paddingHorizontal: 15,
          }}>
          <GradientBackground>
            <TextInput
              label="Nhập số trang cần chuyển đến"
              value={nextPage}
              onChangeText={onChangeNextPage}
              onEndEditing={onPressNextPage}
            />
            <Surface style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Button onPress={hideNextPageModal}>Cancel</Button>
              <Button onPress={onPressNextPage}>OK</Button>
            </Surface>
          </GradientBackground>
        </Modal>
      </Portal>
    </Appbar.Header>
  );
};
const styles = StyleSheet.create({
  headerTitle: {
    //backgroundColor: colors('#491d88').darken(0.05),
  },
  whiteText: {
    color: '#fff',
  },
});

export default Header;
