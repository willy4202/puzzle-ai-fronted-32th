import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ThemeProvider} from 'styled-components';
import theme from 'styles/theme';

AppRegistry.registerComponent(appName, () => App);
