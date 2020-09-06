import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const Loading = () => {
  const theme = useTheme();
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={50} color={theme.colors.yellow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Loading;
