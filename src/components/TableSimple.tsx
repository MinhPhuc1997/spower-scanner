import {Box, Text} from "./Theme";
import {ReactElement, ReactNode} from "react";
import {
    ScrollView,
    TouchableOpacity,
    TouchableOpacityProps,
    ActivityIndicator
} from "react-native";

import {convertObjectToArray,convertObjectToArrayWithIcon} from "../Utils/Tools";
import {ResponsiveValue} from "@shopify/restyle";
import AntDesgin from "react-native-vector-icons/AntDesign";

interface headerProps {
    label: string,
    size?: number
}

interface TableProps extends TouchableOpacityProps {
    header: headerProps[],
    data: any[],
    height: number,
    hide?: string[],
    headerColor: ResponsiveValue<"background" | "blue3" | "edit", any>
    row?: ReactNode | ReactElement
    rowOnPress?: (object: any) => void;
    rowOnLongPress?: (object: any) => void,
    loading: boolean,
    rowIcon: any[],
    rowHightLight?:string
}

const TableSimple = ({
                         loading,
                         hide,
                         header,
                         data,
                         height,
                         headerColor,
                         rowOnPress,
                         rowOnLongPress,
                         rowIcon,
                         rowHightLight
                     }: TableProps) => {


    return (
        <Box height={height}>
            <Box
                height={35}
                alignItems={"center"}
                flexDirection={"row"}
                marginBottom={"s"}
                justifyContent={"space-between"}
                backgroundColor={(!headerColor) ? headerColor : "edit"}>
                {header.map(({label}, i) => <Text variant={"title3"} key={i}>{label}</Text>)}
            </Box>
            <Box>
                {(loading) && (
                    <ActivityIndicator size={"small"} color={"#006da9"}/>
                )}
                <ScrollView>
                    {data.map((e: any, i) => {
                        return (
                            <TouchableOpacity key={i}
                                              onPress={() => rowOnPress ? rowOnPress(e) : {}}
                                              onLongPress={() => rowOnLongPress ? rowOnLongPress(e) : {}}>
                                {(header.length < convertObjectToArray(e, hide).length) ? (
                                    <Box marginBottom={"s"} backgroundColor={"background"} padding={"s"}>
                                        <Box flexDirection={"row"} justifyContent={"space-between"}>
                                            {convertObjectToArray(e, hide)
                                                .map(({label}, j) => {
                                                    if(j<header.length){
                                                        return(
                                                            <Text variant={"body"} key={j}>{label}</Text>
                                                        )
                                                    }
                                                })}
                                        </Box>
                                        <Box flexDirection={"row"} flexWrap={"wrap"} justifyContent={"space-between"}>
                                            {convertObjectToArrayWithIcon(e, hide,rowIcon)
                                                .map(({label,icon}, j) => {
                                                    if(j>header.length-1){
                                                        return(
                                                            <Box flexDirection={"row"}>
                                                                {(icon!="")&&(
                                                                    <Box style={{marginTop:5,marginRight:3}}>
                                                                        <AntDesgin name={icon} size={15} color={"blue"} />
                                                                    </Box>
                                                                )}
                                                                <Text variant={"body"} key={j}>{label}</Text>
                                                            </Box>

                                                        )
                                                    }
                                                })}
                                        </Box>

                                    </Box>
                                ) : (
                                    <Box
                                        height={40}
                                        flexDirection={"row"}
                                        justifyContent={"space-between"}
                                        borderColor={"drawer5"}
                                        borderWidth={1}
                                        alignItems={"center"}
                                        backgroundColor={(rowHightLight?e[rowHightLight]?"main1":"background":"background")}
                                    >
                                        {convertObjectToArray(e, hide)
                                            .map(({label}, j) => <Text variant={"body"} key={j}>{label}</Text>)}
                                    </Box>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </Box>
        </Box>
    );
};

export default TableSimple;

