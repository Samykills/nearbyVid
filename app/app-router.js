import React from "react";
import {
  Actions,
  Router,
  Scene,
  Modal,
  Drawer,
  Stack,
  Lightbox,
  Tabs
} from "react-native-router-flux";
import { Platform, Animated } from "react-native";
import {
  DefaultAppTheme,
  WebViewComponent
} from "uRnFramework-basic-components";
import DashboardNavBar from "./views/dashboard/dashboardNavbar/dashboardNavbar";
import Dashboard from "./views/dashboard/dashboard";

import DrawerContent from "./views/appDrawer/drawerContent";
import { width, totalSize } from "react-native-dimension";
import { MenuIcon, BackIcon } from "uRnFramework-basic-assets";
import PlayerModal from "./views/components/youtubePlayer/playerModal";
import HistoryComponent from "./views/history/historyComponent";
import AboutComponent from "./views/components/about/aboutComponent";
import PlayerLightBox from "./views/components/youtubePlayerLightBox/playerLightbox";
import { AppContextModel, AppContext } from "uRnFramework-app-core";

(() => {
  AppContext.setAppContext(AppContextModel);
})();

const AppRouter = () => {
  return (
    <Router>
      <Lightbox>
        <Modal hideNavBar>
          <Stack key="root">
            <Drawer
              hideNavBar
              key="drawer"
              contentComponent={DrawerContent}
              drawerImage={MenuIcon}
              drawerWidth={width(83.9)}
            >
              <Scene
                key="dashboard"
                component={Dashboard}
                navBar={DashboardNavBar}
                title="DashBoard"
                initial
              />

              <Scene
                back
                backButtonImage={BackIcon}
                key="history"
                component={HistoryComponent}
                title="History"
                titleStyle={{
                  fontSize: totalSize(2),
                  fontFamily: DefaultAppTheme.primaryFontFamily,
                  fontWeight: "400"
                }}
                navigationBarStyle={{
                  backgroundColor: DefaultAppTheme.primary,
                  marginTop: Platform.OS === "ios" ? -20 : 0
                }}
                navBarButtonColor={DefaultAppTheme.navBarButtonsColor}
              />
            </Drawer>
            <Scene
              back
              backButtonImage={BackIcon}
              key="webViewComponent"
              component={WebViewComponent}
              direction="vertical"
              titleStyle={{
                fontSize: totalSize(2),
                fontFamily: DefaultAppTheme.primaryFontFamily,
                fontWeight: "400"
              }}
              navigationBarStyle={{
                backgroundColor: DefaultAppTheme.primary,
                marginTop: Platform.OS === "ios" ? -20 : 0
              }}
              navBarButtonColor={DefaultAppTheme.navBarButtonsColor}
            />
          </Stack>
          <Scene
            hideNavBar={false}
            back
            backButtonImage={BackIcon}
            key="about"
            component={AboutComponent}
            title="About VideoHawk"
            titleStyle={{
              fontSize: totalSize(2),
              fontFamily: DefaultAppTheme.primaryFontFamily,
              fontWeight: "400"
            }}
            navigationBarStyle={{
              backgroundColor: DefaultAppTheme.primary,
              marginTop: Platform.OS === "ios" ? -20 : 0
            }}
            navBarButtonColor={DefaultAppTheme.navBarButtonsColor}
          />
          <Scene
            hideNavBar={false}
            back
            backButtonImage={BackIcon}
            key="playerModal"
            component={PlayerModal}
            titleStyle={{
              fontSize: totalSize(2),
              fontFamily: DefaultAppTheme.primaryFontFamily,
              fontWeight: "400"
            }}
            navigationBarStyle={{
              backgroundColor: DefaultAppTheme.primary,
              marginTop: Platform.OS === "ios" ? -20 : 0
            }}
            navBarButtonColor={DefaultAppTheme.navBarButtonsColor}
          />
        </Modal>
        <Scene key="playerLigthBox" component={PlayerLightBox} />
      </Lightbox>
    </Router>
  );
};

export default AppRouter;
