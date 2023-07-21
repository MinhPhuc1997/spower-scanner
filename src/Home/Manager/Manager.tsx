import * as  React from "react";
import { Box, Text } from "../../components";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import ChartDisk from "../Components/ChartDisk";
import Entypo from "react-native-vector-icons/Entypo";
import History from "../Components/History";
import LastestHistory from "../Components/LastestHistory";
import { openDatabase } from "react-native-sqlite-storage";
import { StatusBar } from "react-native";
import { DATABASE_NAME } from "../../Utils/Database";
import { useNavigation } from "@react-navigation/native";
import ButtonClose from "../../components/ButtonClose";

const history = [
  {
    index: 1,
    label: "A1424",
    subLabel: "Tổng cộng 24 cuộn vải",
    option: "changeWeight"
  },
  {
    index: 2,
    label: "A1424",
    subLabel: "Tổng cộng 24 cuộn vải",
    option: "changeWeight"
  },
  {
    index: 3,
    label: "A1424",
    subLabel: "Tổng cộng 24 cuộn vải",
    option: "changeWeight"
  }
];

const Manager = () => {
  // @ts-ignore

  const navigation = useNavigation();

  const getDataLocal =async () => {
    const db = await openDatabase({ name: DATABASE_NAME });
    db.transaction((tx)=>{
      tx.executeSql("",[],(tx,result)=>{
        console.log(tx,result)
      })
    })
  }

  return (
    <Box
      flex={1}
      backgroundColor={"background"}
    >
      {(Platform.OS=='ios')&&(
        <View style={{ height: 45, backgroundColor: "#006FAC" }} />
      )}
      <View style={{ height: StatusBar.currentHeight, backgroundColor: "#006FAC" }} />
      <ScrollView style={{ padding: 10 }}>
        <Box
          flexDirection={"row"}
          justifyContent={"space-between"}
          marginBottom={"m"}
        >
          <Text variant={"title4"}>Thống kê</Text>
          <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <ButtonClose/>
          </TouchableOpacity>
        </Box>
        <Box marginBottom={"m"}>
          <ChartDisk />
        </Box>
        <Box marginBottom={"m"}>
          <History  />
        </Box>
        <Box flexDirection={"row"} justifyContent={"space-between"} marginBottom={"m"}>
          <Text variant={"title4"}>Scan gần nhất</Text>
          <Entypo name={"dots-three-horizontal"} size={24} />
        </Box>
        {history.map((e, i) => <LastestHistory {...e} key={i} />)}
      </ScrollView>
    </Box>
  );
};
export default Manager;
