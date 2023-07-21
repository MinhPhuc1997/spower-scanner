import {Box, Text} from "../../../components";
import Header from "../../../components/Header";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";
import {useEffect, useRef, useState} from "react";
import {Dimensions, TextInput} from "react-native";
import AlertModal from "../../../components/AlertModal";
import {headerList} from "../../../Utils/Contants";
import TableSimple from "../../../components/TableSimple";
import {checkExist, getInfoWeave, postExportCloth} from "../../../Utils/ClothNote";
import {Error} from "../../../Utils/Error";
import {checkIncludes, newElement} from "../../../Utils/Tools";
import CutCloth from "../../Components/CutCloth";
import {init} from "i18next";
interface StateProps {
    vatNo: string,
    code: string,
    listKey: { id: any; }[],
    primaryKey: string,
    visiable: boolean,
    location: string,
    load: boolean,
    vatNoState: boolean,
    total: number,
    cutWeight: number,
    cutId: string,
    currentObj: Object
}

const initState = {
    vatNo: "",
    code: "",
    visiable: false,
    location: "",
    load: false,
    listKey: [],
    primaryKey: [],
    vatNoState: false,
    total: 0,
    cutWeight: 0,
    cutId: "",
    currentObj: {}
};

const initNotif = {visiable: false, title: "", content: "", type: 0};

const {width, height} = Dimensions.get("window");
const Export = () => {

    // @ts-ignore
    const vatRef = useRef<TextInput>(null)
    const codeRef = useRef<TextInput>(null)
    // @ts-ignore
    const [state, setState] = useState<StateProps>(initState);
    const [weight, setWeight] = useState(0)
    const [list, setList] = useState<any>([]);
    const [notif, setNotif] = useState(initNotif);
    const [loading, setLoading] = useState(false);

    const scanVatNo = async (val: string) => {
        let value = await getInfoWeave(val);
        // @ts-ignore
        if (value.result) {
            // @ts-ignore
            setState({...state, listKey: value.data, vatNo: val, vatNoState: false, total: value.clothWeight});
            codeRef.current?.focus();
        } else {
            // @ts-ignore
            Notification(value.msg.title, value.msg.massage, 0);
        }
    };

    const scanCode = async (val: string) => {
        if (state.listKey != null && state.listKey.length == 0) {
            let err = Error["209"];
            return Notification(err.title, err.massage, 0);
        }
        let PBresult = await checkExist(val);
        // @ts-ignore
        if (PBresult.result) {
            // @ts-ignore
            if (!checkIncludes(PBresult.data.weaveJobFk, state.listKey)) {
                let err = Error["213"];
                return Notification(err.title, err.massage, 0);
            }
            // @ts-ignore
            let {noteId, noteCode, clothWeight} = PBresult.data;
            let object = {
                noteCode: noteCode,
                id: noteId,
                clothWeight: clothWeight
            };
            let addResult = newElement(object, list);
            if (addResult.result) {
                setList(addResult.data);
                setState({...state, code: ""});
                sumWeight(addResult.data);
                //inputRef.current?.focus();
            } else {
                Notification(addResult.msg.title, addResult.msg.massage, 0);
            }
        } else {
            // @ts-ignore
            Notification(PBresult.msg.title, PBresult.msg.massage, 0);
        }
    };

    const submitData=async () => {
        if(loading==false){
            setLoading(true);
            let result = await postExportCloth(list,state.total,weight,state.vatNo);
            if(result==undefined){
                return Notification(Error["302"].title,Error["302"].massage,0)
            }
            if(!result.success){
                return Notification(result.error.title,result.error.massage,0);
            }
            setLoading(false);
            setList([]);
            // @ts-ignore
            setState(initState);
            setWeight(0);

            return Notification("Hệ thống",result.msg,0);

        }

    }

    const sumWeight = (arr: any[]) => {
        let w = 0;
        if (arr.length > 0) {
            arr.map((e: any) => {
                w = Number(w) + Number(e.clothWeight);
            });
        } else {
            list.map((e: any) => {
                w = Number(w) + Number(e.clothWeight);
            })
            console.log(w)
        }
        setWeight(Number(w.toFixed(2)))
    }

    const changeClothWeight = (val: string, fabric: boolean) => {
        setList(list.map((e: any) => {
            if (e.id == state.cutId) {
                if (fabric) {
                    e.previousWeight = e.clothWeight;
                }
                e.fabric = fabric;
                e.clothWeight = val;
            }
            return e;
        }));
        sumWeight([]);
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
            case 3:
                setState({...state, visiable: true});
                return;
            case 4:
                // @ts-ignore
                changeClothWeight(state.currentObj.previousWeight, false)
                return;
            case 5:
                submitData();
                return;
        }
    };

    useEffect(() => {
        vatRef.current?.focus();
    }, [])

    return (
        <Box>
            <Header title={"Xuất kho vải thô"}/>
            <Box padding={"s"}>
                <Box
                    flexDirection={"row"}
                    marginBottom={"s"}>
                    <Box width={width * 0.7}>
                        <InputText
                            ref={vatRef}
                            success={state.vatNoState}
                            min={2}
                            max={40}
                            error={(msg) => {
                                Notification("Lỗi nhập liệu", msg, 1);
                            }}

                            placeholder={"Nhập mã pallet"}
                            value={state.vatNo}
                            ChangeText={(val) => {
                                setState({...state, vatNo: val, vatNoState: false, listKey: []});
                            }}
                            submit={(val) => scanVatNo(val)}
                        />
                    </Box>
                    <Box
                        flex={1}
                        marginLeft={"s"}
                        justifyContent={"center"}>
                        <Button title={"Hoàn tất"} onPress={() => {
                            Notification("Xác nhận lưu","Bạn có chắc chắc muốn lưu không?",5)
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
                            placeholder={"Scan mã vải thô"}
                            value={state.code}
                            ChangeText={(val) => {
                                setState({...state, code: val});
                            }}
                            submit={(val) => scanCode(val)}
                        />
                    </Box>
                    <Box
                        flex={1}
                        style={{marginTop: -5}}
                        marginLeft={"s"}
                        alignItems={"center"}>
                        <Text
                            variant={(Number(state.total) == Number(weight) && Number(weight)!=0) ? "title4G" : "title4R"}>{weight} KG</Text>
                        <Text variant={"bodyP"}>/ {state.total}KG</Text>
                    </Box>
                </Box>
                <TableSimple
                    rowOnLongPress={(val) => {
                        setState({...state, cutWeight: val.clothWeight, cutId: val.id, currentObj: val});
                        if (val.fabric) {
                            return Notification("Xác nhận", "Bạn có muốn phục hồi trọng lượng trước khi cắt không? ", 4)
                        }
                        Notification("Xác nhận", "Bạn có muốn chắc cắt vải " + val.noteCode + " - " + val.clothWeight, 3)
                    }}
                    rowHightLight={"fabric"}
                    headerColor={"edit"}
                    header={headerList}
                    data={list}
                    hide={["id", "fabric", "previousWeight"]}
                    height={height * 0.8}
                    loading={state.load}
                    rowIcon={[""]}/>
            </Box>
            {(notif.visiable || state.visiable) && (
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
            <CutCloth
                clothCode={state.cutId}
                rWeight={state.cutWeight}
                submit={(val) => {
                    setState({...state,visiable:false});
                    changeClothWeight(val, true)
                }}
                exit={() => setState({...state, visiable: false})}
                visible={state.visiable}/>
        </Box>
    );
};

export default Export;

