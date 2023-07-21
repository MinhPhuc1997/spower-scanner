import { Box, Text } from "../../components";
import { TouchableOpacity } from "react-native";

interface LastestHistory {
  index: number,
  label: string,
  subLabel: string,
  option: string,
}

const LastestHistory = ({ index, label, subLabel, option }: LastestHistory) => {
  console.log(label, subLabel, option);
  return (
    <TouchableOpacity>
      <Box
        flexDirection={"row"}
        alignItems={"center"}
        marginBottom={"m"}>
        <Box
          width={50}
          height={50}
          marginRight={"m"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"m"}
          backgroundColor={"back2"}
        >
          <Text variant={"title2"}>{index}</Text>
        </Box>
        <Box flex={1}>
          <Box
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}>
            <Text variant={"title3"}>A1425</Text>
            <Box
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Box
                width={10}
                height={10}
                backgroundColor={"primary"}
                borderRadius={"l"}
                marginRight={"s"} />
              <Text variant={"title3"}>Xuất kho</Text>
            </Box>
          </Box>
          <Text variant={"body"}>Tổng cộng có 14 cuộn vải</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default LastestHistory;
