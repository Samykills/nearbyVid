import React from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import { DefaultAppTheme } from "uRnFramework-basic-components";
import Index from "./app/index";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from "react-native-exception-handler";
import JsErrorHandler from "./app/exceptionHandler/jsExceptionHandler";
import NativeErrorHandler from "./app/exceptionHandler/nativeExceptionHandler";
import { Root } from "native-base";

const SSCStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

// disable this dev mode
setJSExceptionHandler(JsErrorHandler, false);

setNativeExceptionHandler(NativeErrorHandler, true);

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <View style={styles.container}>
          <SSCStatusBar
            backgroundColor={DefaultAppTheme.primaryDark}
            barStyle="light-content"
          />
          <Index />
        </View>
      </Root>
    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
});
