
import { Dimensions, Modal, TouchableOpacity } from "react-native";
import AntDesgin from "react-native-vector-icons/AntDesign";
import { Box,Text } from "./Theme";

interface confirmExitProps{
  visible:boolean,
  exit:()=>void,
  title:string,
  content:string,
  onPress:()=>void
}

const {height} = Dimensions.get("window")

const AlertModal = ({visible,exit,title,content,onPress}:confirmExitProps)=>{
  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <Box
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 9
          },
          shadowOpacity: 0.50,
          shadowRadius: 12.35,
          elevation: 19
        }}
        width={300}
        height={140}
        alignSelf={"center"}
        backgroundColor={"background"}
        position={"absolute"}
        top={height / 2 - 100}
        borderRadius={"m"}

      >
        <Box flexDirection={"row"} justifyContent={"space-between"} padding={"s"}>
          <Text variant={"title3"}>{title}</Text>
          <TouchableOpacity onPress={exit}>
            <AntDesgin name={"closecircleo"} size={20} />
          </TouchableOpacity>
        </Box>
        <Box flex={1} alignItems={"center"} justifyContent={"center"} paddingLeft={"s"} paddingRight={"s"}>
          <Text variant={"body"}>{content}</Text>
        </Box>
        <Box flexDirection={"row"} borderTopWidth={1} borderColor={"drawer5"} flex={1}>
          <Box borderRightColor={"drawer5"} borderRightWidth={1} flex={0.5} justifyContent={"center"}
               alignItems={"center"}>
            <TouchableOpacity onPress={exit}>
              <Text variant={"buttonBlack"}>Hủy bỏ</Text>
            </TouchableOpacity>
          </Box>
          <Box flex={0.5} justifyContent={"center"} alignItems={"center"}>
            <TouchableOpacity onPress={onPress}>
              <Text variant={"buttonBlack"}>Đồng ý</Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default AlertModal;
