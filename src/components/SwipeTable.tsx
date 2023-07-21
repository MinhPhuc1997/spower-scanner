import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

import {SwipeListView} from 'react-native-swipe-list-view';
import {Box} from "./Theme";
import {ResponsiveValue} from "@shopify/restyle";
import {convertObjectToArray} from "../Utils/Tools";

interface headerProps {
    label: string,
    size?: number
}

interface SwipeTableProps {
    header: headerProps[],
    list: any[],
    height:number,
    hide?:string[],
    headerColor: ResponsiveValue<"background" | "blue3" | "edit", any>
}

const SwipeTable = ({list,header,hide,headerColor,height}: SwipeTableProps) => {
    const [listData, setListData] = useState(
        Array(20)
            .fill('')
            .map((_, i) => ({key: `${i}`, text: `item #${i}`}))
    );

    console.log(list)
    convertObjectToArray(list[0],undefined)
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = (data: any) => {
        return(

                <Box
                    height={50}
                    backgroundColor={"background"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    borderColor={"drawer5"}
                    borderWidth={1}
                    alignItems={"center"}
                >
                    {convertObjectToArray(data.item, hide).map(({ label }, j) => <Text  key={j}>{label}</Text>)}
                </Box>
        )
    }

    const renderHiddenItem = (data, rowMap) => (
        <Box
            flexDirection={"row"}
            paddingLeft={"s"}
            alignItems={"center"}
            justifyContent={"space-between"}
            backgroundColor={"main1"}
            flex={1}>
            <TouchableOpacity>
                <Text>Chi tiết</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Thoát</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Xóa</Text>
            </TouchableOpacity>
        </Box>
    );

    return (
        <Box height={height}>
            <Box
                height={35}
                alignItems={"center"}
                flexDirection={"row"}
                marginBottom={"s"}
                justifyContent={"space-between"}
                backgroundColor={(!headerColor) ? headerColor : "edit"}>
                {header.map(({ label }, i) => <Text  key={i}>{label}</Text>)}
            </Box>
            <SwipeListView
                data={list}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
        </Box>

    )
}
export default SwipeTable;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 200
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'green',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});