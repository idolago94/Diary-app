import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { SafeAreaView, StatusBar, AsyncStorage } from 'react-native';
import MainRoot from './src/Screens/MainRoot';
import * as Stores from './src/Mobx';
import { Provider } from "mobx-react";
import {create} from 'mobx-persist';

const hydrate = create({
  storage: AsyncStorage,
});

hydrate('AppStore', Stores.AppStore);

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
        <Provider {...Stores} >
          <MainRoot />
        </Provider>
    </>
  );
};

export default App;
