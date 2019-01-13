import DashboardService from "../service/dashboardService";

const dashboardService = new DashboardService();
class DashboardServiceManager {
  static loadVideosBasedOnLatLng(requestData) {
    return new Promise((resolve, reject) => {
      dashboardService.loadVideosBasedOnLatLng(requestData).then(
        res => {
          if (res.status == 200) {
            resolve(res.data);
          } else {
            if (res.data.error) {
              reject(res.data.error.message);
            } else {
              reject(res.problem);
            }
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }
}

export default DashboardServiceManager;
