import React from "react";
import { View, Text, Image, Animated } from "react-native";
import {
  Left,
  Right,
  Body,
  Thumbnail,
  Card,
  CardItem,
  Button,
  Icon
} from "native-base";
import { Actions } from "react-native-router-flux";
import { width, height, totalSize } from "react-native-dimension";
import { DefaultAppTheme, Touchable } from "uRnFramework-basic-components";
export default class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { bounceValue: new Animated.Value(width(100)) };
  }

  componentDidMount() {
    Animated.spring(this.state.bounceValue, {
      toValue: 0,
      //   velocity: 1,
      speed: 3,
      bounciness: 1,
      useNativeDriver: true
    }).start();
  }

  _renderCardItem(item) {
    return (
      <Card transparent>
        <CardItem>
          <Left>
            <Thumbnail
              source={{
                uri: item.snippet.thumbnails.medium.url
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
                {item.snippet.title}
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
                {item.snippet.description}
              </Text>
            </Body>
          </Left>
        </CardItem>

        <Touchable
          onPress={() => this.props.openPlayer(item)}
          content={
            <CardItem cardBody>
              <Image
                source={{ uri: item.snippet.thumbnails.high.url }}
                style={{ height: height(30), width: null, flex: 1 }}
              />
            </CardItem>
          }
        />
      </Card>
    );
  }

  render() {
    return (
      <Animated.View
        style={{ transform: [{ translateX: this.state.bounceValue }] }}
      >
        {this._renderCardItem(this.props.item)}
      </Animated.View>
    );
  }
}
