import { Box, Text } from "./Theme";
import { ReactElement, ReactNode } from "react";
import {
  ScrollView,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  View,
  Animated,
  I18nManager, ActivityIndicator
} from "react-native";

import Swappable from "react-native-gesture-handler/Swipeable";
import { convertObjectToArray } from "../Utils/Tools";
import { RectButton } from "react-native-gesture-handler";
import { ResponsiveValue } from "@shopify/restyle";

interface headerProps {
  label: string,
  size?: number
}

interface TableProps extends TouchableOpacityProps {
  header: headerProps[],
  data: any[],
  height:number,
  hide?:string[],
  headerColor: ResponsiveValue<"background" | "blue3" | "edit", any>
  row?: ReactNode | ReactElement
  rowOnPress?: () => void;
  rowOnLongPress?: () => void,
  rowSwappableClose?: () => void,
  rowSwappableDetail?: (e: any) => void,
  rowSwappableDelete?: (e: any) => void,
  loading:boolean
}

let row: Array<any> = [];
let prevOpenedRow: any;

const Table = ({
                 loading,
                 hide,
                 header,
                 data,
                 height,
                 headerColor,
                 rowOnPress,
                 rowOnLongPress,
                 rowSwappableClose,
                 rowSwappableDetail,
                 rowSwappableDelete
               }: TableProps) => {

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation,
    type: number,
    index: number
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0]
    });
    const pressHandler = (type: number) => {
      closeRow(0);
      switch (type) {
        case 1: // exit
          if (rowSwappableClose) {
            rowSwappableClose();
          }
          return;
        case 2: //detail
          if (rowSwappableDetail) {
            rowSwappableDetail(data[index]);
          }
          return;
        case 3: //delete
          if (rowSwappableDelete) {
            rowSwappableDelete(data[index]);
          }
          return;
      }
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={() => pressHandler(type)}>
          <Box justifyContent={"center"} alignItems={"center"}>
            <Text style={styles.actionText} variant={"body"}>{text}</Text>
          </Box>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    _dragAnimatedValue: Animated.AnimatedInterpolation,
    index: number
  ) => (
    <View
      style={{
        width: 192,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row"
      }}>
      {renderRightAction("Thoát", "#C8C7CD", 192, progress, 1, index)}
      {renderRightAction("Xem", "#40a9ff", 128, progress, 2, index)}
      {renderRightAction("Xóa", "#dd2c00", 64, progress, 3, index)}
    </View>
  );

  const closeRow = (index: number) => {
    row.map((e, i) => {
      if (i != index) {
        e.close();
      }
    });

    if (prevOpenedRow && prevOpenedRow == row[index]) {
      prevOpenedRow.close();
      prevOpenedRow=null;
    } else {
      prevOpenedRow = row[index];
    }
  };

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
        {(loading)&&(
          <ActivityIndicator size={"small"} color={"#006da9"} />
        )}
        <ScrollView>
          {data.map((e, i) => {
            return (
              <TouchableOpacity key={i}
                                onPress={rowOnPress}
                                onLongPress={rowOnLongPress}>
                <Swappable
                  ref={ref => row[i] = ref}
                  friction={2}
                  enableTrackpadTwoFingerGesture
                  rightThreshold={40}
                  renderRightActions={(a, b) => renderRightActions(a, b, i)}
                  onSwipeableOpen={() => {
                    closeRow(i);
                  }}
                >
                  <Box
                    height={40}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    borderColor={"drawer5"}
                    borderWidth={1}
                    alignItems={"center"}
                  >
                    {convertObjectToArray(e,hide)
                      .map(({ label }, j) => <Text variant={"body"} key={j}>{label}</Text>)}
                  </Box>
                </Swappable>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Table;

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#497AFC",
    justifyContent: "center"
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});
