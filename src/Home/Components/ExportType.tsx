import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Modal, TouchableOpacity } from "react-native";
import { Box, Text } from "../../components";
import AntDesgin from "react-native-vector-icons/AntDesign";
import CheckBox from "../../components/CheckBox";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { getWhseLocation, getWhsePartition } from "../../Utils/ClothNote";
import { Picker } from "@react-native-picker/picker";

import { Error } from "../../Utils/Error";

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

}

const initState = {
    checkBox: false,
    search: "",
    load: false,
};

const list =[
    {
        name:"1.Xuất hàng",
        value:1
    },
    {
        name:"2.Kiểm hàng (Q1-Q10)",
        value:1
    },{
        name:"3.Lựa chọn xuất kho (Y1-Y8)",
        value:1
    },
    {
        name:"4.Kiểm tra và giao hàng (S1-S13)",
        value:1
    },
    {
        name:"5.Cắt mẫu",
        value:1
    },{
        name:"6.Trả sửa",
        value:1
    }

]

const { width } = Dimensions.get("window");
const ExportType = ({ visible, exit, error ,submit}: ChooseLanguageProps) => {

    const [value, setValue] = useState<stateProps>(initState);
    const [locationCode, setLocationCode] = useState<string>("");
    const [partitionCode, setPartitionCode] = useState<string>("");
    const [location, setLocation] = useState<any>([]);
    const [partition, setPartition] = useState<any>([]);


    const getPartition = async () => {
        setValue({ ...value, load: true });
        let result = await getWhsePartition();
        if (result.result) {
            setPartition(result.data);
            getLocation(result.data[0].whsePartitionoid);
            setPartitionCode(result.data[0].whsePartitionoid);
            setValue({ ...value, load: false});


        } else {
            if (error) {
                setValue({ ...value, load: false });
                let err = Error["400"];
                err.massage = result.msg;
                error(err);
            }
        }
    };

    const getLocation = async (val: string) => {
        let data = await getWhseLocation(val);
        if (data.result) {
            data.data.map((e: any) => {
                e.choose = false;
            });
            let arr: { latticeCode: any; locationCode: any; }[] = [];
            data.data.map((e: any) => {
                arr.push({
                    latticeCode: e.latticeCode,
                    locationCode: e.locationCode
                });
            });
            let lc = (arr.length > 0) ? arr[0].locationCode : "";
            setLocationCode(lc);
            setLocation(arr);
            setValue(
                {
                    ...value,
                    load: false,
                });
        } else {
            if (error) {
                setValue({ ...value, load: false });
                let err = Error["400"];
                err.massage = data.msg;
                error(err);
            }
        }
    };

    const ChooseRadio = (val: any) => {
        setPartitionCode(val)
        getLocation(val);
    };

    const reload =()=>{
        if(partition.length==0){
            getPartition();
        }else{
            setTimeout(()=>{
                reload();
            },2000)
        }

    }

    useEffect(() => {
        reload();
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
                    height={400}
                    backgroundColor={"background"}
                    padding={"l"}
                >
                    <Box flexDirection={"row"} justifyContent={"flex-end"}>
                        <TouchableOpacity onPress={exit}>
                            <AntDesgin name={"closecircleo"} size={24} />
                        </TouchableOpacity>
                    </Box>
                    {/*<CheckBox*/}
                    {/*    size={20}*/}
                    {/*    label={"Tự động nhận diện lầu"}*/}
                    {/*    value={value.checkBox}*/}
                    {/*    onChange={(val) => setValue({ ...value, checkBox: val })} />*/}
                    <Box marginTop={"m"}>
                        <Text variant={"title3"}>Nguyên nhân xuất kho</Text>
                    </Box>
                    <Box height={45}
                         borderColor={"primary"}
                         borderRadius={"s"}
                         borderWidth={1}
                         justifyContent={"center"}>
                        <Picker
                            selectedValue={partitionCode}
                            onValueChange={(itemValue: any) => {
                                ChooseRadio(itemValue);
                            }
                            }>
                            {(list.length > 0) && list.map((e, i) => {
                                return (
                                    <Picker.Item label={e.name} value={e.value} key={i} />
                                );
                            })}
                        </Picker>
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
                {value.load && (
                    <Box flex={1}
                         position={"absolute"}
                         backgroundColor={"background"}
                         width={width}
                         height={400}
                         justifyContent={"center"}
                         alignItems={"center"}
                         bottom={0}
                    >
                        <Box flexDirection={"row"} justifyContent={"flex-end"} position={"absolute"} top={10} right={10}>
                            <TouchableOpacity onPress={exit}>
                                <AntDesgin name={"closecircleo"} size={24} />
                            </TouchableOpacity>
                        </Box>
                        <ActivityIndicator size={"small"} />
                    </Box>
                )}
            </Modal>
        </KeyboardAvoidingView>

    );
};

export default ExportType;
