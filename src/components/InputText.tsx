import { Box } from "./Theme";
import { TextInput, TextInputProps, TouchableOpacity } from "react-native";
import { forwardRef } from "react";
import { inputLength } from "../Utils/Tools";
import AntDesgin from "react-native-vector-icons/AntDesign";

interface InputTextProps extends TextInputProps {
  success?:boolean,
  handleSubmit?: () => void;
  ChangeText: (s: string) => void;
  submit?: (s: string) => void;
  value: string;
  max: number;
  min: number;
  error: (s: string) => void;
  disabled?:boolean
}

const InputText = forwardRef<TextInputProps, InputTextProps>(
  ({ max, min, value, handleSubmit,success,disabled, submit, error, ChangeText, ...props }, ref) => {

    const onChangeText = (val: string) => {
      if(val.includes("\n")){
        const lenArr = val.split("\n");
        if ( lenArr.length > 1) {
          if (submit) {
            let resultLen = inputLength(lenArr[0], min, max);
            if(resultLen.result){
              ChangeText(lenArr[0]);
              submit(lenArr[0])
            }else{
              error(resultLen.msg);
            }
          }
        }
      }else{
        ChangeText(val);
      }
    };

    // @ts-ignore
    return (
      <Box
        borderRadius={"s"}
        borderWidth={1}
        height={35}
        paddingLeft={"s"}
        borderColor={(success==false)?"danger":(disabled==true)?"primaryLight":"primary"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <TextInput
            editable={(disabled===true)?false:true}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="done"
          multiline={true}
          {...{ref}}
          {...props}
        />
        {(value != "") && (
          <TouchableOpacity onPress={() => ChangeText ? ChangeText("") : {}}>
            <Box width={40} height={40} justifyContent={"center"} alignItems={"center"}>
              <AntDesgin name={"closecircleo"} size={15} color={"#8c8c8c"} />
            </Box>
          </TouchableOpacity>
        )}
      </Box>
    );
  });

export default InputText;
