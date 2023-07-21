import {Box, Text} from "../../../components";
import Header from "../../../components/Header";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";
import AlertModal from "../../../components/AlertModal";
import {useEffect, useRef, useState} from "react";
import {changeAudit, checkVatNoImp} from "../../../Utils/Product";
import AntDesign from "react-native-vector-icons/AntDesign"
import {Error} from "../../../Utils/Error";
import {Dimensions, ScrollView, TextInput, ToastAndroid, Keyboard, TouchableOpacity} from "react-native";

interface StateProps {
    vatno: string,
    code: string,
    data: object,
    visiable: boolean,
    location: string,
    load: boolean
}

const rowSize = 40;
const leftSlide = 0.5;
const rightSlide = 0.5;

const initState = {vatno: "123", code: "", visiable: false, location: "", load: false, data: {}};

const initNotif = {visiable: false, title: "", content: "", type: 0};

const {width, height} = Dimensions.get("window");
const ProductImport = ({navigation}) => {

    const inputCode = useRef<TextInput>();
    const [state, setState] = useState<StateProps>(initState);
    const [notif, setNotif] = useState(initNotif);

    const scanVatNo = async (val: string) => {
        Keyboard.dismiss();
        setState({...state, load: true});
        setTimeout(async () => {
            let vResult = await checkVatNoImp(val);
            // @ts-ignore
            if (vResult.result) {
                let count = vResult?.data?.length
                let sumWeight = 0
                let sumLength = 0
                // @ts-ignore
                vResult?.data.map((e: any, i: number) => {
                    sumLength += Number(e.yardLength)
                    sumWeight += Number(e.netWeight)
                });
                sumWeight.toFixed(2)
                sumLength.toFixed(2);
                let arr: { index: number; vatNo: any; pidNo: any; netWeight: any; }[] = [];
                vResult?.data?.map((e, i) => {
                    arr.push({index: i + 1, vatNo: e.vatNo, pidNo: e.pidNo, netWeight: e.netWeight})
                })
                setState({
                    ...state,
                    data: {count: count, sumWeight: sumLength, sumLength: sumLength, list: arr},
                    load: false
                });
            } else {
                // @ts-ignore
                Notification(vResult.msg.title, vResult.msg.massage, 1);
            }
        }, 700);

    };

    const handleAudit = async (type: number) => {
        setState({...state, load: true});
        let aResult = await changeAudit(state.data, type);
        if (aResult.result) {
            setState(initState);
            ToastAndroid.show("Thao tác thành công!", 1000);
        } else {
            // @ts-ignore
            Notification(aResult.msg.title, aResult.msg.massage, 1);
        }
    };

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
                setState({...state, load: false});
                return;
        }
    };

    useEffect(() => {
        inputCode.current?.focus();
    });

    return (
        <Box>
            <Header title={"Nhập kho vải thành phẩm"}/>
            <Box padding={"s"} height={height - 70} width={width}>
                <ScrollView>
                    <Box flexDirection={"row"} marginBottom={"s"}>
                        <Box width={width * 0.7}>
                            <InputText
                                ref={inputCode}
                                min={2}
                                max={40}
                                error={(msg) => {
                                    Notification("Lỗi nhập liệu", msg, 1);
                                }}
                                placeholder={"Scan mã đơn nhập kho"}
                                value={state.vatno}
                                ChangeText={(val) => {
                                    console.log("onchange", val);
                                    setState({...state, vatno: val});
                                }}
                                submit={(val) => scanVatNo(val)}
                            />
                        </Box>
                        <Box flex={1} marginLeft={"s"} justifyContent={"center"}>
                            <Button title={"Tra cứu"} onPress={() => {
                                Notification("Thông báo", "Tính năng đang phát triển!", 0);
                            }}/>
                        </Box>
                    </Box>
                    <Box marginBottom={"s"}>
                        <Box flexDirection={"row"} justifyContent={"space-between"}>
                            <Text variant={"title4"}>Thông tin nhập kho</Text>
                            <TouchableOpacity>
                                <Text variant={"detail"}>Xem file PDF</Text>
                            </TouchableOpacity>
                        </Box>
                    </Box>
                    <Box width={width} padding={"s"} height={180} backgroundColor={"background"} borderRadius={"s"}>
                        <Box flexDirection={"row"} flex={1}>

                            <Box flex={0.3} justifyContent={"center"} alignItems={"center"}>
                                <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}}
                                                  onPress={() => {
                                                      navigation.navigate("p_import_view", {data: state.data.list})
                                                  }
                                                  }>
                                    <AntDesign name={"profile"} color={"#1fd7c9"} size={35}
                                               style={{marginRight: 7, marginBottom: 20}}/>
                                    <Text variant={"title4"}>DANH SÁCH VẢI NHẬP KHO</Text>
                                </TouchableOpacity>
                            </Box>


                            <Box height={150} width={1} backgroundColor={"drawer5"} alignSelf={"center"} margin={"s"}/>

                            <Box flex={0.7}>
                                <Box flexDirection={"row"} alignItems={"center"} marginBottom={"s"}>
                                    <AntDesign name={"file1"} color={"#4172e1"} size={17} style={{marginRight: 7}}/>
                                    <Text variant={"body"}>Phiên bản: 1</Text>
                                </Box>
                                <Box flexDirection={"row"} alignItems={"center"} marginBottom={"s"}>
                                    <AntDesign name={"bars"} color={"#de773f"} size={17} style={{marginRight: 7}}/>
                                    <Text variant={"body"}>Tổng số cây: {state.data.count}</Text>
                                </Box>
                                <Box flexDirection={"row"} alignItems={"center"} marginBottom={"s"}>
                                    <AntDesign name={"dashboard"} color={"#69cb5c"} size={17} style={{marginRight: 7}}/>
                                    <Text variant={"body"}>Tổng trọng lượng:{state.data.sumWeight}</Text>
                                </Box>
                                <Box flexDirection={"row"} alignItems={"center"} marginBottom={"s"}>
                                    <AntDesign name={"paperclip"} color={"#e3d264"} size={17} style={{marginRight: 7}}/>
                                    <Text variant={"body"}>Tổng chiều dài:{state.data.sumLength}</Text>
                                </Box>
                                <Box flexDirection={"row"} alignItems={"center"} marginBottom={"s"}>
                                    <AntDesign name={"printer"} color={"#e1417e"} size={17} style={{marginRight: 7}}/>
                                    <Text variant={"body"}>Thời gian in :2022-25-15 12:15:14</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box marginTop={"s"}>
                        <Box width={width - 10} height={100} backgroundColor={"background"} borderWidth={3}
                             borderColor={"drawer5"} alignItems={"center"} flexDirection={"row"}>
                            <Box width={6} height={95} backgroundColor={"blue3"} borderTopRightRadius={"s"}
                                 borderBottomRightRadius={"s"}/>
                            <Box flex={1}>
                                <Text variant={"title4"}> Mã pallet: A2525</Text>
                                <Box flexDirection={"row"} justifyContent={"space-between"} flex={1} padding={"s"}>
                                    <Text variant={"body"}> Tổng số cây: 35</Text>
                                    <Text variant={"body"}> T.lượng: 1253.45KG</Text>
                                </Box>
                                <Box position={"absolute"} bottom={10}>
                                    <Text variant={"detailR"} marginLeft={"s"}>Vui lòng kiểm tra thông tin trước khi
                                        nhập kho</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box marginTop={"s"}>
                        <Box width={width - 10} height={100} backgroundColor={"background"} borderWidth={3}
                             borderColor={"drawer5"} alignItems={"center"} flexDirection={"row"}>
                            <Box width={6} height={95} backgroundColor={"blue3"} borderTopRightRadius={"s"}
                                 borderBottomRightRadius={"s"}/>
                            <Box flex={1}>
                                <Text variant={"title4"}> Mã pallet: Kệ sắt</Text>
                                <Box flexDirection={"row"} justifyContent={"space-between"} flex={1} padding={"s"}>
                                    <Text variant={"body"}> Tổng số cây: 35</Text>
                                    <Text variant={"body"}> T.lượng: 1253.45KG</Text>
                                </Box>
                                <Box position={"absolute"} bottom={10}>
                                    <Text variant={"detailR"} marginLeft={"s"}>Vui lòng kiểm tra thông tin trước khi
                                        nhập kho</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box marginTop={"s"} marginBottom={"s"}>
                        <TouchableOpacity>
                            <Box width={width - 10} height={100} backgroundColor={"background"} borderWidth={3}
                                 borderColor={"drawer5"} justifyContent={"center"} alignItems={"center"}>
                                <AntDesign name={"plus"} color={"#53b62d"} size={35} style={{marginRight: 7}}/>
                                <Text variant={"body"}>Thêm pallet mới</Text>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                    {/*<Box marginBottom={"s"}>*/}
                    {/*    <Box flexDirection={"row"} justifyContent={"space-between"}>*/}
                    {/*        <Text variant={"title4"}>Lịch sử nhập kho</Text>*/}
                    {/*    </Box>*/}
                    {/*</Box>*/}

                    <Box flexDirection={"row"} height={45} marginTop={"m"}>
                        {state.data.whseVouch != null && state.data.whseVouch == 0 && (
                            <>
                                <Box flex={1} marginRight={"s"} justifyContent={"center"}>
                                    <Button title={"Từ chối"} color={"danger"} onPress={() => handleAudit(1)}/>
                                </Box>
                                <Box flex={1} marginLeft={"s"} justifyContent={"center"}>
                                    <Button title={"Bắt đầu scan"} color={"main1"}
                                            onPress={() => navigation.navigate("p_import_detail", {id: state.data.vatNo})}/>
                                </Box>
                            </>
                        )}
                        {state.data.whseVouch != null && state.data.whseVouch == 9 && (
                            <Box flex={1} justifyContent={"center"}>
                                <Button title={"Hủy nhận đơn"} color={"main2"} onPress={() => handleAudit(0)}/>
                            </Box>
                        )}
                        {state.data.whseVouch != null && state.data.whseVouch == 1 && (
                            <Box flex={1} justifyContent={"center"}>
                                <Button title={"Bắt đầu scan"} color={"main1"}
                                        onPress={() => navigation.navigate("p_import_detail", {id: state.data.vatNo})}/>
                            </Box>
                        )}
                    </Box>
                </ScrollView>
            </Box>
            {(state.load) && (
                <Box position={"absolute"} width={width} height={height + 200} opacity={0.4}
                     backgroundColor={"secondary"}>
                </Box>)}
            {(notif.visiable) && (
                <Box position={"absolute"} width={width} height={height + 200} opacity={0.4}
                     backgroundColor={"secondary"}/>)}
            <AlertModal
                onPress={() => {
                    ModalOnPress();
                }}
                visible={notif.visiable}
                exit={() => {
                    setNotif({...notif, visiable: false});
                    setState({...state, load: false});
                }}
                title={notif.title}
                content={notif.content}/>
        </Box>
    );
};

export default ProductImport;

