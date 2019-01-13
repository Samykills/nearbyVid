import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  Alert,
  Animated
} from "react-native";
import {
  Touchable,
  SSCAnimations,
  AppConst,
  Loader,
  DefaultAppTheme,
  PermissionAccess,
  PermissionConstant
} from "uRnFramework-basic-components";
import { Actions } from "react-native-router-flux";
import { AppContext } from "uRnFramework-app-core";
import { width, height, totalSize } from "react-native-dimension";
import SplashScreen from "react-native-splash-screen";
import RNGooglePlaces from "react-native-google-places";
import DashboardServiceManager from "./serviceManager/dashboardServiceManager";
import YoutubeMockData from "./serviceManager/mock";
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
import Util from "../../util/util";
import ListItem from "./dashboadList/listitem";
import * as Animatable from "react-native-animatable";
const youtubeData = {
  location: "",
  pageToken: ""
};
class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    let context = AppContext.getAppContext();
    this.props.navigation.setParams({
      openHistory: this.openHistory
    });
    this.fabAnimatedPos = new Animated.Value(-200);
    this.state = {
      selectedLocation: null,
      isLoading: false,
      context: context,
      // videoList: YoutubeMockData
      videoListMap: new Map(),
      youTubeResp: "",
      videListRefresh: false
    };

    this.openPlayer = this.openPlayer.bind(this);
  }

  prepareYoutubeData = (location, pageToken) => {
    let requestData = youtubeData;
    // requestData.location = "21.5922529,-158.1147114";
    requestData.location = location;
    requestData.pageToken = pageToken;
    PermissionAccess.requestPermission(PermissionConstant.coarseLocation).then(
      res => {
        if (res) {
          this.loadYouTubeData(requestData);
        } else {
          Alert.alert(
            "Location Permission Required!",
            "Please grant the location Permissions manually!"
          );
        }
      },
      err => {
        Alert.alert(
          "Location Permission Required!",
          "Please grant the location Permissions manually!"
        );
      }
    );
  };

  loadYouTubeData(requestData) {
    this.setState({ videListRefresh: true });
    DashboardServiceManager.loadVideosBasedOnLatLng(requestData).then(
      res => {
        let tmpVideoListMap = this.state.videoListMap;
        res.items.map(item => {
          tmpVideoListMap.set(item.id.videoId, item);
        });
        this.setState({
          youTubeResp: res,
          videoListMap: tmpVideoListMap,
          isLoading: false,
          videListRefresh: false
        });
      },
      err => {
        this.setState({ videListRefresh: false });
      }
    );
  }

  /**
   * Important as its the callback from store
   * @param {*} currentContext
   * @param {*} appContext
   */
  renderTrigger(currentContext, appContext) {
    if (
      appContext.selectedLocation.latlng !=
      currentContext.state.selectedLocation
    ) {
      let newSelectedLocation = appContext.selectedLocation.latlng;
      currentContext.setState({
        videoListMap: new Map(),
        youTubeResp: "",
        context: appContext,
        selectedLocation: newSelectedLocation
      });
      currentContext.prepareYoutubeData(newSelectedLocation);
    }
  }

  componentDidMount() {
    AppContext.initializeEventActivityListeners(this, this.renderTrigger);
    navigator.geolocation.getCurrentPosition(
      res => {
        let latlng = res.coords.latitude + "," + res.coords.longitude;
        this.setState({ selectedLocation: latlng });
        this.prepareYoutubeData(latlng);
      },
      err => {
        let latlng = "21.5922529,-158.1147114";
        this.setState({ selectedLocation: latlng });
        Alert.alert(
          "Using default location!",
          "Unable get current location, may be your gps is off, or location permissions are missing for the app!",
          [
            {
              text: "OK",
              onPress: () => this.prepareYoutubeData(latlng)
            }
          ]
        );
      }
    );
    SplashScreen.hide();
    Animated.spring(this.fabAnimatedPos, {
      toValue: 0,
      //   velocity: 1,
      speed: 3,
      bounciness: 1,
      useNativeDriver: true
    }).start();
  }

  openLocationModal = () => {
    RNGooglePlaces.openPlacePickerModal()
      .then(place => {
        console.log(place);
        let locationObj = {
          name: place.name,
          lat: place.latitude,
          lng: place.longitude,
          latlng: place.latitude + "," + place.longitude
        };
        let appContext = AppContext.getAppContext();
        appContext.selectedLocation = locationObj;
        AppContext.setAppContext(appContext);
      })
      .catch(error => console.log(error.message));
  };

  openHistory = () => {
    Actions.history();
    // let context = AppContext.getAppContext();
    // if (context.sessionData) {
    //   Actions.notifications();
    // } else {
    //   Actions.login();
    // }
  };

  loader = () => {
    return this.state.isLoading ? (
      <Loader animating={this.state.isLoading} size="large" />
    ) : (
      <View />
    );
  };

  _renderVideoItemList() {
    return (
      <FlatList
        data={Array.from(this.state.videoListMap.values())}
        showsVerticalScrollIndicator={true}
        keyExtractor={item => item.id.videoId}
        renderItem={({ item }) => this._renderVideoItem(item)}
        onRefresh={() => {
          this.setState({ youTubeResp: "", videListMap: new Map() });
          this.prepareYoutubeData(this.state.selectedLocation);
        }}
        refreshing={this.state.videListRefresh}
        onEndReachedThreshold={0.5}
        onEndReached={info => {
          this.prepareYoutubeData(
            this.state.selectedLocation,
            this.state.youTubeResp.nextPageToken
          );
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                marginLeft: width(5),
                marginRight: width(5),
                height: height(0.15),
                marginTop: height(1),
                backgroundColor: DefaultAppTheme.blackColor + "20"
              }}
            />
          );
        }}
      />
    );
  }

  openPlayer = item => {
    Util.recordHistory(this.state.selectedLocation, item);
    Actions.playerLigthBox({ videoDetails: item, title: item.snippet.title });
  };

  _renderVideoItem(item) {
    return <ListItem item={item} openPlayer={this.openPlayer} />;
  }

  _renderFAB() {
    return (
      <Touchable
        onPress={() => {
          this.openLocationModal();
        }}
        content={
          <Animated.View
            style={{
              position: "absolute",
              bottom: height(4),
              backgroundColor: DefaultAppTheme.primary,
              right: width(7),
              borderRadius: width(8),
              width: width(16),
              height: width(16),
              justifyContent: "center",
              alignItems: "center",
              elevation: 5,
              transform: [{ translateY: this.fabAnimatedPos }]
            }}
          >
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
            >
              <Icon
                ios="ios-pin"
                android="md-pin"
                style={{ color: DefaultAppTheme.whiteColor }}
              />
            </Animatable.View>
          </Animated.View>
        }
      />
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: DefaultAppTheme.dashboardBackgroundColor
        }}
      >
        {this._renderVideoItemList()}
        {this.loader()}
        {this._renderFAB()}
      </View>
    );
  }
}

export default Dashboard;
