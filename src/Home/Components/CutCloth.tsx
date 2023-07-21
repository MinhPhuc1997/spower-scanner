import {Dimensions,  KeyboardAvoidingView, Modal, TextInput, TouchableOpacity} from "react-native";
import {Box, Text} from "../../components";
import AntDesgin from "react-native-vector-icons/AntDesign";
import {useEffect, useRef, useState} from "react";
import Button from "../../components/Button";
import InputText from "../../components/InputText";


interface ChooseLanguageProps {
    visible: boolean,
    exit: () => void,
    error?: (err: { code: number; suggestion: string; title: string; massage: string }) => void,
    submit?: (val: string) => void,
    rWeight: number,
    clothCode:string

}

const {width, height} = Dimensions.get("window");
const CutCloth = ({visible, exit, rWeight,submit,clothCode}: ChooseLanguageProps) => {

    const inputRef = useRef<TextInput>(null)
    const [cutWeight, setCutWeight] = useState<string>("");

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

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
                    height={height * 0.45}
                    backgroundColor={"background"}
                    padding={"l"}
                >
                    <Box flexDirection={"row"} justifyContent={"flex-end"}>
                        <TouchableOpacity onPress={exit}>
                            <AntDesgin name={"closecircleo"} size={24}/>
                        </TouchableOpacity>
                    </Box>
                    <Box marginTop={"s"}>
                        <Text variant={"title3"}>Trọng lượng xuất kho ( Kg )</Text>
                        <InputText ref={inputRef} ChangeText={(val) => {
                            if (Number(val) - rWeight > 0) {
                                setCutWeight("")
                            } else {
                                setCutWeight(val)
                            }
                        }} value={cutWeight.toString()} max={5} min={2} error={() => {
                        }} keyboardType={"numeric"}
                        />
                    </Box>
                    <Box marginTop={"m"}>
                        <Text variant={"title3"}>Trọng lượng gửi lại kho ( Kg )</Text>
                        <InputText ChangeText={() => {
                        }} value={(rWeight - Number(cutWeight)).toString()} max={5} min={2} error={() => {
                        }} keyboardType={"numeric"}/>
                    </Box>
                    <Box marginTop={"m"}>
                        <Button title={"Đồng ý cắt"} onPress={() => submit ? submit(cutWeight) :{}}/>
                    </Box>
                </Box>
            </Modal>
        </KeyboardAvoidingView>

    );
};

export default CutCloth;
