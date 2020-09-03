import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme, Provider as PaperProvider } from 'react-native-paper';
import { RootStackNavigator } from './containers/Navigation/RootStackNavigator';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store';
import Loading from './components/general/Loading';
console.disableYellowBox = true;

const App = () => {
  const hookTheme = useTheme();

  const theme = {
    ...hookTheme,

    colors: {
      ...hookTheme.colors,
      primary: '#491d88',
      surface: '#fec859',
      background: 'transparent',
      darkPurple: '#331a38',
      purple: '#491d88',
      blueGreen: '#43b5a0',
      yellow: '#fec859',
      pink: '#fa448c',
      gray: '#ddd',
      text: '#ddd',
    },
  };

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
