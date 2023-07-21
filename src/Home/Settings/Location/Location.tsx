import {Box,Text} from "../../../components";
import Header from "../../../components/Header";
import InputText from "../../../components/InputText";
import {useEffect, useState} from "react";
import Button from "../../../components/Button";
import * as Location from 'expo-location';
import { setLocationToServer} from "../../../Utils/System";
import AlertModal from "../../../components/AlertModal";
import {Dimensions} from "react-native";

const initNotif = {visiable: false, title: "", content: "", type: 0};
const { width, height } = Dimensions.get("window");
const LocationView = () => {

    const [code, setCode] = useState<string>("");
    const [notif, setNotif] = useState(initNotif);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const getLocaltion=async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }
    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const sumbit=async () => {
        await getLocaltion();
        console.log(location);
        const {accuracy,altitude,altitudeAccuracy,heading,latitude,longitude,speed} = location.coords
        let obj = {
            accuracy:accuracy,
            altitude:altitude,
            altitudeAccuracy:altitudeAccuracy,
            heading:heading,
            latitude:latitude,
            longitude:longitude,
            speed:speed,
            mocked:location.mocked?1:0,
            timestamp:location.timestamp,
            locationCode:code
        }
        console.log(obj)
        setLocationToServer(obj).then((res)=>{
            console.log(res.code)
            if(res.code==200){
                setCode("");
                Notification("Hệ thống","Thao tác thành công",0);
            }else {
                Notification("Hệ thống",res.data,0);
            }
        })

    }

    const Notification = (title: string, massage: string, type: number) => {
        setNotif({
            visiable: true,
            title: title,
            content: massage,
            type: type
        });
    };

    const ModalOnPress = () => {
        setNotif({...notif, visiable: false});
        switch (notif.type) {
            case 0:
                return;
            case 1:

                return;
        }
    };

    return (
        <Box>
            <Header title={"Định vị thiết bị"}/>
            <Text variant={"body"}>{text}</Text>
            <Box flex={1} padding={"s"}>
                <Box>

                    <InputText
                        ChangeText={(val) => setCode(val)}
                        value={code}
                        max={20}
                        min={2}
                        submit={(val)=>setCode(val)}
                        placeholder={"Scan vị trí ở đây!"}
                        error={(msg) => {
                            Notification("Lỗi nhập liệu", msg, 1);
                        }}/>
                    <Box marginTop={"s"}>
                        <Button title={"Gửi"} onPress={()=>sumbit()} />
                    </Box>
                </Box>
            </Box>
            {(notif.visiable) && (
                <Box position={"absolute"}
                     width={width}
                     height={height + 200}
                     opacity={0.4}
                     backgroundColor={"secondary"}
                />)}
            <AlertModal
                onPress={() => {
                    ModalOnPress();
                }}
                visible={notif.visiable}
                exit={() => setNotif({ ...notif, visiable: false })}
                title={notif.title}
                content={notif.content} />
        </Box>
    )
}

export default LocationView;
