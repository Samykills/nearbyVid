import { AppContext } from "uRnFramework-app-core";
class Util {
  static recordHistory(location, videoDetails) {
    let appContext = AppContext.getAppContext();
    let history = appContext.currentSessionHistory;
    let videoList = history.get(location) ? history.get(location) : [];
    videoList.push(videoDetails);
    history.set(location, videoList);
  }
}

export default Util;
