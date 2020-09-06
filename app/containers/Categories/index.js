import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Title, Subheading, Text, Surface, Divider, Avatar, useTheme } from 'react-native-paper';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Colors from 'color';
import { categoryActions } from './actions';
import GradientBackground from '../../components/general/GradientBackground';
import Loading from '../../components/general/Loading';
import { styles } from './styles';
const CategoryScreen = ({ navigation }) => {
  //state
  let allCategories = useSelector((_) => _.category.allCategories);
  const getAllCategoriesLoading = useSelector((_) => _.category.getAllCategoriesLoading);
  const getAllCategoriesSuccess = useSelector((_) => _.category.getAllCategoriesSuccess);
  const getAllCategoriesError = useSelector((_) => _.category.getAllCategoriesError);
  //init hook
  const theme = useTheme();
  const dispatch = useDispatch();
  //componentDidMount
  //store get data
  useEffect(() => {
    navigation.setParams({
      syncData: () => dispatch(categoryActions.getAllCategories()),
    });
  }, [dispatch, navigation]);
  useEffect(() => {
    if (!allCategories && !getAllCategoriesLoading) {
      dispatch(categoryActions.getAllCategories());
    }
  }, [allCategories, dispatch, getAllCategoriesLoading]);
  const showCategoryStories = (index) => {
    navigation.navigate('StorySearch', {
      index,
      category: allCategories[index],
      headerTitle: allCategories[index] ? allCategories[index].name : null,
    });
  };

  //render
  const renderCategory = ({ item, index, separators }) => {
    const { name, slug } = item;

    return (
      <Surface style={styles.listItemWrap}>
        <List.Item
          onPress={() => showCategoryStories(index)}
          style={styles.listItem}
          title={name}
          titleStyle={[styles.titleText, { color: '#fff' }]}
        />
        <Divider style={{ height: 10, backgroundColor: 'transparent' }} />
      </Surface>
    );
  };
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        {getAllCategoriesLoading ? (
          <Loading />
        ) : (
          <List.Section>
            <FlatList
              key="#"
              columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
              numColumns={2}
              data={allCategories}
              extraData={allCategories}
              renderItem={renderCategory}
              keyExtractor={(item, index) => '#' + item.slug + index}
            />
          </List.Section>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
};

export default CategoryScreen;
