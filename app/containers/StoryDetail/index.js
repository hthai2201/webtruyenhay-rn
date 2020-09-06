import React, { useState, useEffect } from 'react';
import { Button, Card, Paragraph } from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux';
import { List, Title, Subheading, Text, Surface, Divider, Avatar, useTheme } from 'react-native-paper';

import { FlatList, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import moment from 'moment';
import color from 'color';
import { Share } from 'react-native';
import { storyDetailActions } from './actions';
import { libraryActions } from '../Library/actions';
import { Funtional } from '../../utils/functional';
import Loading from '../../components/general/Loading';
import GradientBackground from '../../components/general/GradientBackground';
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const StoryDetailScreen = ({ route, navigation }) => {
  //let story = useSelector((_) => _.storyDetail.story);
  let {
    name,
    cover,
    lastChapter,
    desc,
    author,
    status,
    chapterCount = 0,
    createdAt,
    updatedAt,
    categories = [],
    like = [],
    comments = [],
  } = route.params.story || {};
  const historyStories = useSelector((_) => _.library.history);
  //story = [...story, ...story, ...story];
  const downloadStoryLoading = useSelector((_) => _.library.downloadStoryLoading);
  const getStoryLoading = useSelector((_) => _.storyDetail.getStoryLoading);
  const getStorySuccess = useSelector((_) => _.storyDetail.getStorySuccess);
  const getStoryError = useSelector((_) => _.storyDetail.getStoryError);
  //init hook
  const theme = useTheme();
  const dispatch = useDispatch();
  //componentDidMount
  //store get data
  // useEffect(() => {
  //   if (route.params.story && !getStoryLoading && (!story || story.slug !== route.params.story.slug)) {
  //     dispatch(storyDetailActions.getStory({ slug: route.params.story.slug }));
  //   }
  // }, [story, route.params.story, dispatch, getStoryLoading]);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${name} - ${author}`,
        title: name,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  };
  const viewStoryChapter = () => {
    const { story = {} } = route.params || {};
    let readingStory = historyStories ? historyStories.find((item) => item.slug == story.slug) : null;

    let chapterId = 1;
    if (readingStory && readingStory.currentChapter) {
      chapterId = readingStory.currentChapter.chapterId || 1;
    }
    navigation.navigate('StoryChapter', {
      story,
      chapterId,
    });
  };
  const downloadStory = () => {
    const { story = {} } = route.params || {};
    dispatch(libraryActions.downloadStory({ slug: story.slug }));
  };

  return (
    <GradientBackground>
      <SafeAreaView>
        <ScrollView style={{ height: '100%' }}>
          {getStoryLoading ? (
            <Loading />
          ) : (
            <Card style={{ backgroundColor: color('#000').alpha(0.1) }}>
              <Card.Cover source={{ uri: Funtional.getImageUrl(cover) }} />
              <Card.Title
                titleStyle={[
                  {
                    color: '#fff',
                    textAlign: 'center',
                  },
                ]}
                title={name}
              />
              <Card.Content style={{ paddingVertical: 10 }}>
                <Text
                  theme={{
                    colors: {
                      text: color(theme.colors.yellow).darken(0.1).string(),
                    },
                  }}>
                  Tác Giả: {author}
                </Text>
                <Text
                  theme={{
                    colors: {
                      text: color(theme.colors.yellow).darken(0.1).string(),
                    },
                  }}>
                  Thể loại: {categories.map((category, index) => `${index == 0 ? '' : ', '}${category.name}`)}
                </Text>
                <Text
                  theme={{
                    colors: {
                      text: color(theme.colors.yellow).darken(0.1).string(),
                    },
                  }}>
                  Trạng thái: {status == 'complete' ? 'Hoàn thành' : 'Đang ra'}
                </Text>
                <Text
                  theme={{
                    colors: {
                      text: color(theme.colors.yellow).darken(0.1).string(),
                    },
                  }}>
                  Số chương: {chapterCount}
                </Text>
                <Text
                  theme={{
                    colors: {
                      text: color(theme.colors.yellow).darken(0.1).string(),
                    },
                  }}>
                  Ngày up: {moment(createdAt).format('YYYY-MM-DD HH:MM:SS')}
                </Text>
                <Text
                  theme={{
                    colors: {
                      text: color(theme.colors.yellow).darken(0.1).string(),
                    },
                  }}>
                  Ngày cập nhật: {moment(updatedAt).format('YYYY-MM-DD HH:MM:SS')}
                </Text>
              </Card.Content>
              <Card.Actions
                style={{
                  backgroundColor: color('#000').alpha(0.2).string(),
                  flexDirection: 'column',
                }}>
                <Button
                  color={'#fff'}
                  style={[
                    {
                      alignSelf: 'stretch',
                      backgroundColor: color(theme.colors.purple).lighten(0.3).string(),
                    },
                  ]}
                  onPress={viewStoryChapter}>
                  Đọc truyện
                </Button>
                <Card.Actions>
                  {[
                    {
                      icon: 'heart-outline',
                      label: `Yêu Thích (${like.length || 0})`,
                    },
                    {
                      icon: 'comment',
                      label: `Bình luận (${comments.length || 0})`,
                    },
                    { icon: 'share-variant', label: `Chia sẻ`, onPress: onShare },
                    {
                      icon: 'cloud-download',
                      label: `Tải về`,
                      onPress: downloadStory,
                      loading: downloadStoryLoading && !console.log(downloadStoryLoading, 'downloadStoryLoading'),
                    },
                  ].map((btn) => (
                    <Button
                      color={theme.colors.gray}
                      icon={btn.icon}
                      labelStyle={{
                        textAlign: 'center',
                      }}
                      contentStyle={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginRight: 5,
                      }}
                      style={{
                        paddingTop: 10,
                      }}
                      uppercase={false}
                      onPress={btn.onPress}
                      loading={btn.loading}
                      disabled={btn.disabled}>
                      {btn.label}
                    </Button>
                  ))}
                </Card.Actions>
              </Card.Actions>

              <Card.Content>
                <Paragraph>{desc}</Paragraph>
              </Card.Content>
            </Card>
          )}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: 'transparent',
  },
  listItem: {
    backgroundColor: color('#fff').alpha(0.3).string(),
    marginHorizontal: 10,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  primaryBtn: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default StoryDetailScreen;
