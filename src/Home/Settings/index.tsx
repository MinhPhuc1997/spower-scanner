import { createStackNavigator } from "@react-navigation/stack";
import Setting from "./Setting";
import ManagerNavigator from "../Manager";
import Print from "./Print/Print";
import Location from "./Location/Location";

const SettingStack = createStackNavigator();
const SettingNavigator = ()=>{
  return(
   <SettingStack.Navigator screenOptions={{headerShown:false}}>
     <SettingStack.Screen name={"settingList"} component={Setting} />
     <SettingStack.Screen name={"settingManager"} component={ManagerNavigator} />
     <SettingStack.Screen name={"settingPrinter"} component={Print} />
     <SettingStack.Screen name={"settingLanguage"} component={Setting} />
     <SettingStack.Screen name={"settingLocation"} component={Location} />
   </SettingStack.Navigator>
  )
}

export default SettingNavigator;
