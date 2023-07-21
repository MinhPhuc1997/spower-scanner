import { Box, Text } from "./Theme";
import { TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string,
  onPress: () => void,
  color?:string,
  disable?:boolean
}

const Button = ({ title, onPress,color,disable }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        backgroundColor={(disable==true)?"primaryLight":(color)?color:"primary"}
        height={35}
        borderRadius={"s"}
        justifyContent={"center"}
        alignItems={"center"}>
        <Text variant={"button"}>{title}</Text>
      </Box>
    </TouchableOpacity>

  );
};

export default Button;
