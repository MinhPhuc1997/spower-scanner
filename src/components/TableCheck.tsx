import { Box, Text } from "./Theme";
import { ReactElement, ReactNode } from "react";
import {
  ScrollView,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator
} from "react-native";

import { convertObjectToArray } from "../Utils/Tools";
import { ResponsiveValue } from "@shopify/restyle";
import AntDesgin from "react-native-vector-icons/AntDesign";

interface headerProps {
  label: string,
  type: string,
  size?: number
}

interface TableProps extends TouchableOpacityProps {
  header: headerProps[],
  data: any[],
  height: number,
  hide?: string[],
  headerColor: ResponsiveValue<"background" | "blue3" | "edit", any>
  row?: ReactNode | ReactElement
  rowOnPress?: () => void;
  rowOnLongPress?: () => void,
  loading: boolean
}

const TableCheck = ({
                      loading,
                      hide,
                      header,
                      data,
                      height,
                      headerColor,
                      rowOnPress,
                      rowOnLongPress
                    }: TableProps) => {


  return (
    <Box paddingTop={"s"} height={height}>
      <Box
        height={35}
        alignItems={"center"}
        flexDirection={"row"}
        marginBottom={"s"}
        justifyContent={"space-between"}
        backgroundColor={(!headerColor) ? headerColor : "edit"}>
        {header.map(({ label }, i) => <Text variant={"title3"} key={i}>{label}</Text>)}
      </Box>
      <Box>
        {(loading) && (
          <ActivityIndicator size={"small"} color={"#006da9"} />
        )}
        <ScrollView>
          {data.map((e, i) => {
            return (
              <TouchableOpacity key={i}
                                onPress={rowOnPress}
                                onLongPress={rowOnLongPress}>

                <Box
                  height={40}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  borderColor={"drawer5"}
                  borderWidth={1}
                  alignItems={"center"}
                >
                  {convertObjectToArray(e, hide)
                    .map(({ label }, j) => {
                      return (
                        <>
                          {(label == "uncheck" || label == "checked") ? (
                            <>{(label == "checked") ? (
                                <AntDesgin name={"check"} size={17} color={"green"} />)
                              : <Text variant={"body"}> </Text>}
                            </>
                          ) : (
                            <Text variant={"body"} key={j}>{label}</Text>
                          )}
                        </>);
                    })}
                </Box>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default TableCheck;

