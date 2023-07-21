import {Box} from "../../../components";
import Header from "../../../components/Header";
import InputText from "../../../components/InputText";
import {Dimensions, TextInput, ToastAndroid} from "react-native";
import Button from "../../../components/Button";
import {useEffect, useRef, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {checkExist, putInventory} from "../../../Utils/ClothNote";
import {newElement} from "../../../Utils/Tools";
import AlertModal from "../../../components/AlertModal";
import {beforeRemove, NetworkInfo} from "../../../Utils/Process";
import {headerList} from "../../../Utils/Contants";
import {Error} from "../../../Utils/Error";
import Location from "../../Components/Location";
import TableSimple from "../../../components/TableSimple";
import ScanLocation from "../../Components/ScanLocation";
import {playSound} from "../../../Utils/Sound";

interface FormProps {
    pallet: string,
    palletState:boolean,
    code: string,
    visiable: boolean,
    location: string,
    load: boolean
}

const initForm = {pallet: "", code: "", visiable: false, location: "", load: false,palletState:false};

const initNotif = {visiable: false, title: "", content: "", type: 0};

const {width, height} = Dimensions.get("window");
/* @ts-ignore */
const Inventory = () => {

    let palletRef = useRef<TextInput>(null);
    let inputRef = useRef<TextInput>(null);
    const [state, setState] = useState<FormProps>(initForm);
    const [list, setList] = useState<any>([]);
    const [notif, setNotif] = useState(initNotif);
    const [tag,setTag] = useState<any>()

    const hasUnsavedChanges = Boolean(list.length > 0);

    const navigation = useNavigation();

    const scanPallet =(val:any)=>{
        setState({...state,palletState:true,pallet:val});
        inputRef.current?.focus();
        playSound();
    }

    const scanData = async (val: string) => {
        let value = await checkExist(val);
        if (value != undefined) {
            if (!value.result) {
                // @ts-ignore
                let ms = (value.msg != null) ? value.msg.massage : "";
                let err = Error["401"];
                Notification(err.title, ms, 0);
                return;
            }
            const {noteCode, noteId, clothWeight} = value.data;
            let object = {
                noteCode: noteCode,
                id: noteId,
                clothWeight: clothWeight
            };
            let addResult = newElement(object, list);
            if (addResult.result) {
                setList(addResult.data);
                setState({...state, code: ""});
                inputRef.current?.focus();
                playSound();
            } else {
                Notification(addResult.msg.title, addResult.msg.massage, 0);
            }
        } else {
            let err = Error["301"];
            Notification(err.title, err.massage, 0);
        }
    };

    const beforeSave=()=>{
        if(list.length==0){
            const err = Error["214"];
            Notification(err.title,err.massage,0);
            return;
        }
        Notification("Xác nhận lưu","Bạn có muốn lưu không?",2)
    }

    const saveEntity=async () => {
        let user = '100001'
        let arr: any[] = [];
        list.map((e: any) => {
            arr.push({
                noteId: e.id,
                noteCode: e.noteCode,
                clothWeight: e.clothWeight,
                invFlag: 1,
                invStoreLoadCode: state.pallet,
                invLocationCode: state.location,
                invUser: user
            })
        })

        let result = await putInventory(4, arr)
        if(result.result){
            setList([]);
            setState(initForm);
            playSound();
            // @ts-ignore
            ToastAndroid.show(result.msg.massage,700);
        }else{
            // @ts-ignore
            Notification(result.msg.title,result.msg.massage,0)
        }
        console.log(result);
    }

    const removeCloth=()=>{
        let arr = list.filter((e:any)=>e.noteCode!=tag.noteCode)
        setList(arr)
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
                inputRef.current?.focus();
                return;
            case 1:
                inputRef.current?.focus();
                return;
            case 2:
                saveEntity();
                return;
            case 3:
                removeCloth();
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
        <Box
            flex={1}
            backgroundColor={"background"}>
            <Header
                title={"Kiểm tra vải thô"}
                rightIcon={true}
                rightIconName={"search1"}
                onPressRight={() => { // @ts-ignore
                    navigation.navigate("cn_query");
                }}
            />
            <Box padding={"s"}>
                <Box
                    flexDirection={"row"}
                    marginBottom={"s"}>
                    <Box width={width * 0.7}>
                        <InputText
                            ref={palletRef}
                            success={state.palletState}
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
                            submit={(val) => scanPallet(val)}
                        />
                    </Box>
                    <Box
                        flex={1}
                        marginLeft={"s"}
                        justifyContent={"center"}>
                        <Button title={"Hoàn tất"} onPress={() => {
                            setState({...state, visiable: true});
                        }}/>
                    </Box>
                </Box>
                <Box flexDirection={"row"}>
                    <Box width={width * 0.7}>
                        <InputText
                            ref={inputRef}
                            autoCorrect={false}
                            min={10}
                            max={40}
                            error={(msg) => {
                                Notification("Lỗi nhập liệu", msg, 1);
                            }}
                            placeholder={"Nhập mã pallet"}
                            value={state.code}
                            ChangeText={(val) => {
                                setState({...state, code: val});
                            }}
                            submit={(val) => scanData(val)}
                        />
                    </Box>
                    <Box
                        flex={1}
                        marginLeft={"s"}
                        justifyContent={"center"}>
                        <Button title={"Camera"} onPress={() => {
                            console.log("xac nhan");
                        }}/>
                    </Box>
                </Box>
            </Box>
            <TableSimple
                rowOnLongPress={(val)=>{
                    setTag(val);
                    Notification("Xác nhận xóa","Bạn có muốn xóa vải này!\n " + val.noteCode+" - "+val.clothWeight,3)
                }}
                headerColor={"edit"}
                header={headerList}
                data={list}
                hide={["id"]}
                height={height - 230}
                loading={state.load}
                rowIcon={[]}/>
            {(false) && (
                <Box position={"absolute"}
                     width={width}
                     height={height + 200}
                     opacity={0.4}
                     backgroundColor={"secondary"}
                />)}
            <AlertModal
                onPress={() => ModalOnPress()}
                visible={notif.visiable}
                exit={() => setNotif({...notif, visiable: false})}
                title={notif.title}
                content={notif.content}/>
            <ScanLocation   visible={false} exit={() => setState({...state, visiable: false})} />
            <Location
                submit={(val) => {
                    setState({...state,location:val,visiable: false})
                    beforeSave()

                }}
                exit={() => setState({...state, visiable: false})}
                visible={state.visiable}/>
        </Box>
    );
};

export default Inventory;
