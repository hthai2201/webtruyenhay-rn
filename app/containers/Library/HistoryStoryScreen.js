import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Title, Subheading, Text, Surface, Divider, Avatar, useTheme } from 'react-native-paper';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import moment from 'moment';
import color from 'color';

import { libraryActions } from './actions';
import { Funtional } from '../../utils/functional';

import StoryListItem from '../../components/Story/StoryListItem';
import GradientBackground from '../../components/general/GradientBackground';

const DownloadStoryScreen = ({ navigation }) => {
  //state
  let allStories = useSelector((_) => _.library.history);

  //init hook
  const theme = useTheme();
  const dispatch = useDispatch();
  //componentDidMount
  //store get data
  const showStoryDetail = (index) => {
    navigation.navigate('StoryDetail', { index, story: allStories[index], headerTitle: allStories[index].name });
  };
  //render
  const renderStory = ({ item, index, separators }) => {
    const { name, slug, cover, chapters = [], currentChapter = {} } = item || {};

    return (
      <StoryListItem
        cover={Funtional.getImageUrl(cover)}
        title={name}
        subTitle={[
          `Chương ${currentChapter.chapterId}: ${currentChapter.name}`,
          `Ngày cập nhật: ${moment(currentChapter.createdAt).format('YYYY-MM-DD HH:MM:SS')}`,
        ]}
        onPressStory={() => showStoryDetail(index)}
      />
    );
  };
  return (
    <GradientBackground>
      <SafeAreaView style={styles.home}>
        <List.Section style={{ height: '100%' }}>
          <FlatList
            data={allStories}
            renderItem={renderStory}
            keyExtractor={(item, index) => (item ? item.slug : '' + index)}
          />
        </List.Section>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default DownloadStoryScreen;
const styles = StyleSheet.create({
  home: {
    backgroundColor: 'transparent',
  },
  listItem: {
    backgroundColor: color('#fff').alpha(0.3).string(),
    marginHorizontal: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
