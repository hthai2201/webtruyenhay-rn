import { StyleSheet, Dimensions, Platform } from 'react-native';

const deviceWitdh = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  home: {
    paddingTop: 10,
  },
});
