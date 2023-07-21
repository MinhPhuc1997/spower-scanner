import * as React from "react"
import {Box, Text} from "../../../components/Theme"
import {Dimensions, Keyboard, Modal, Switch, TouchableOpacity} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useEffect, useState} from "react";
import InputText from "../../../components/InputText";
import AlertModal from "../../../components/AlertModal";
import Button from "../../../components/Button";


const {height, width} = Dimensions.get("window")

interface ProductLocaionProps {
    visiable: boolean
    exit: () => void

    save: (val: string) => void
}

const initNotif = {visiable: false, title: "", content: "", type: 0,};

const ProductLocaion = ({visiable, exit, save}: ProductLocaionProps) => {
    const [notif, setNotif] = useState(initNotif);
    const [isEnabled, setIsEnabled] = useState(true);
    const [local, setLocal] = useState("");


    const toggleSwitch = () => {
        setIsEnabled(!isEnabled)
    }

    const ModalOnPress = () => {
        setNotif({...notif, visiable: false});
    };

    const Notification = (title: string, massage: string, type: number) => {
        setNotif({
            visiable: true,
            title: title,
            content: massage,
            type: type
        });
    };
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
                console.log("open")
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
                console.log("close")
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <Box>
            <Modal
                transparent={true}
                visible={visiable}
                animationType="slide"
            >
                <Box
                    positon={"absolute"}
                    top={isKeyboardVisible ? height * 0.2 : height * 0.6}
                    width={width}
                    height={height * 0.4}
                    backgroundColor={"background"}
                    borderTopLeftRadius={"s"}
                    borderTopRightRadius={"s"}
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.34,
                        shadowRadius: 6.27,
                        elevation: 10,
                    }}
                >
                    <Box
                        height={45}
                        width={width}
                        borderBottomWidth={1}
                        borderBottomColor={"back1"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        padding={"s"}
                        flexDirection={"row"}
                    >
                        <Text variant={"title4"}>Xác nhận vị trí của pallet</Text>
                        <TouchableOpacity onPress={() => exit()}>
                            <AntDesign name={"closesquareo"} size={24} color={"#FF6666"}/>
                        </TouchableOpacity>
                    </Box>
                    <Box width={width} flex={1} padding={"l"}>
                        <Box justifyContent={"center"} padding={"s"}>
                            <Text variant={"title4G"} style={{position: "absolute", top: 10, left: 10}}>Sử dụng kho tự
                                động</Text>
                            <Switch
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={isEnabled ? '#335bc1' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </Box>
                        {
                            (!isEnabled) && (
                                <Box marginTop={"s"}>
                                    <InputText
                                        ChangeText={(val) => setLocal(val)}
                                        value={local}
                                        max={30}
                                        min={4}
                                        placeholder={"Nhập vị trí đặt pallet ở đây!"}
                                        error={(msg) => {
                                            Notification("Lỗi nhập liệu", msg, 1);
                                        }}/>
                                </Box>
                            )
                        }
                        <Box marginTop={"s"}>
                            <Button title={"Lưu lại"} onPress={()=>save(isEnabled?"自动仓":local)}/>
                        </Box>
                    </Box>
                </Box>
            </Modal>
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
                exit={() => setNotif({...notif, visiable: false})}
                title={notif.title}
                content={notif.content}/>
        </Box>
    )
}
export default ProductLocaion;