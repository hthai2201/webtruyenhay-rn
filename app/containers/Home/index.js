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
  let page = useSelector((_) => _.home.page);
  let pageCount = useSelector((_) => _.home.pageCount);
  //allStories = [...allStories, ...allStories, ...allStories];
  const getAllStoriesLoading = useSelector((_) => _.home.getAllStoriesLoading);
  const getAllStoriesSuccess = useSelector((_) => _.home.getAllStoriesSuccess);
  const getAllStoriesError = useSelector((_) => _.home.getAllStoriesError);
  //init hook
  const theme = useTheme();
  const dispatch = useDispatch();
  //componentDidMount
  //store get data
  useEffect(() => {
    let subtitle = pageCount && page && pageCount !== 1 ? `${page}/${pageCount}` : '';
    navigation.setParams({
      subtitle,
      syncData: () => dispatch(storyActions.getAllStories()),
      jumpToPage: (nextPage) => dispatch(storyActions.getAllStories({ page: nextPage })),
    });
  }, [dispatch, navigation, page, pageCount]);
  useEffect(() => {
    if (!allStories && !getAllStoriesLoading) {
      dispatch(storyActions.getAllStories());
    }
  }, [allStories, dispatch, getAllStoriesLoading]);
  const showStoryDetail = (index) => {
    navigation.navigate('StoryDetail', { index, story: allStories[index], headerTitle: allStories[index].name });
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
    <GradientBackground>
      <SafeAreaView style={styles.home}>
        <List.Section style={{ height: '100%' }}>
          {getAllStoriesLoading ? (
            <Loading />
          ) : (
            <FlatList data={allStories} renderItem={renderStory} keyExtractor={(item, index) => item.slug + index} />
          )}
        </List.Section>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default HomeScreen;
