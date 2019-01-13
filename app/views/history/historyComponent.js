import React from "react";
import { View, Text, FlatList } from "react-native";
import {
  Container,
  Content,
  Accordion,
  Icon,
  Thumbnail,
  Left,
  Right,
  Body,
  Card,
  CardItem
} from "native-base";
import { width, height, totalSize } from "react-native-dimension";
import { AppContext } from "uRnFramework-app-core";
import { DefaultAppTheme, Touchable } from "uRnFramework-basic-components";
import { Actions } from "react-native-router-flux";
class HistoryComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    let appContext = AppContext.getAppContext();
    let historyMap = appContext.currentSessionHistory;
    this.state = { historyMap: historyMap };
    this.historyTitleArray = Array.from(historyMap.keys());
  }

  _renderHeader(title, expanded) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#A9DAD6"
        }}
      >
        <Text style={{ fontWeight: "600" }}> {title}</Text>
        {expanded ? (
          <Icon style={{ fontSize: 18 }} name="remove-circle" />
        ) : (
          <Icon style={{ fontSize: 18 }} name="add-circle" />
        )}
      </View>
    );
  }

  /**
   * cant use this or state here in this stupid function :/
   * @param {*} content
   */
  _renderContent(content) {
    let historyMap = AppContext.getAppContext().currentSessionHistory;
    let itemList = historyMap.get(content);

    return (
      <View>
        {itemList.map(item => (
          <Touchable
            key={item.etag}
            onPress={() => {
              Actions.playerLigthBox({
                videoDetails: item,
                title: item.snippet.title
              });
            }}
            content={
              <Card transparent>
                <CardItem cardBody>
                  <Left>
                    <Thumbnail
                      source={{
                        uri: item.snippet.thumbnails.default.url
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
              </Card>
            }
          />
        ))}
      </View>
    );
  }

  _renderAccordion() {
    if (this.historyTitleArray.length > 0) {
      return (
        <Accordion
          dataArray={this.historyTitleArray}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
      );
    } else {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: height(35)
          }}
        >
          <Text
            style={{
              fontSize: totalSize(2),
              color: DefaultAppTheme.blackColor + "80",
              fontFamily: DefaultAppTheme.primaryFontFamily,
              fontWeight: "400",
              textAlign: "center"
            }}
          >
            No data recorded.
          </Text>
          <Text
            style={{
              fontSize: totalSize(2),
              color: DefaultAppTheme.blackColor + "80",
              fontFamily: DefaultAppTheme.primaryFontFamily,
              fontWeight: "400",
              textAlign: "center"
            }}
          >
            This page shows the active history of the user.
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <Container>
        <Content>{this._renderAccordion()}</Content>
      </Container>
    );
  }
}
export default HistoryComponent;
