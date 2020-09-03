import React from 'react';
import { List, Text, Surface, Divider, Avatar, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import color from 'color';

const StoryListItem = ({ cover, title, subTitle = [], onPressStory }) => {
  const subTitles = subTitle instanceof Array ? subTitle : [subTitle];
  const theme = useTheme();

  //render

  return (
    <Surface style={styles.listItemWrap}>
      <List.Item
        onPress={onPressStory}
        style={styles.listItem}
        title={title}
        titleStyle={[styles.titleText, { color: theme.colors.yellow }]}
        description={() => (
          <>
            {subTitles.map((sub) => (
              <Text style={{ color: theme.colors.gray }}>{sub}</Text>
            ))}
          </>
        )}
        left={(props) => <Avatar.Image {...props} source={{ uri: cover }} />}
      />
      <Divider style={styles.divider} />
    </Surface>
  );
};

export default StoryListItem;
const styles = StyleSheet.create({
  divider: { height: 10, backgroundColor: 'transparent' },
  category: {
    height: '100%',
    paddingTop: 55,
  },
  listItemWrap: {
    backgroundColor: 'transparent',
    flex: 0.5,
  },
  listItem: {
    //backgroundColor: color('#fff').alpha(0.3),
    marginHorizontal: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
