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
const StorySearchScreen = ({ route, navigation }) => {
  let searchStories = useSelector((_) => _.storySearch.searchStories);
  let page = useSelector((_) => _.storySearch.page);
  let pageCount = useSelector((_) => _.storySearch.pageCount);
  //searchStories = [...searchStories, ...searchStories, ...searchStories];
  const searchStoriesLoading = useSelector((_) => _.storySearch.searchStoriesLoading);
  //init hook
  const theme = useTheme();
  const dispatch = useDispatch();
  //componentDidMount
  //store get data
  useEffect(() => {
    let { category = {}, searchWords, headerTitle, subtitle = '' } = route.params || {};
    let title = searchWords || category.name || '';
    let curPage = pageCount && page && pageCount !== 1 ? `${page}/${pageCount}` : '';

    if (headerTitle !== title || subtitle !== curPage) {
      navigation.setParams({
        subtitle: curPage,
        headerTitle: title,
        syncData: () =>
          dispatch(
            storyActions.searchStories({
              searchWords,
              categorySlug: category.slug,
            }),
          ),
        jumpToPage: (nextPage) =>
          dispatch(
            storyActions.searchStories({
              searchWords,
              categorySlug: category.slug,
              page: nextPage,
            }),
          ),
      });
    }
  }, [dispatch, navigation, page, pageCount, route.params]);
  useEffect(() => {
    if (!searchStories && !searchStoriesLoading) {
      let { category = {}, searchWords } = route.params || {};
      dispatch(
        storyActions.searchStories({
          searchWords,
          categorySlug: category.slug,
        }),
      );
    }
  }, [dispatch, route.params, searchStories, searchStoriesLoading]);
  const showStoryDetail = (index) => {
    navigation.navigate('StoryDetail', { index, story: searchStories[index], headerTitle: allStories[index].name });
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
          {searchStoriesLoading ? (
            <Loading />
          ) : (
            <FlatList data={searchStories} renderItem={renderStory} keyExtractor={(item, index) => item.slug + index} />
          )}
        </List.Section>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default StorySearchScreen;
