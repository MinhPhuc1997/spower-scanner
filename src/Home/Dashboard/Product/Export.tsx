import { Box } from "../../../components";
import Header from "../../../components/Header";
import { useState } from "react";
import { Dimensions } from "react-native";
import * as React from "react";
import PalletInfo from "../../Components/PalletInfo";

interface StateProps {
    pallet: string,
    code: string,
    visiable: boolean,
    location: string,
    load:boolean
}
const history = [
    {
        index: 1,
        storeLoadCode: "A1424",
        sumWeight:"1247.5",
        pidCount:5,
        clothOutDtlbs:[
           {
               productNo:"DF-2200124001",
               storeLoadCode:"A1241",
               woWeights:27.5,
               woUnit:"KG"
           },
           {
               productNo:"DF-2200124001",
               storeLoadCode:"A1241",
               woWeights:27.5,
               woUnit:"KG"
           },
           {
               productNo:"DF-2200124001",
               storeLoadCode:"A1241",
               woWeights:27.5,
               woUnit:"KG"
           },
           {
               productNo:"DF-2200124001",
               storeLoadCode:"A1241",
               woWeights:27.5,
               woUnit:"KG"
           },
           {
               productNo:"DF-2200124001",
               storeLoadCode:"A1241",
               woWeights:27.5,
               woUnit:"KG"
           }
       ]
    },
    {
        index: 1,
        storeLoadCode: "A1424",
        sumWeight:"1247.5",
        pidCount:5,
        clothOutDtlbs:[
            {
                productNo:"DF-2200124001",
                storeLoadCode:"A1241",
                woWeights:27.5,
                woUnit:"KG"
            },
            {
                productNo:"DF-2200124001",
                storeLoadCode:"A1241",
                woWeights:27.5,
                woUnit:"KG"
            },
            {
                productNo:"DF-2200124001",
                storeLoadCode:"A1241",
                woWeights:27.5,
                woUnit:"KG"
            },
            {
                productNo:"DF-2200124001",
                storeLoadCode:"A1241",
                woWeights:27.5,
                woUnit:"KG"
            },
            {
                productNo:"DF-2200124001",
                storeLoadCode:"A1241",
                woWeights:27.5,
                woUnit:"KG"
            }
        ]
    },
    {
        index: 1,
        storeLoadCode: "A1424",
        sumWeight:"1247.5",
        pidCount:5,
        clothOutDtlbs:[
            {
                productNo:"DF-2200124001",
                storeLoadCode:"A1241",
                woWeights:27.5,
                woUnit:"KG"
            },
            {
                productNo:"DF-2200124001",
                storeLoadCode:"A1241",
                woWeights:27.5,
                woUnit:"KG"
            },
            {
                productNo:"DF-2200124001",
                storeLoadCode:"A1241",
                woWeights:27.5,
                woUnit:"KG"
            },
            {
                productNo:"DF-2200124001",
                storeLoadCode:"A1241",
                woWeights:27.5,
                woUnit:"KG"
            },
            {
                productNo:"DF-2200124001",
                storeLoadCode:"A1241",
                woWeights:27.5,
                woUnit:"KG"
            }
        ]
    },
];

const initState = { pallet: "", code: "", visiable: false, location: "" ,load:false};
const initNotif = { visiable: false, title: "", content: "", type: 0 };
const { width, height } = Dimensions.get("window");
const ProductExport = ({navigation}) => {

    const [state, setState] = useState<StateProps>(initState);
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

    const ModalOnPress = () => {
        setNotif({ ...notif, visiable: false });
        switch (notif.type) {
            case 0:
                return;
            case 1:

                return;
        }
    };

    return (
        <Box>
            <Header title={"Xuất kho thành phẩm"} rightIcon={true} rightIconName={"plus"}  onPressRight={()=>navigation.navigate("p_export_scan")} />
            <Box padding={"s"}>
                {history.map((e,i)=>{
                    return(
                        <PalletInfo object={e} />
                    )
                })}
            </Box>

        </Box>
    );
};

export default ProductExport;

