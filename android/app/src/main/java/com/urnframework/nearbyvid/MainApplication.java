package com.urnframework.nearbyvid;


import android.app.Application;

import com.facebook.react.ReactApplication;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import net.gen10.RNDeviceInformation.RNDeviceInformation;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.crash.RNFirebaseCrashPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;

import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import com.BV.LinearGradient.LinearGradientPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.reactnative.camera.RNCameraPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeExceptionHandlerPackage(),
            new ReactNativeConfigPackage(),
            new VectorIconsPackage(),
            new RNFirebasePackage(),
            new RNFirebaseCrashlyticsPackage(),
            new RNFirebaseCrashPackage(),
            new RNFirebaseMessagingPackage(),
            new LinearGradientPackage(),
            new RNDeviceInformation(),
            new SplashScreenReactPackage(),
            new RNCameraPackage(),
            new RNGooglePlacesPackage(),
            new ReactNativeYouTube(),
          new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
