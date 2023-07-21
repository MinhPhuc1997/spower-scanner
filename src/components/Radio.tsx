import { Box, Text } from "./Theme";
import { TouchableOpacity } from "react-native";

interface RadioProps {
  label: string;
  choose:boolean;
  onPress:()=>void
}

const Radio = ({ label,choose,onPress }: RadioProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box flexDirection={"row"} alignItems={"center"}>
        <Box
          height={20}
          width={20}
          borderWidth={1}
          borderColor={(choose)?"primary":"blue5"}
          justifyContent={"center"}
          alignItems={"center"}
          marginRight={"s"}
          borderRadius={"l"}>
          {(choose)&&(
            <Box
              height={10}
              width={10}
              backgroundColor={(choose)?"primary":"blue5"}
              borderRadius={"l"} />
          )}
        </Box>
        <Text variant={"body"}>{label}</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default Radio;
