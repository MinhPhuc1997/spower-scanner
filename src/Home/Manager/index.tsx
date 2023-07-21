import { createStackNavigator } from "@react-navigation/stack";
import Manager from "./Manager";
import ManagerDetail from "./ManagerDetail";

const ManagerStack = createStackNavigator();

const ManagerNavigator=()=>{
  return(
    <ManagerStack.Navigator >
      <ManagerStack.Screen name={"Manager"} component={Manager} options={{headerShown:false}}/>
      <ManagerStack.Screen name={"Detail"} component={ManagerDetail} options={{headerShown:false}}/>
    </ManagerStack.Navigator>
  )
}

export default ManagerNavigator;
