import { StatusBar, TouchableOpacity,  Platform } from "react-native";
import { Box, Text } from "./Theme";
import * as React from "react";
import AntDesgin from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

interface HeaderProp {
  leftIcon?: boolean, //default true
  rightIcon?: boolean,    //default false
  rightIconName?: string,
  title: string,
  onPressRight?: () => void
  headerColor?: string //default #fff
}

const Header = ({ leftIcon, rightIcon, title, onPressRight, rightIconName }: HeaderProp) => {
  const navigation = useNavigation();
  return (
    <>
      <Box
        height={45}
        style={{marginTop:(Platform.OS == "android")?StatusBar.currentHeight:45}}
        backgroundColor={"background"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottomWidth={1}
        borderColor={"drawer5"}
      >
        {(leftIcon != false) && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Box width={55}
                 height={55}
                 justifyContent={"center"}
                 alignItems={"center"}>
              <AntDesgin name={"left"} size={24} />
            </Box>
          </TouchableOpacity>
        )}
        <Box>
          <Text variant={"title4"}>{title}</Text>
        </Box>
        <Box
          width={48}
          height={48}
          justifyContent={"center"}
          alignItems={"center"}>
          {(rightIcon == true) && (
            <TouchableOpacity onPress={onPressRight}>
              <AntDesgin name={(rightIconName!=null)?rightIconName:"home"} size={24} />
            </TouchableOpacity>
          )}
        </Box>
      </Box></>
  );
};

export default Header;
