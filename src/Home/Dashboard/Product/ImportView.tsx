import * as React from "react"
import {Box, Text} from "../../../components";
import Header from "../../../components/Header";
import ProductTable from "../../../components/ProductTable";
import {headerProductList} from "../../../Utils/Contants";
import {useState} from "react";
import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window")
const ImportView = ({route, navigation}) => {

    const {data} = route.params;
    const [loading, setLoading] = useState(false)

    return (
        <Box flex={1} >
            <Header title={"Chi tiết vải nhập kho"}/>
            <Box flex={1}>
                <ProductTable header={headerProductList}
                              data={data}
                              height={height - 75}
                              headerColor={"blue3"}
                              loading={loading}
                              posItem={[{value: 0}, {value: 80}, {value: 250}, {value: 0}]}/>
            </Box>

        </Box>
    )
}

export default ImportView