/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import <Firebase.h>
#import "RNFirebaseMessaging.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"
#import <PushKit/PushKit.h>
#import "RNVoipPushNotificationManager.h"
@import GooglePlaces;
@import GoogleMaps;
#import <AVFoundation/AVFoundation.h>
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  [GMSPlacesClient provideAPIKey:@"AIzaSyAOkKvReM9hfUYE2MBrMWRUWYE-ojPTFIo"];
  [GMSServices provideAPIKey:@"AIzaSyAOkKvReM9hfUYE2MBrMWRUWYE-ojPTFIo"];
    #ifdef DEBUG
        jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    #else
        jsCodeLocation = [CodePush bundleURL];
    #endif
  
 

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"nearbyvid"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [FIRApp configure];
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  [RNSplashScreen show];
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback error: nil];
  return YES;
}

  -(void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
    [RNFirebaseMessaging didReceiveLocalNotification:notification];
  }

  - (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo {
    [RNFirebaseMessaging didReceiveRemoteNotification:userInfo];
  }

  - (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
  [RNFirebaseMessaging didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

  - (void)userNotificationCenter:(UNUserNotificationCenter *)center
willPresentNotification:(UNNotification *)notification
withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
  [RNFirebaseMessaging willPresentNotification:notification withCompletionHandler:completionHandler];
}

  - (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
withCompletionHandler:(void (^)(void))completionHandler {
  [RNFirebaseMessaging didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}

/* Add PushKit delegate method */

// Handle updated push credentials
- (void)pushRegistry:(PKPushRegistry *)registry didUpdatePushCredentials:(PKPushCredentials *)credentials forType:(NSString *)type {
  // Register VoIP push token (a property of PKPushCredentials) with server
  [RNVoipPushNotificationManager didUpdatePushCredentials:credentials forType:(NSString *)type];
}

// Handle incoming pushes
- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(NSString *)type {
  // Process the received push
  [RNVoipPushNotificationManager didReceiveIncomingPushWithPayload:payload forType:(NSString *)type];
}

@end
