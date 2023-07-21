import React from "react";
import { Box, Text } from "../../components";
import { Dimensions, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface HomeItemProps {
  label: string,
  icon: string,
  action: string,
  subLabel: string,
  draw?: boolean
}

const { width } = Dimensions.get("window");
const WIDTH_SIZE = width / 2;
const HomeItem = ({ label, icon, action, subLabel, draw }: HomeItemProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(action)}>
      <Box
        flexDirection={"row"}
        width={WIDTH_SIZE}
        height={65}
        marginTop={"s"}
        marginBottom={"s"}
        alignItems={"center"}
        borderLeftWidth={(draw) ? 0 : 1}
        borderColor={"drawer5"}
        borderTopRightRadius={"s"}
      >
        <Box
          width={WIDTH_SIZE * 0.2}
          marginLeft={"s"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Ionicons name={icon} size={24} color={"#0075FD"} />
        </Box>
        <Box
          width={WIDTH_SIZE * 0.8}
          paddingLeft={"s"}
          paddingRight={"s"}
        >
          <Text variant="title3">{label}</Text>
          <Text variant="body">{subLabel}</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default HomeItem;
