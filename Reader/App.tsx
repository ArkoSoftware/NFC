import React, {useEffect} from 'react';
import Router from './src/router/MainRouter';
import {LogBox} from 'react-native';
import {PermissionsAndroid} from 'react-native';


const App = () => {

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();
  return <Router />;
};

export default App;
