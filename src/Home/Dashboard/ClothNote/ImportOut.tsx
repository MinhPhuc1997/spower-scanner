import {Dimensions, TextInput, Vibration} from "react-native";
import {Box} from "../../../components";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import {useRef, useState} from "react";
import AlertModal from "../../../components/AlertModal";
import TableSimple from "../../../components/TableSimple";
import {CheckHadImport, postInWhse} from "../../../Utils/ClothNote";
import {playSound} from "../../../Utils/Sound";
import {newElement} from "../../../Utils/Tools";
import Location from "../../Components/Location";

import InputText from "../../../components/InputText";
import {headerList} from "../../../Utils/Contants";
import {Error} from "../../../Utils/Error"

interface StateProps {
    pallet: string,
    code: string,
    deliNo: string,
    visiable: boolean,
    location: string,
    load: boolean
};

interface StatusProps {
    pallet: boolean,
    code: boolean,
    location: boolean
};

const initState = {pallet: "", code: "", visiable: false, location: "", load: false, deliNo: ""};
const initstatus = {pallet: false, code: false, location: false}
const initNotif = {visiable: false, title: "", content: "", type: 0};
const {width, height} = Dimensions.get("window");

// @ts-ignore
const ImportOut = ({navigation}) => {

    const codeRef = useRef<TextInput>(null)
    const palletRef = useRef<TextInput>(null)

    const [state, setState] = useState<StateProps>(initState);
    const [status, setStatus] = useState<StatusProps>(initstatus);
    const [list, setList] = useState<any>([]);
    const [notif, setNotif] = useState(initNotif);


    const getWhseDeliNo = async (val: string) => {
        setState({...state, pallet: val});
        setStatus({...status, pallet: true})
        setState({...state, deliNo: ""});
        codeRef.current?.focus()
        playSound()
    }

    const getClothNote = async (val: string) => {
        let res = await CheckHadImport(val);
        if (res != null && !res.result) {
            Vibration.vibrate(500);
            // @ts-ignore
            return Notification(res.msg.title, res.msg.massage, 0)
        }
        // @ts-ignore
        if (state.deliNo != "" && state.deliNo != res.data.no) {
            let err = Error["221"];
            return Notification(err.title, err.massage, 0)
        }
        // @ts-ignore
        const {noteId, noteCode, clothWeight, proName} = res.data.cloth;
        // setState({...state, deliNo: res.data.no});
        let obj = {
            index: list.length + 1,
            id: noteId,
            proName: proName,
            noteCode: noteCode,
            clothWeight: clothWeight
        }
        let addResult = newElement(obj, list);
        if (addResult.result) {
            setList(addResult.data);
            // @ts-ignore
            setState({...state, code: "", deliNo: res.data.no});
            codeRef.current?.focus()
            playSound();
        } else {
            Notification(addResult.msg.title, addResult.msg.massage, 0);
        }
    }

    const checkBeforeSumbit = () => {
        console.log(list.length)
        if (list.length == 0) {
            let err = Error["222"]
            return Notification(err.title, err.massage, 1)
        }
        setStatus({...status, location: true})
    }

    const submit = async () => {
        let arr: { pidNo: number; weight: any; weightUnit: string; noteCode: any; weaveJobCode: any; }[] = [];
        list.map((e: any) => {
            arr.push({
                pidNo: Number(e.noteCode.slice(-3)),
                weight: e.clothWeight,
                weightUnit: "KG",
                noteCode: e.noteCode,
                weaveJobCode: e.proName
            })
        })
        let ws = await postInWhse(arr, state.deliNo, state.pallet, state.location, 1);
        if (!ws.result) {
            // @ts-ignore
            return Notification(ws.msg.title, ws.msg.massage, 0);
        }
        setState(initState);
        setStatus(initstatus);
        setList([]);
        playSound()
        return Notification("Hệ thống", "Thao tác thành công!", 0);
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
                codeRef.current?.focus()
                return;
            case 2:
                submit();
                return;
            case 3:
                palletRef.current?.focus()
                return;
        }
    };

    return (
        <Box>
            <Header title={"Nhập kho vải thô -Gia công"}/>
            <Box padding={"s"}>
                <Box
                    flexDirection={"row"}
                    marginBottom={"s"}>
                    <Box width={width * 0.47}>
                        <InputText
                            ref={palletRef}
                            success={status.pallet}
                            min={2}
                            max={40}
                            error={(msg) => {
                                Notification("Lỗi nhập liệu", msg, 1);
                            }}
                            placeholder={"Nhập mã pallet"}
                            value={state.pallet}
                            ChangeText={(val) => {
                                setState({...state, pallet: val});
                            }}
                            submit={(val) => getWhseDeliNo(val)}
                        />
                    </Box>
                    <Box width={width * 0.47} marginLeft={"s"}>
                        <InputText
                            disabled={true}
                            min={2}
                            max={40}
                            error={(msg) => {
                                Notification("Lỗi nhập liệu", msg, 1);
                            }}
                            placeholder={"Mã đơn nhập kho"}
                            value={state.deliNo}
                            ChangeText={(val) => {
                                setState({...state, deliNo: val});
                            }}
                        />
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
                            placeholder={"Nhập mã vải "}
                            value={state.code}
                            ChangeText={(val) => {
                                setState({...state, code: val});
                            }}
                            submit={(val) => getClothNote(val)}
                        />
                    </Box>
                    <Box
                        flex={1}
                        marginLeft={"s"}
                        justifyContent={"center"}>
                        <Button title={"Hoàn tất"} onPress={() => checkBeforeSumbit()} disable={state.deliNo == ""}/>
                    </Box>
                </Box>
                <TableSimple
                    headerColor={"edit"}
                    header={headerList}
                    data={list}
                    hide={["id", "proName"]}
                    height={height * 0.8}
                    loading={state.load}
                    rowIcon={[]}/>

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
            <Location
                submit={(val) => {
                    setState({...state, location: val});
                    Notification("Hệ thống", "Bạn có muốn lưu không?", 2);
                }}
                exit={() => setStatus({...status, location: false})}
                visible={status.location}/>
        </Box>
    );
};

export default ImportOut;