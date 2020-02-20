/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import HomeComponent from './src/components/CallDetecterComponent';
import {name as appName} from './app.json';
import AppNew from './AppNew'

import codePush from "react-native-code-push";
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

class MyApp extends Component {
}

MyApp = codePush(codePushOptions)(MyApp);




AppRegistry.registerComponent(appName, () => App);
