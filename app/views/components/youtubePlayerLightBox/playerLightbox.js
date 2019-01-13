import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import YouTube from "react-native-youtube";
import { width, height, totalSize } from "react-native-dimension";
import {
  Thumbnail,
  Left,
  Right,
  Body,
  Card,
  CardItem,
  Button,
  Icon,
  Container,
  Content
} from "native-base";
import {
  DefaultAppTheme,
  SimpleLightBox,
  Touchable
} from "uRnFramework-basic-components";
import { Actions } from "react-native-router-flux";
import Config from "react-native-config";
import {
  YouTubeStandaloneAndroid,
  YouTubeStandaloneIOS
} from "react-native-youtube";
class PlayerLightBox extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  standAlonePlayer(item) {
    if (Platform.OS == "ios") {
      YouTubeStandaloneIOS.playVideo(item.id.videoId)
        .then(() => console.log("Standalone Player Exited"))
        .catch(errorMessage => console.error(errorMessage));
    } else {
      YouTubeStandaloneAndroid.playVideo({
        apiKey: Config.YOUTUBE_API_KEY, // Your YouTube Developer API Key
        videoId: item.id.videoId, // YouTube video ID
        autoplay: true // Autoplay the video
        // startTime: 120 // Starting point of video (in seconds)
      })
        .then(() => console.log("Standalone Player Exited"))
        .catch(errorMessage => alert(errorMessage));
    }
  }

  _renderPlayerBody() {
    return (
      <Card transparent>
        <CardItem>
          <Left>
            <Thumbnail
              source={{
                uri: this.props.videoDetails.snippet.thumbnails.default.url
              }}
            />
            <Body>
              <Text
                style={{
                  fontSize: totalSize(1.8),
                  color: DefaultAppTheme.blackColor,
                  fontFamily: DefaultAppTheme.primaryFontFamily,
                  fontWeight: "300"
                }}
                numberOfLines={1}
                ellipsizeMode={"tail"}
              >
                {this.props.videoDetails.snippet.title}
              </Text>
              <Text
                style={{
                  fontSize: totalSize(1.2),
                  color: DefaultAppTheme.blackColor + "80",
                  fontFamily: DefaultAppTheme.primaryFontFamily,
                  fontWeight: "300"
                }}
                numberOfLines={1}
                ellipsizeMode={"tail"}
                note
              >
                {this.props.videoDetails.snippet.channelTitle}
              </Text>
              <Text
                style={{
                  fontSize: totalSize(1.2),
                  color: DefaultAppTheme.blackColor + "80",
                  fontFamily: DefaultAppTheme.primaryFontFamily,
                  fontWeight: "300"
                }}
                numberOfLines={3}
                ellipsizeMode={"tail"}
                note
              >
                {this.props.videoDetails.snippet.description}
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem footer>
          <Left>
            <Body
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Touchable
                onPress={Actions.pop}
                content={
                  <View
                    style={{
                      minWidth: width(30),
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: DefaultAppTheme.secondary,
                      borderRadius: totalSize(8)
                    }}
                  >
                    <Icon
                      ios="ios-close"
                      android="md-close"
                      style={{
                        fontSize: totalSize(3),
                        color: DefaultAppTheme.whiteColor,
                        fontWeight: "300"
                      }}
                    />
                    <Text
                      style={{
                        fontSize: totalSize(1.8),
                        marginLeft: width(2),
                        color: DefaultAppTheme.whiteColor,
                        fontFamily: DefaultAppTheme.primaryFontFamily,
                        fontWeight: "300"
                      }}
                    >
                      Close
                    </Text>
                  </View>
                }
              />
            </Body>
          </Left>
          <Right>
            <Body>
              <Touchable
                onPress={() => this.standAlonePlayer(this.props.videoDetails)}
                content={
                  <View
                    style={{
                      minWidth: width(32),
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: DefaultAppTheme.secondary,
                      borderRadius: totalSize(8)
                    }}
                  >
                    <Text
                      style={{
                        fontSize: totalSize(1.8),
                        marginLeft: width(2),
                        color: DefaultAppTheme.whiteColor,
                        fontFamily: DefaultAppTheme.primaryFontFamily,
                        fontWeight: "300"
                      }}
                    >
                      Fullscreen{" "}
                    </Text>
                    <Icon
                      ios="logo-youtube"
                      android="logo-youtube"
                      style={{
                        fontSize: totalSize(3),
                        color: DefaultAppTheme.primary,
                        fontWeight: "300"
                      }}
                    />
                  </View>
                }
              />
            </Body>
          </Right>
        </CardItem>
      </Card>
    );
  }

  render() {
    return (
      <SimpleLightBox
        verticalPercent={0.5}
        horizontalPercent={0.9}
        onTouchDismiss={false}
        borderRadius={0}
      >
        <YouTube
          apiKey={Config.YOUTUBE_API_KEY}
          videoId={this.props.videoDetails.id.videoId}
          style={{ width: width(90), height: height(30) }}
          showFullscreenButton={false}
          play={true}
          controls={2}
        />
        {this._renderPlayerBody()}
      </SimpleLightBox>
    );
  }
}

export default PlayerLightBox;
