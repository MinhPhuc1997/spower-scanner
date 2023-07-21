import { createStackNavigator } from "@react-navigation/stack";
import autoLogin from "./AutoLogin";

const AuthenticationStack = createStackNavigator();

const AuthenticationNavigator = ()=>{
  return(
    <AuthenticationStack.Navigator screenOptions={{headerShown:false}}>
      <AuthenticationStack.Screen name="Login" component={autoLogin} />
    </AuthenticationStack.Navigator>
  )
}

export default  AuthenticationNavigator;
