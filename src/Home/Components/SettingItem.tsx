import { Box, Text } from "../../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface SettingItemProps {
  label: string,
  icon: string,
  action: string,
  subLabel: string,
  hint?: string,
  onShow: (action: string) => void;
};

const AlertList = ["lan", "exit"];

const SettingItem = ({ label, icon, action, subLabel, hint, onShow }: SettingItemProps) => {
  const navigation = useNavigation();

  const showAlert = (action: string) => {
    return AlertList.findIndex((item) => item === action) != -1;
  };

  return (
    <TouchableOpacity onPress={() => {
      if (showAlert(action)) {
        console.log(action)
        onShow(action);
      } else {
        // @ts-ignore
        navigation.navigate(action);
      }
    }}>
      <Box flexDirection={"row"}
           height={60}
           alignItems={"center"}
           backgroundColor={"background"}
           marginBottom={"s"}
           borderRadius={"s"}
           shadowColor={"edit"}
           shadowOpacity={0.7}
      >
        <Box
          height={45}
          width={45}
          borderRadius={"l"}
          backgroundColor={"blue5"}
          justifyContent={"center"}
          alignItems={"center"}
          marginRight={"m"}
          marginLeft={"m"}
        >
          <Ionicons name={icon} size={30} color={"#fff"} />
        </Box>
        <Box>
          <Text variant={"title3"}>{label}</Text>
          <Text variant={"body"}>{subLabel}</Text>
        </Box>
        <Box
          flex={1}
          marginRight={"m"}
          justifyContent={"flex-start"}
          alignItems={"flex-end"}
        >
          <Text variant={"detail"}>{hint}</Text>
        </Box>
      </Box>
    </TouchableOpacity>

  );
};

export default SettingItem;
