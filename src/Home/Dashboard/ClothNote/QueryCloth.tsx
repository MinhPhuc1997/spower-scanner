import {Box} from "../../../components";
import Header from "../../../components/Header";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";
import {useEffect, useRef, useState} from "react";
import {Dimensions, Keyboard, TextInput} from "react-native";
import AlertModal from "../../../components/AlertModal";
import {headerList} from "../../../Utils/Contants";
import TableSimple from "../../../components/TableSimple";
import {useTranslation} from "react-i18next"
import {getClothInPallet} from "../../../Utils/ClothNote";

interface StateProps {
    pallet: string,
    code: string,
    visiable: boolean,
    location: string,
    load: boolean,
    palletState:boolean
}

const initState = {pallet: "", code: "", visiable: false, location: "", load: false,palletState:false};

const initNotif = {visiable: false, title: "", content: "", type: 0};

const iconList =[{icon:""},{icon:""},{icon:""},{icon:"user"},{icon:"dashboard"},{icon:"enviromento"},]

const {width, height} = Dimensions.get("window");
const QueryCloth = () => {

    const {t} = useTranslation()
    const palletRef = useRef<TextInput>(null)
    const [state, setState] = useState<StateProps>(initState);
    const [list, setList] = useState<any>([]);
    const [notif, setNotif] = useState(initNotif);

    const scanPallet = async (val: any) => {
        let params = (val == "") ? state.pallet : val;
        setTimeout(async () => {
            setState({...state, load: true, pallet: params})
            let pResult = await getClothInPallet(params);
            if (pResult.result) {
                let arr: any[] = [];
                pResult?.data.map((e: any, i: number) => {
                    arr.push({
                        index: i + 1,
                        noteCode: e.noteCode,
                        clothWeight: e.clothWeight,
                        noteId: e.noteId,
                        invUser:e.invUser,
                        invDate:e.invDate,
                        invLocationCode:e.invLocationCode,
                    });
                });
                Keyboard.dismiss();
                setList(arr);
                Notification("Tra cứu thông tin", `Tổng cộng có ${arr.length} cuộn vải`, 0);
                setTimeout(() => {
                    Keyboard.dismiss();
                    setState({...state, load: false, pallet: params});
                }, 300);

            } else {
                setState({...state, load: false})
                // @ts-ignore
                Notification(pResult.msg.title, pResult.msg.massage, 0);
            }
        }, 500)
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
                return;
        }
    };

    useEffect(() => {
        palletRef.current?.focus();
    }, [])
    return (
        <Box>
            <Header title={t("queryCloth")}/>
            <Box padding={"s"}>
                <Box
                    flexDirection={"row"}
                    marginBottom={"s"}>
                    <Box width={width * 0.7}>
                        <InputText
                            ref={palletRef}
                            min={2}
                            max={40}
                            error={(msg) => {
                                Notification(t("errorInput"), msg, 1);
                            }}
                            placeholder={t("inputPallet")}
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
                        <Button title={t("query")} onPress={() => scanPallet("")}/>
                    </Box>
                </Box>
                <TableSimple
                    headerColor={"edit"}
                    header={headerList}
                    data={list}
                    hide={["noteId"]}
                    height={height - 200}
                    loading={state.load}
                    rowIcon={iconList}
                />

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

export default QueryCloth;

