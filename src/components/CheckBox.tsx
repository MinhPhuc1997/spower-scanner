import { Box,Text } from "./Theme";
import { TouchableOpacity } from "react-native";

interface CheckBoxProps{
  size:number,
  label?:string,
  value:boolean
  onChange:(val:boolean)=>void
}

const CheckBox =({size,label,value,onChange}:CheckBoxProps)=>{
  return(
    <TouchableOpacity onPress={()=>onChange(!value)}>
      <Box flexDirection={"row"} alignItems={"center"}>
        <Box
          width={size}
          height={size}
          borderWidth={1}
          borderColor={"blue5"}
          justifyContent={"center"}
          alignItems={"center"}
          marginRight={"s"}
        >
          {(value)&&(
            <Box  width={size-size/2} height={size-size/2} backgroundColor={"blue5"} />
          )}
        </Box>
        <Text variant={"body"}>{label}</Text>
      </Box>
    </TouchableOpacity>

  )
}

export default CheckBox;
