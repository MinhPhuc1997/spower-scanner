import { Box, Text } from "../components";
import { useEffect } from "react";
import DeviceInfo from 'react-native-device-info';

const autoLogin = () => {

  const getDeviceInfo = ()=>{
    console.log("1234")
    // @ts-ignore
    DeviceInfo.getMacAddress().then((res)=>console.log("getMacAddress",res));
    DeviceInfo.getSerialNumber().then((res)=>console.log("getSerialNumber",res));
    DeviceInfo.getUniqueId().then((res)=>console.log("getUniqueId",res));
    DeviceInfo.hasGms().then((res)=>console.log("hasGms",res));
    DeviceInfo.getDeviceName().then((res)=>console.log("getDeviceName",res));
    DeviceInfo.getTotalDiskCapacity().then((res)=>console.log("getTotalDiskCapacity",res));
    DeviceInfo.getFreeDiskStorage().then((res)=>console.log("getFreeDiskStorage",res));
    DeviceInfo.getIpAddress().then((res)=>console.log("getIpAddress",res));
    DeviceInfo.getDeviceToken().then((res)=>console.log("getDeviceToken",res));
    DeviceInfo.getInstallerPackageName().then((res)=>console.log("getInstallerPackageName",res));
    DeviceInfo.getType().then((res)=>console.log("getType",res));
    DeviceInfo.getTags().then((res)=>console.log("getTags",res));
    DeviceInfo.getProduct().then((res)=>console.log("getProduct",res));
    DeviceInfo.getPhoneNumber().then((res)=>console.log("getPhoneNumber",res));
    DeviceInfo.getHardware().then((res)=>console.log("getHardware",res));
    DeviceInfo.getBatteryLevel().then((res)=>console.log("getBatteryLevel",res));
    DeviceInfo.isCameraPresent().then((res)=>console.log("isCameraPresent",res));
    console.log("getModel",DeviceInfo.getModel());
    console.log("getBrand()",DeviceInfo.getBrand());
    console.log("getSystemName",DeviceInfo.getSystemName());
    console.log("getSystemVersion",DeviceInfo.getSystemVersion());
    console.log("getDeviceType",DeviceInfo.getDeviceType());


  }

  useEffect(() => {
    getDeviceInfo();
  }, []);

  return (<Box>
    <Text variant={"body"}>13</Text>
  </Box>);
};

export default autoLogin;
