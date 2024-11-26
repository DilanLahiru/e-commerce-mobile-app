import React from "react";
import {Provider} from 'react-redux';
import store, {persistor} from "./src/redux/store";
import AppNavigator from './src/navigation/AppNavigator'
import {PersistGate} from 'redux-persist/es/integration/react';

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator/>
      </PersistGate>
    </Provider>
  );
};

export default App;