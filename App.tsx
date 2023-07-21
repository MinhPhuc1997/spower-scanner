import { ThemeProvider } from "./src/components/Theme";
import { LoadAssets } from "./src/components";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppRoute } from "./src/components/Navigation";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/Utils/Language/i18n";
import HomeNavigator from "./src/Home";
import {useEffect, useState} from "react";
import {Dimensions, ToastAndroid} from "react-native";
import {getVersion} from "./src/Utils/System";
import UpdateScreen from "./src/UpdateApp";
import {playSound} from "./src/Utils/Sound";

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf")
};

const AppStack = createStackNavigator<AppRoute>();

export default function App() {

  const [update,setUpdate]=useState(false);

  const checkUpdate = () => {
    var pkg = require('./package.json');
    getVersion().then((res) => {
      // @ts-ignore
      const newVersion = res.versioncode;
      const versionList = pkg.version.split(".");
      const currentVersion = `${versionList[0]}.${versionList[1]}`;
      console.log(currentVersion , newVersion)
      if (currentVersion != newVersion) {
        ToastAndroid.show("更新本版!", 1997);
        setUpdate(true);
      } else {
        ToastAndroid.show("最新本版!", 1997);
      }
    })
  }
  useEffect(()=>{
    console.log(Dimensions.get("window"))
    playSound()
    checkUpdate();
  },[])
  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <LoadAssets {...{ fonts }}>
          <SafeAreaProvider>
            {update?(
                <UpdateScreen/>
            ):(
                <AppStack.Navigator screenOptions={{ headerShown: false }}>
                  <AppStack.Screen name="Home" component={HomeNavigator} />
                </AppStack.Navigator>
            )}
          </SafeAreaProvider>
        </LoadAssets>
      </I18nextProvider>
    </ThemeProvider>
  );
}
