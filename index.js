import {AppRegistry} from 'react-native';
import {AuthProvider} from '~/AuthContext';
import App from './App';
import React from 'react';
import {name as appName} from './app.json';

function ProvidedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => ProvidedApp);
