import React from "react";
import { View, Text } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Icon
} from "native-base";
import { DefaultAppTheme } from "uRnFramework-basic-components";
import { width, totalSize } from "react-native-dimension";
import Config from "react-native-config";
class AboutComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header>
              <Text
                style={{
                  fontSize: totalSize(2.5),
                  fontFamily: DefaultAppTheme.primaryFontFamily,
                  color: DefaultAppTheme.secondary,
                  fontWeight: "300"
                }}
              >
                What is {Config.ENTERPRISE_NAME}?
              </Text>
            </CardItem>
            <CardItem>
              <Text
                style={{
                  fontSize: totalSize(1.5),
                  fontFamily: DefaultAppTheme.primaryFontFamily,
                  color: DefaultAppTheme.secondary,
                  fontWeight: "300"
                }}
              >
                {Config.ENTERPRISE_NAME} is an application that displays the
                most popluar videos hosted on YoutTube(
                <Icon
                  ios="logo-youtube"
                  android="logo-youtube"
                  style={{
                    fontSize: totalSize(1.3),
                    color: DefaultAppTheme.primary
                  }}
                />
                ) from your area. {"\n\n"}It takes the current location
                automatically when launched, which can be changed by the user
                any time by clicking on this (
                <Icon
                  ios="ios-pin"
                  android="md-pin"
                  style={{
                    fontSize: totalSize(1.3),
                    color: DefaultAppTheme.primary
                  }}
                />
                ) Icon, And loads the most popular videos for your location!
              </Text>
            </CardItem>
          </Card>

          <Card padder>
            <CardItem header>
              <Text
                style={{
                  fontSize: totalSize(2.5),
                  fontFamily: DefaultAppTheme.primaryFontFamily,
                  color: DefaultAppTheme.secondary,
                  fontWeight: "300"
                }}
              >
                How history works?
              </Text>
            </CardItem>
            <CardItem>
              <Text
                style={{
                  fontSize: totalSize(1.5),
                  fontFamily: DefaultAppTheme.primaryFontFamily,
                  color: DefaultAppTheme.secondary,
                  fontWeight: "300"
                }}
              >
                History (
                <Icon
                  ios="ios-bookmarks"
                  android="md-bookmarks"
                  style={{
                    fontSize: totalSize(1.3),
                    color: DefaultAppTheme.primary
                  }}
                />
                ) feature enables the user to view his past viewed videos based
                on the location he/she searched for, Only the videos that were
                viewed will be recorded for vieweing later in the history tab.
                {"\n\n"}The application records the data of, only the videos
                viewed by the user during his/her current active session.
                {"\n\n"}The app does not record/store/retrieve the data for the
                session which is no longer active for the app, i.e if the app is
                killed the history data is removed.
              </Text>
            </CardItem>
          </Card>

          <Card padder>
            <CardItem header>
              <Text
                style={{
                  fontSize: totalSize(2.5),
                  fontFamily: DefaultAppTheme.primaryFontFamily,
                  color: DefaultAppTheme.secondary,
                  fontWeight: "300"
                }}
              >
                About
              </Text>
            </CardItem>
            <CardItem>
              <Text
                style={{
                  fontSize: totalSize(1.5),
                  fontFamily: DefaultAppTheme.primaryFontFamily,
                  color: DefaultAppTheme.secondary,
                  fontWeight: "300"
                }}
              >
                Developer : Ullas Gupta
              </Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text
                  style={{
                    fontSize: totalSize(1.5),
                    fontFamily: DefaultAppTheme.primaryFontFamily,
                    color: DefaultAppTheme.secondary,
                    fontWeight: "300"
                  }}
                >
                  Contact : ullas.gupta91@gmail.com
                </Text>
              </Left>
              <Right>
                <Text
                  style={{
                    fontSize: totalSize(1.5),
                    fontFamily: DefaultAppTheme.primaryFontFamily,
                    color: DefaultAppTheme.secondary,
                    fontWeight: "300"
                  }}
                >
                  Version : {Config.CODE_PUSH_VERSION}
                </Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default AboutComponent;
