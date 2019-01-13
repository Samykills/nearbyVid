import React from "react";
import { View, Text } from "react-native";
import YouTube from "react-native-youtube";
import { width, height, totalSize } from "react-native-dimension";
import { Thumbnail, Left, Right, Body, Card, CardItem } from "native-base";
import { DefaultAppTheme } from "uRnFramework-basic-components";
import Config from "react-native-config";
class PlayerModal extends React.PureComponent {
  constructor(props) {
    super(props);
    let videoDetails = this.props.videoDetails;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: DefaultAppTheme.dashboardBackgroundColor
        }}
      >
        <Card>
          <CardItem cardBody>
            <YouTube
              apiKey={Config.YOUTUBE_API_KEY}
              videoId={this.props.videoDetails.id.videoId}
              style={{ width: width(100), height: height(30) }}
              showFullscreenButton={false}
              play={true}
            />
          </CardItem>
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
                  note
                >
                  {this.props.videoDetails.snippet.description}
                </Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default PlayerModal;
