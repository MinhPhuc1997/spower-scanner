import {HomeRoute} from "../components/Navigation";
import DashboardNavigator from "./Dashboard";
import {createStackNavigator} from "@react-navigation/stack";
import SettingNavigator from "./Settings";
import {useEffect} from "react";
import {getDeviceInfor, getUserLogin} from "../Utils/System";
import {storeData} from "../Utils/Storage";
import {io} from "socket.io-client";

const HomeStack = createStackNavigator<HomeRoute>();
const SERVER_URL = 'http://localhost:9100/socket';

const HomeNavigator = () => {
    const infor = async () => {
        let device = await getDeviceInfor();
        getUserLogin(device).then(async (res) => {
            console.log(res, "res")
            if (res.data != undefined) {
                await storeData('userLogin', res.data.userLogin);
                await storeData('token', res.data.id);
            }
        });
    }
    useEffect(() => {
        const socket = io(SERVER_URL);
        console.log("here")
        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        socket.on('message', (msg) => {
            console.log('Received message: ', msg);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);
    useEffect(() => {
        infor();
    }, [])

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Dashboard"
                component={DashboardNavigator}
                options={{
                    headerShown: false,
                    title: "Trang chủ",
                    headerTitleStyle: {color: "#fff"},
                    headerStyle: {backgroundColor: "#017dbb"},

                }}/>
            <HomeStack.Screen
                name="Setting"
                component={SettingNavigator}
                options={{
                    headerShown: false,
                    title: "Dữ liệu",
                    headerTitleStyle: {color: "#fff"},
                    headerStyle: {backgroundColor: "#006FAC"},

                }}/>
        </HomeStack.Navigator>
    );
};

export default HomeNavigator;
