import * as React from "react";
import {Box} from "../../../components";
import {useEffect, useRef, useState} from "react";
import Header from "../../../components/Header";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";
import AlertModal from "../../../components/AlertModal";
import Fabric from "./Fabric"
import {checkExist, checkPallet, InvBatch} from "../../../Utils/Product";

import {newElement} from "../../../Utils/Tools";
import ProductTable from "../../../components/ProductTable";
import ProductLocaion from "./ProductLocaion";
import {playSound} from "../../../Utils/Sound";
import {useNavigation} from "@react-navigation/native";
import {beforeRemove, NetworkInfo} from "../../../Utils/Process";

import {headerProductList} from "../../../Utils/Contants";
import {Dimensions, TextInput, ToastAndroid} from "react-native";

interface StateProps {
    pallet: string,
    code: string,
    visiable: boolean,
    location: string,
    load: boolean,
    palletState: boolean
    visiableLocal: boolean
}

const initState = {
    pallet: "",
    code: "",
    visiable: false,
    location: "",
    load: false,
    palletState: false,
    visiableLocal: false
};

const initNotif = {visiable: false, title: "", content: "", type: 0,};

const {width, height} = Dimensions.get("window");
const ProductInventory = () => {

    const palletRef = useRef<TextInput>(null);
    const codeRef = useRef<TextInput>(null);

    const [state, setState] = useState<StateProps>(initState);
    const [list, setList] = useState<any>([]);
    const [notif, setNotif] = useState(initNotif);
    const [showProducts, setShowProducts] = useState(false);
    const [duplicateList, setDuplicateList] = useState([]);

    const navigation = useNavigation();

    const hasUnsavedChanges = Boolean(list.length > 0);
    const scanPallet = async (val: any) => {
        let pResult = await checkPallet(val);
        console.log(pResult)
        // @ts-ignore
        if (pResult.result) {
            playSound()
            setState({...state, palletState: true})
            codeRef.current?.focus();
        } else {
            setState({...state, pallet: ""});
            // @ts-ignore
            Notification(pResult?.msg.title, pResult?.msg.massage, 0);
        }
    };

    const scanCode = async (val: string) => {
        let pResult = await checkExist(val);
        if (pResult.result) {
            console.log(pResult.data);
            // @ts-ignore
            if (pResult.data.length > 1) {
                setShowProducts(true)
                // @ts-ignore
                pResult.data.map((e, _) => {
                    e.pidNo = Number(e.productNo.slice(-3))
                })
                // @ts-ignore
                setDuplicateList(pResult.data)
            } else {
                // @ts-ignore
                addNewDataToList(pResult.data[0]);
            }
        } else {
            setState({...state, pallet: ""});
            // @ts-ignore
            Notification(pResult?.msg.title, pResult?.msg.massage, 0);
        }
    };

    const sendDataToServer = async () => {
        let res = await InvBatch(list, state.pallet, state.location)
        if (!res.result) {
            // @ts-ignore
            return Notification(res?.msg.title, res?.msg.massage, 0);
        }
        playSound()
        setState(initState)
        setList([])
        // setNotif(notif)
        setShowProducts(false)
        setDuplicateList([])
        palletRef.current?.focus()
        ToastAndroid.show("Thao tác thành công", 600);
    }

    const addNewDataToList = (data: any) => {
        playSound()
        setState({...state, visiable: true});
        let object = {
            id: data.cardId,
            vatNo: data.vatNo,
            pidNo: Number(data.productNo.slice(-3)),
            netWeight: data.netWeight,
            productNo: data.productNo,
            grossWeight: data.grossWeight,
            yardLength: data.yardLength,

        }
        data.id = data.cardId;
        let addResult = newElement(object, list);
        if (addResult.result) {
            setList(addResult.data);
            setState({...state, code: ""});
            //inputRef.current?.focus();
        } else {
            Notification(addResult.msg.title, addResult.msg.massage, 0);
        }
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
                sendDataToServer();
                return;
        }
    };


    useEffect(
        () => {
            navigation.addListener("beforeRemove", (e) => {
                beforeRemove(e, hasUnsavedChanges, navigation);
            });
            NetworkInfo().then(r => console.log(r));
            palletRef.current?.focus();
        },
        [navigation, hasUnsavedChanges]
    );

    return (
        <Box flex={1}>
            <Header title={"Kiểm kho vải thành phẩm"}
                    rightIcon={true}
                    rightIconName={"search1"}
                    onPressRight={() => {
                        Notification("Hệ thống", "Tính năng vẫn đang phát triển", 0)
                    }}/>
            <Box padding={"s"}>
                <Box
                    flexDirection={"row"}
                    marginBottom={"s"}>
                    <Box width={width * 0.7}>
                        <InputText
                            min={2}
                            success={state.palletState}
                            max={40}
                            error={(msg) => {
                                Notification("Lỗi nhập liệu", msg, 1);
                            }}
                            placeholder={"Scan mã pallet"}
                            value={state.pallet}
                            ChangeText={(val) => {
                                setState({...state, palletState: false, pallet: val});
                            }}
                            ref={palletRef}
                            submit={(val) => scanPallet(val)}
                        />
                    </Box>
                    <Box
                        flex={1}
                        marginLeft={"s"}
                        justifyContent={"center"}>
                        <Button title={"Hoàn tất"} onPress={() => {
                            if (!state.palletState || list.length == 0) {
                                Notification("Thông báo", "Vui lòng kiểm tra lại pallet hoặc scan vải trước khi lưu", 0)
                                return;
                            }
                            setState({...state, visiableLocal: true})
                        }}/>
                    </Box>
                </Box>
                <Box
                    flexDirection={"row"}
                    marginBottom={"s"}>
                    <Box width={width * 0.7}>
                        <InputText
                            ref={codeRef}
                            min={2}
                            max={40}
                            error={(msg) => {
                                Notification("Lỗi nhập liệu", msg, 1);
                            }}
                            placeholder={"Scan mã vải ở đây!"}
                            value={state.code}
                            ChangeText={(val) => {
                                setState({...state, code: val});
                            }}
                            submit={(val) => scanCode(val)}
                        />
                    </Box>
                    <Box
                        flex={1}
                        marginLeft={"s"}
                        justifyContent={"center"}>
                        <Button title={"Chọn vải"} onPress={() => scanCode(state.code)}/>
                    </Box>
                </Box>


            </Box>
            <Box width={width} flex={0.99} padding={"s"}>
                <ProductTable
                    headerColor={"edit"}
                    header={headerProductList}
                    data={list}
                    hide={["id", "productNo", "grossWeight", "yardLength"]}
                    height={height * 0.8}
                    loading={state.load}
                    posItem={[{value: 0}, {value: 60}, {value: 220}, {value: 0}]}/>
            </Box>

            {(notif.visiable || showProducts) && (
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
            <ProductLocaion
                visiable={state.visiableLocal}
                exit={() => setState({...state, visiableLocal: false})}
                save={(val) => {
                    setState({...state, location: val, visiableLocal: false})
                    Notification("Xác nhận lưu", "Bạn có muốn lưu không?", 1)
                }
                }/>
            <Fabric
                showProducts={showProducts}
                exit={() => setShowProducts(false)}
                list={duplicateList}
                choose={(val) => {
                    setShowProducts(false)
                    addNewDataToList(val)
                }}/>
        </Box>
    );
};

export default ProductInventory;

