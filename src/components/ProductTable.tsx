import {Box, Text} from "./Theme";
import {ReactElement, ReactNode} from "react";
import {
    ScrollView,
    TouchableOpacity,
    TouchableOpacityProps,
    ActivityIndicator
} from "react-native";

import {convertObjectToArray} from "../Utils/Tools";
import {ResponsiveValue} from "@shopify/restyle";

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
    rowHightLight?: string

    posItem: { value: number }[]
}

const ProductTable = ({
                          loading,
                          hide,
                          header,
                          data,
                          height,
                          posItem,
                          headerColor,
                          rowOnPress,
                          rowOnLongPress,
                          rowHightLight
                      }: TableProps) => {


    return (
        <Box height={height} >
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
                                        <Box flexDirection={"row"} >
                                            {convertObjectToArray(e, hide)
                                                .map(({label}, j) => {
                                                    if (j < header.length) {
                                                        if (j > 0 && j < 3) {
                                                            return (
                                                                <Text variant={"body"} key={j} style={{
                                                                    position: "absolute",
                                                                    left: posItem[j].value
                                                                }}>{label}</Text>
                                                            )
                                                        } else {
                                                            return (
                                                                <Text variant={"body"} key={j}>{label}</Text>
                                                            )
                                                        }

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
                                        backgroundColor={(rowHightLight ? e[rowHightLight] ? "main1" : "background" : "background")}
                                    >
                                        {convertObjectToArray(e, hide)
                                            .map(({label}, j) => {
                                                if (j > 0 && j < 3) {
                                                    return (
                                                        <Text variant={"body"} key={j} style={{position:"absolute",left:posItem[j].value}}>{label}</Text>
                                                    )
                                                } else {
                                                    return (
                                                        <Text variant={"body"} key={j}>{label}</Text>
                                                    )
                                                }
                                            })}
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

export default ProductTable;

