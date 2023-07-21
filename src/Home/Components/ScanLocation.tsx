import { Dimensions, KeyboardAvoidingView, Modal, TextInput, TouchableOpacity} from "react-native";
import { Box, Text } from "../../components";
import AntDesgin from "react-native-vector-icons/AntDesign";
import {useEffect, useRef, useState} from "react";
import Button from "../../components/Button";
import InputText from "../../components/InputText";
import {correctLocation, getWhseLocation} from "../../Utils/ClothNote";

interface ChooseLanguageProps {
    visible: boolean,
    exit: () => void,
    error?: (err: { code: number; suggestion: string; title: string; massage: string }) => void,
    submit?:(val: string) => void,

}

interface stateProps {
    checkBox: boolean;
    search: string,
    load: boolean,
    status:boolean,
}

const initState = {
    checkBox: false,
    search: "",
    load: false,
    status:false
};

const { width } = Dimensions.get("window");
const ScanLocation = ({ visible, exit, error ,submit}: ChooseLanguageProps) => {

    const locationRef = useRef<TextInput>(null)
    const [state, setState] = useState<stateProps>(initState);
    const [locationCode, setLocationCode] = useState<string>("");

    const checkLocation=async (val: string) => {
        setLocationCode(val);
        console.log(val);
        let lResult = await correctLocation(val)
        console.log(lResult);
    }

    useEffect(() => {
        locationRef.current?.focus();
    },[]);

    return (
        <KeyboardAvoidingView behavior={"height"}>
            <Modal
                transparent={true}
                visible={visible}
                animationType="slide"
            >
                <Box
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 9
                        },
                        shadowOpacity: 0.50,
                        shadowRadius: 12.35,
                        elevation: 19
                    }}
                    borderTopRightRadius={"l"}
                    borderTopLeftRadius={"l"}
                    position={"absolute"}
                    bottom={0}
                    width={width}
                    height={250}
                    backgroundColor={"background"}
                    padding={"l"}
                >
                    <Box flexDirection={"row"} justifyContent={"flex-end"}>
                        <TouchableOpacity onPress={exit}>
                            <AntDesgin name={"closecircleo"} size={24} />
                        </TouchableOpacity>
                    </Box>

                    <Box marginTop={"m"}>
                        <Text variant={"title3"}>Mã khu vực để pallet</Text>
                    </Box>
                    <Box height={45}
                         justifyContent={"center"}>
                        <InputText ref={locationRef}
                                   ChangeText={(val)=>{setLocationCode(val)}}
                                   value={locationCode}
                                   max={20} min={5}
                                   error={()=>{}}
                                   success={state.status}
                                   submit={(val)=>{checkLocation(val)}}
                        />
                    </Box>
                    <Box marginTop={"s"}>
                        <Button
                            title={"Đồng ý"}
                            onPress={() => {
                                if (submit) {
                                    exit();
                                    submit(locationCode);
                                } }} />
                    </Box>
                </Box>
            </Modal>
        </KeyboardAvoidingView>

    );
};

export default ScanLocation;
