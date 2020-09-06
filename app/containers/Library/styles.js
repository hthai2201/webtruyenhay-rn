import { StyleSheet, Dimensions, Platform } from 'react-native';
import color from 'color';
const deviceWitdh = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 20,
  },
  listItemWrap: {
    backgroundColor: 'transparent',
    flex: 0.5,
  },
  listItem: {
    backgroundColor: `${color('#fff').alpha(0.3)}`,
    marginHorizontal: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
