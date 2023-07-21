import {Box} from "../../../components";
import Header from "../../../components/Header";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";
import {useEffect, useRef, useState} from "react";
import {ActivityIndicator, Dimensions, TextInput,Keyboard} from "react-native";
import AlertModal from "../../../components/AlertModal";
import TimeLine from "../../Components/TimeLine";
import {historyCLoth} from "../../../Utils/ClothNote";

interface StateProps {
    pallet: string,
    code: string,
    visiable: boolean,
    location: string,
    load: boolean
}

const initState = {pallet: "", code: "", visiable: false, location: "", load: false};
const initStatus = { load: false};

const initNotif = {visiable: false, title: "", content: "", type: 0};

const {width, height} = Dimensions.get("window");
const HistoryCloth = () => {
    const codeRef = useRef<TextInput>(null)
    const [state, setState] = useState<StateProps>(initState);
    const [status,setStatus] = useState(initStatus)
    const [list, setList] = useState<any>([]);
    const [notif, setNotif] = useState(initNotif);

    const Notification = (title: string, massage: string, type: number) => {
        setNotif({
            visiable: true,
            title: title,
            content: massage,
            type: type
        });
    };

    const getData=async (val:string) => {
        setStatus({...status,load: true})
        let result = await historyCLoth(val);
        // @ts-ignore
        if(!result.result){
            setStatus({...status,load: false});
            // @ts-ignore
            return Notification(result.msg.title,result.msg.massage,0)
        }
        // @ts-ignore
        setList(result.data);
        setTimeout(()=>{
            Keyboard.dismiss();
            setStatus({...status,load: false});
        },300)
    }

    const ModalOnPress = () => {
        setNotif({...notif, visiable: false});
        switch (notif.type) {
            case 0:
                codeRef.current?.focus();
                return;
            case 1:

                return;
        }
    };

    useEffect(()=>{
        codeRef.current?.focus();
    },[])

    return (
        <Box>
            <Header title={"Lịch sử vải thô"}/>
            <Box padding={"s"}>
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
                            placeholder={"Nập mã vải thô"}
                            value={state.code}
                            ChangeText={(val) => {
                                setState({...state, code: val});
                            }}
                            submit={(val) => getData(val)}
                        />
                    </Box>
                    <Box
                        flex={1}
                        marginLeft={"s"}
                        justifyContent={"center"}>
                        <Button title={"Hoàn tất"} onPress={() => {
                            getData(state.code)
                        }}/>
                    </Box>
                </Box>
                <Box marginTop={"m"}>
                    <TimeLine data={list}/>
                </Box>

                {/*<TableSimple*/}
                {/*    headerColor={"edit"}*/}
                {/*    header={headerList}*/}
                {/*    data={list}*/}
                {/*    hide={["id"]}*/}
                {/*    height={height * 0.8}*/}
                {/*    loading={state.load}*/}
                {/*    rowIcon={[]}/>*/}

            </Box>
            {(notif.visiable) && (
                <Box position={"absolute"}
                     width={width}
                     height={height + 200}
                     opacity={0.4}
                     backgroundColor={"secondary"}
                />)}
            {(status.load)&&(
                <Box >
                    <ActivityIndicator />
                </Box>
            )}
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

export default HistoryCloth;

