import * as React from "react"
import {Box, Text} from "../../../components";
import {Dimensions, Modal, ScrollView, TouchableOpacity} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import AlertModal from "../../../components/AlertModal";
import {useState} from "react";

interface FabricProps {
    showProducts: boolean
    list: Item[]
    exit: () => void

    choose: (val: Item) => void
}

interface Item {
    cardId: string
    vatNo: string,
    pidNo: number,
    netWeight: number

}

const initNotif = {visiable: false, title: "", content: "", type: 0,};
const {height, width} = Dimensions.get("window")
const Fabric = ({showProducts, exit, list, choose}: FabricProps) => {

    const [notif, setNotif] = useState(initNotif);
    const [item, setItem] = useState<Item>({cardId: "", vatNo: "", pidNo: 0, netWeight: 0})

    const ModalOnPress = () => {
        setNotif({...notif, visiable: false});
        switch (notif.type) {
            case 1:
                choose(item)
                return;
        }
    };
    const Notification = (title: string, massage: string, type: number) => {
        setNotif({
            visiable: true,
            title: title,
            content: massage,
            type: type,
        });
    };
    return (
        <Box>
            <Modal
                transparent={true}
                visible={showProducts}
                animationType="slide"
            >
                <Box
                    positon={"absolute"}
                    top={height * 0.5}
                    width={width}
                    height={height * 0.5}
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
                        <Text variant={"title4"}>Vui lòng chọn vải phù hợp</Text>
                        <TouchableOpacity onPress={() => exit()}>
                            <AntDesign name={"closesquareo"} size={24} color={"#FF6666"}/>
                        </TouchableOpacity>
                    </Box>
                    <Box flex={1} width={width}>
                        <Box
                            flexDirection={"row"}
                            height={45}
                            width={width}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            backgroundColor={"blue3"}
                            padding={"s"}
                        >
                            <Text variant={"body"}>STT</Text>
                            <Text variant={"body"} style={{position: "absolute", left: 65}}>Mã hàng</Text>
                            <Text variant={"body"} style={{position: "absolute", left: 210}}>Số cây</Text>
                            <Text variant={"body"}>Trọng lượng</Text>
                        </Box>
                        <ScrollView>
                            {
                                list.map((e, i) => {
                                    return (
                                        <TouchableOpacity key={i}
                                                          onPress={() => {
                                                              Notification("Xác nhận chọn vải", "Bạn có chắc chắn chọn cây vải này\n Số cây: " + e.pidNo + " ,Trọng lượng: " + e.netWeight + " không ?", 1)
                                                              setItem(e)
                                                          }}>
                                            <Box
                                                flexDirection={"row"}
                                                height={45}
                                                width={width}
                                                alignItems={"center"}
                                                justifyContent={"space-between"}
                                                padding={"s"}
                                            >
                                                <Text variant={"body"}>{i + 1}</Text>
                                                <Text variant={"body"}
                                                      style={{position: "absolute", left: 65}}>{e.vatNo}</Text>
                                                <Text variant={"body"}
                                                      style={{position: "absolute", left: 210}}>{e.pidNo}</Text>
                                                <Text variant={"body"}>{e.netWeight}</Text>
                                            </Box>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
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

export default Fabric;
