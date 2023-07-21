import axios from "axios";
import {API} from "./Contants";
import {axiosGet} from "./Axios";
import DeviceInfo from 'react-native-device-info';
import {getData} from "./Storage";

const MyServer = "http://192.168.5.42:9518";

export const getVersion = () => {
    return axios.get(API + "/api/appVersionUpdate?appId=7");
}

export const setLocationToServer=async (location: any) => {
    let user = await getData("userLogin")
    let url = MyServer + "/api/pdaLocation";
    const params = new URLSearchParams(location).toString();
    const urlfull = `${url}?${params}`;
    console.log(urlfull);
    return axios.post(urlfull, {
        "headers": {
            "content-type": "application/json",
            "Username": user
        },
    });

}

export const getUserLogin = (device: Device) => {
    return axiosGet(MyServer + "/api/pdaDevice", device)
}

export const getToken = (userLogin: string) => {
    return axios({
        url: MyServer + "/api/login",
        method: "post",
        "headers": {"content-type": "application/json",},
        data: {username: userLogin, password: userLogin}
    });
}

export const getDeviceInfor = async () => {
    let device: Device = {
        deviceMac: await DeviceInfo.getMacAddress(),
        deviceName: await DeviceInfo.getDeviceName(),
        hasGms: await DeviceInfo.hasGms() ? 1 : 0,
        hasHms: await DeviceInfo.hasHms() ? 1 : 0,
        ipAddress: await DeviceInfo.getIpAddress(),
        isTablet: await DeviceInfo.isTablet() ? 1 : 0,
        model: await DeviceInfo.getModel(),
        product: await DeviceInfo.getProduct(),
        securityPath: await DeviceInfo.getSecurityPatch(),
        serialNumber: await DeviceInfo.getSerialNumber(),
        systemName: await DeviceInfo.getSystemName(),
        systemVersion: await DeviceInfo.getSystemVersion(),
        uniqueId: await DeviceInfo.getUniqueId(),
    }
    return device;
}
