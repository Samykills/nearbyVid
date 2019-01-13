import Config from "react-native-config";
import { HttpClient } from "uRnFramework-basic-components";
class DashboardService {
  constructor() {
    let baseUrl = Config.BASE_GOOGLE_URL;
    if (baseUrl) {
      this.httpClient = new HttpClient(baseUrl, {}, 10000);
    }
  }

  /**
   *
   * @param {*} location
   * lat,lng of the location to get videos from youtube data api
   *
   */
  loadVideosBasedOnLatLng(requestData) {
    let url = "youtube/v3/search/";
    let data = {
      key: "AIzaSyAOkKvReM9hfUYE2MBrMWRUWYE-ojPTFIo",
      location: requestData.location,
      locationRadius: "10mi",
      part: "snippet",
      chart: "mostPopular",
      type: "video",
      pageToken: requestData.pageToken,
      maxResults: "20"
    };
    return this.httpClient.getApi(url, data);
  }
}

export default DashboardService;
