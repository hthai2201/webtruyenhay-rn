import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, useTheme, Title, Surface, Button } from 'react-native-paper';
import { storyChapterActions } from './actions';
import { libraryActions } from '../Library/actions';
import { ScrollView, View } from 'react-native';
import Swiper from 'react-native-swiper';
import colors from 'color';
import Loading from '../../components/general/Loading';
const StoryChapterScreen = ({ route, navigation }) => {
  //state

  const localChapter = useSelector((_) => _.library.downloadedChapter);
  const getDownloadChapterError = useSelector((_) => _.library.getDownloadChapterError);
  const onlineChapter = useSelector((_) => _.storyChapter.chapter);

  const getStoryChapterLoading = useSelector((_) => _.storyChapter.getStoryChapterLoading);

  const chapter = localChapter || onlineChapter;
  //hook

  const dispatch = useDispatch();
  const theme = useTheme();
  const toChapter = (chapterId) => {
    navigation.navigate('StoryChapter', {
      ...route.params,
      chapterId,
    });
  };
  useEffect(() => {
    let { story = {}, chapterId } = route.params;

    dispatch(libraryActions.getDownloadChapter({ chapterId, slug: story.slug }));
  }, [dispatch, route.params]);
  useEffect(() => {
    if (!getStoryChapterLoading && getDownloadChapterError) {
      let { story = {}, chapterId } = route.params;
      if (story.slug && chapterId) {
        let { chapterId: curId, storySlug: curSlug } = chapter || {};
        if (!chapter || story.slug !== curSlug || chapterId !== curId) {
          dispatch(storyChapterActions.getStoryChapter({ chapterId, slug: story.slug }));
        }
      }
    }
  }, [chapter, dispatch, getDownloadChapterError, getStoryChapterLoading, route.params]);
  useEffect(() => {
    let { story = {}, chapterId } = route.params;
    let { chapterId: curId, storySlug: curSlug } = chapter || {};
    if (story.slug && chapterId && curId && curSlug) {
      dispatch(libraryActions.addHistory({ ...story, currentChapter: chapter }));
    }
  }, [chapter, dispatch, route.params]);
  useEffect(() => {
    let { headerTitle } = route.params;

    let title = chapter ? `Chương ${chapter.chapterId}:${chapter.name}` : 'Chapter';

    if (!headerTitle || headerTitle !== title) {
      navigation.replace('StoryChapter', {
        ...route.params,
        headerTitle: title,
      });
    }
  }, [chapter, navigation, route.params]);

  const renderChapter = (chapter) => {
    const { content, name, chapterId } = chapter || {};

    return (
      <ScrollView theme={{ colors: { background: colors(theme.colors.yellow).alpha(0.2) } }}>
        {getStoryChapterLoading ? (
          <Loading />
        ) : (
          <View style={{ marginBottom: 50, marginHorizontal: 10 }}>
            <Surface
              theme={{ colors: { surface: '#ddd' } }}
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginVertical: 20,
              }}>
              <Button style={{ flex: 1 }} onPress={() => toChapter(chapterId - 1)}>
                Tập trước
              </Button>
              <Button style={{ flex: 1 }} onPress={() => toChapter(chapterId + 1)}>
                Tập kế tiếp
              </Button>
            </Surface>
            <Title
              style={{
                color: colors('#000'),
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 30,
              }}>
              Chương {chapterId}: {name}
            </Title>

            <Text style={{ color: colors('#000').alpha(0.8) }}>{content}</Text>
            <Surface
              theme={{ colors: { surface: '#ddd' } }}
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginVertical: 20,
              }}>
              <Button style={{ flex: 1 }} onPress={() => toChapter(chapterId - 1)}>
                Tập trước
              </Button>
              <Button style={{ flex: 1 }} onPress={() => toChapter(chapterId + 1)}>
                Tập kế tiếp
              </Button>
            </Surface>
          </View>
        )}
      </ScrollView>
    );
  };
  return (
    // <ScrollView
    //   scrollEventThrottle={16}
    //   style={{
    //     backgroundColor: colors(theme.colors.yellow).alpha(0.2),
    //     padding: 20,
    //   }}>
    <Swiper
      onIndexChanged={(index) => {
        toChapter(chapter.chapterId - 1 + index);
      }}
      index={1}
      loop={false}
      autoplay={false}
      pagingEnabled={true}
      showsPagination={false}>
      <View />
      {renderChapter(chapter)}
      <View />
    </Swiper>
    //</ScrollView>
  );
};

export default StoryChapterScreen;
