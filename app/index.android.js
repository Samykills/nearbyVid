import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { CrashlyticsLogger } from "uRnFramework-firebase";
import AppRouter from "./app-router";

class Index extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    CrashlyticsLogger.enableCrash();
  }

  render() {
    return (
      <View style={styles.container}>
        <AppRouter />
      </View>
    );
  }
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Index;
