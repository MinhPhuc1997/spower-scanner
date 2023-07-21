import { Box, Text } from "../../components";
import { TouchableOpacity } from "react-native";
import AntDesgin from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { ManagerRoute } from "../../components/Navigation";

interface HistoryItemProps {
  label: string,
  backdColor: string,
  mainColor: string
}

const HistoryItem = ({ backdColor, mainColor,label }: HistoryItemProps) => {
  const navigation = useNavigation<ManagerRoute>();
  return (
    <TouchableOpacity onPress={() =>
      navigation.navigate("Detail", {
        title: `Dữ liệu ${label}`,
        otherParam: "anything you want here"
      })}>
      <Box
        height={200}
        width={150}
        marginRight={"m"}
        backgroundColor={backdColor}
        borderRadius={"m"}
        padding={"s"}
      >
        <Box height={90}>
          <Box top={10}>
            <AntDesgin name={"clouddownloado"} size={32} color={mainColor} />
          </Box>
        </Box>
        <Box height={100}>
          <Box marginBottom={"m"}>
            <Text variant={"title4"}>{label}</Text>
            <Text variant={"body"}>620 ghi chép</Text>
          </Box>
          <Box flexDirection={"row"} alignItems={"center"}>
            <AntDesgin name={"unlock"} size={17} color={mainColor} />
            <Text variant={"body"} marginLeft={"s"}>Công khai</Text>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default HistoryItem;
