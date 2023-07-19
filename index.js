// index.js
import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App.js'; // App.js 파일로 변경해야 할 수도 있습니다.
import { name as appName } from './app.json';
registerRootComponent(App);


AppRegistry.registerComponent(appName, () => App);
