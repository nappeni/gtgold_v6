import { AppRegistry, Text, TextInput, LogBox } from 'react-native'
import App from './App'
import messaging from '@react-native-firebase/messaging'
import { name as appName } from './app.json'

LogBox.ignoreLogs(['new NativeEventEmitter']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false

TextInput.defaultProps = TextInput.defaultProps || {}
TextInput.defaultProps.allowFontScaling = false

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage)
})

async function requestUserPermission() {
    const settings = await messaging().requestPermission()

    if (settings) {
        //console.log('Permission settings:', settings);
    }
}

requestUserPermission()

AppRegistry.registerComponent(appName, () => App)