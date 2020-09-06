import { StyleSheet, Dimensions, Platform } from 'react-native';
import color from 'color';
const deviceWitdh = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 100,
  },
  listItem: {
    backgroundColor: color('#fff').alpha(0.1).string(),
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
