import { axiosPost } from "./Axios";
const URL = "http://192.168.5.42:93/api/SystemAppLog";
import * as Network from "expo-network";
import DeviceInfo from 'react-native-device-info';
import NetInfo from "@react-native-community/netinfo";

export const postFeedBack = async (optionId: number, errorType: any, sendData: any, apiName: string, msg:any ,note:string) => {

  NetInfo.fetch("wifi").then(async state => {
       let userLogin = "100001";
    let wifi = state.details.ssid;
    let deviceID = await DeviceInfo.getUniqueId();
    let location = await Network.getIpAddressAsync();

    let object = {
      userLogin: userLogin,
      wifiName: wifi,
      deviceID: deviceID,
      location: location,
      errorMsg: JSON.stringify(msg),
      optionId: optionId,
      errorType: errorType,
      sendData: JSON.stringify(sendData),
      apiName: apiName,
      note:note
    };
    await axiosPost(URL, object);

  });



};
