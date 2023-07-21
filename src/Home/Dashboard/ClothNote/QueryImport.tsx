import {Box, Text} from "../../../components";
import Header from "../../../components/Header";
import Calendar from "../../Components/Calendar";
import ContentDetail from "../../Components/ContentDetail";
import * as React from "react";

const QueryImport = () => {
    const changeData =(val:any)=>{
        console.log(val);
    }
    return (
        <Box>
            <Header title={"Lịch sử nhập kho"}/>
            <Calendar onPress={changeData}/>
            <ContentDetail />
        </Box>
    )
}

export default QueryImport;