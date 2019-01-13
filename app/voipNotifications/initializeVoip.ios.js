import VoipPushNotification from "react-native-voip-push-notification";

class InitializeVoip {
  static initializeVoipNotifications() {
    VoipPushNotification.requestPermissions(); // required

    VoipPushNotification.addEventListener("register", token => {
      // send token to your apn provider server
      console.log(token);
    });

    VoipPushNotification.addEventListener("notification", notification => {
      // register your VoIP client, show local notification, etc.
      // e.g.
      // this.doRegister();

      console.log(notification);
      /* there is a boolean constant exported by this module called
           * 
           * wakeupByPush
           * 
           * you can use this constant to distinguish the app is launched
           * by VoIP push notification or not
           *
           * e.g.
           */
      if (VoipPushNotification.wakeupByPush) {
        // do something...

        // remember to set this static variable to false
        // since the constant are exported only at initialization time
        // and it will keep the same in the whole app
        VoipPushNotification.wakeupByPush = false;
      }

      /**
       * Local Notification Payload
       *
       * - `alertBody` : The message displayed in the notification alert.
       * - `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view";
       * - `soundName` : The sound played when the notification is fired (optional).
       * - `category`  : The category of this notification, required for actionable notifications (optional).
       * - `userInfo`  : An optional object containing additional notification data.
       */
      VoipPushNotification.presentLocalNotification({
        alertBody: "hello! " + notification.getMessage()
      });
    });
  }
}

export default InitializeVoip;
