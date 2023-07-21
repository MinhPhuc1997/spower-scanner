import {Box} from "../../../components";
import Header from "../../../components/Header";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";
import {useEffect, useRef, useState} from "react";
import {Dimensions, TextInput} from "react-native";
import AlertModal from "../../../components/AlertModal";
import {headerProduct} from "../../../Utils/Contants";
import SwipeTable from "../../../components/SwipeTable";
import {checkPallet, checkProduct} from "../../../Utils/Product";
import {playSound} from "../../../Utils/Sound";
import {newElement} from "../../../Utils/Tools";

interface StateProps {
    pallet: string,
    code: string,
    visiable: boolean,
    location: string,
    load: boolean,
    palletStatus: boolean
}

const initState = {pallet: "", code: "", visiable: false, location: "", load: false, palletStatus: false};

const initNotif = {visiable: false, title: "", content: "", type: 0};

const {width, height} = Dimensions.get("window");

const ExportScan = ({navigation}) => {

    const palletRef = useRef<TextInput>(null);
    const codeRef = useRef<TextInput>(null);
    const [state, setState] = useState<StateProps>(initState);
    const [list, setList] = useState<any>([]);
    const [notif, setNotif] = useState(initNotif);

    const ScanPallet = async (val: string) => {
        try {
            let sResult = await checkPallet(val);
            if (sResult) {
                setState({...state, palletStatus: true, pallet: val});
                playSound();
                codeRef.current?.focus();
            } else {
                // @ts-ignore
                Notification(sResult.msg.title, sResult.msg.massage, 0)
            }
        } catch (e) {
            Notification("Hệ thống-555", e.toString(), 0)
        }
    }

    const ScanCode = async (val: string) => {
        try {
            let sResult = await checkProduct(val);
            if (sResult?.result) {
                // @ts-ignore
                const {cardId, productNo, netWeight, weightUnit} = sResult.data;
                let object = {
                    productNo: productNo,
                    id: cardId,
                    netWeight: netWeight,
                    weightUnit:weightUnit
                };
                let addResult = newElement(object, list);
                if (addResult.result) {
                    setList(addResult.data);
                    setState({...state, code: ""});
                    codeRef.current?.focus();
                    playSound();
                } else {
                    Notification(addResult.msg.title, addResult.msg.massage, 0);
                }
            } else {
                // @ts-ignore
                Notification(sResult.msg.title, sResult.msg.massage, 0)
            }
        } catch (e) {
            Notification("Hệ thống-555", e.toString(), 0)
        }
    }

    const beforeSave =()=>{
        Notification("Xác nhận lưu","Bạn có chắc chắn muốn lưu không?",3);

    }

    const saveEntity=()=>{
        navigation.goBack()
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
                palletRef.current?.focus();
                return;
            case 1:
                codeRef.current?.focus();
                return;
            case 3:
                saveEntity();
                return;
        }
    };

    useEffect(() => {
        palletRef.current?.focus();
    }, [])

    return (
        <Box>
            <Header title={"Scan xuất kho"}/>
            <Box padding={"s"}>
                <Box
                    flexDirection={"row"}
                    marginBottom={"s"}>
                    <Box width={width * 0.7}>
                        <InputText
                            ref={palletRef}
                            min={2}
                            max={40}
                            success={state.palletStatus}
                            error={(msg) => {
                                Notification("Lỗi nhập liệu", msg, 1);
                            }}
                            placeholder={"Nhập mã pallet"}
                            value={state.pallet}
                            ChangeText={(val) => {
                                setState({...state, pallet: val, palletStatus: false});
                            }}
                            submit={(val) => ScanPallet(val)}
                        />
                    </Box>
                    <Box
                        flex={1}
                        marginLeft={"s"}
                        justifyContent={"center"}>
                        <Button title={"Hoàn tất"} onPress={() => {
                            beforeSave();
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
                            placeholder={"Scan mã vải thành phẩm"}
                            value={state.code}
                            ChangeText={(val) => {
                                setState({...state, code: val});
                            }}
                            submit={(val) => ScanCode(val)}
                        />
                    </Box>
                    <Box
                        flex={1}
                        marginLeft={"s"}
                        justifyContent={"center"}>
                        <Button title={"Camera"} onPress={() => {
                            Notification("Hệ thống", "Phiên bản này chưa hỗ trợ camera!", 0);
                        }}/>
                    </Box>
                </Box>
                <SwipeTable
                    hide={["id"]}
                    height={height - 170}
                    header={headerProduct}
                    list={list}
                    headerColor={"edit"}/>

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
                exit={() => setNotif({...notif, visiable: false})}
                title={notif.title}
                content={notif.content}/>
        </Box>
    );
};

export default ExportScan;

