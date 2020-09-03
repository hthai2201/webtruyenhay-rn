import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Title, Subheading, Text, Surface, Divider, Avatar, useTheme } from 'react-native-paper';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import moment from 'moment';
import { storyActions } from './actions';
import { Funtional } from '../../utils';
import Loading from '../../components/general/Loading';
import StoryListItem from '../../components/Story/StoryListItem';
import GradientBackground from '../../components/general/GradientBackground';
import { styles } from './styles';
const HomeScreen = ({ navigation }) => {
  //state

  let allStories = useSelector((_) => _.home.allStories);
  //allStories = [...allStories, ...allStories, ...allStories];
  const getALlStoriesLoading = useSelector((_) => _.home.getALlStoriesLoading);
  const getALlStoriesSuccess = useSelector((_) => _.home.getALlStoriesSuccess);
  const getALlStoriesError = useSelector((_) => _.home.getALlStoriesError);
  //init hook
  const theme = useTheme();
  const dispatch = useDispatch();
  //componentDidMount
  //store get data
  useEffect(() => {
    if (!allStories && !getALlStoriesLoading) {
      console.log('run');
      dispatch(storyActions.getALLStories());
    }
  }, [allStories, dispatch, getALlStoriesLoading]);
  const showStoryDetail = (index) => {
    navigation.navigate('StoryDetail', { index, story: allStories[index] });
  };
  //render
  const renderStory = ({ item, index, separators }) => {
    const { name, slug, cover, chapters = [] } = item || {};
    const lastestChapter = chapters[chapters.length - 1] || {};
    return (
      <StoryListItem
        key={index}
        cover={Funtional.getImageUrl(cover)}
        title={name}
        subTitle={[
          `Chương ${lastestChapter.chapterId}: ${lastestChapter.name}`,
          `Ngày cập nhật: ${moment(lastestChapter.createdAt).format('YYYY-MM-DD HH:MM:SS')}`,
        ]}
        onPressStory={() => showStoryDetail(index)}
      />
    );
  };
  return (
    <SafeAreaView style={styles.home}>
      <GradientBackground>
        <List.Section style={{ height: '100%' }}>
          {getALlStoriesLoading ? (
            <Loading />
          ) : (
            <FlatList data={allStories} renderItem={renderStory} keyExtractor={(item, index) => item.slug + index} />
          )}
        </List.Section>
      </GradientBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;
