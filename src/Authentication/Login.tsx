import * as React from "react";
import { Box, Text } from "../components";
import InputText from "../components/InputText";
import { useState } from "react";
import { Dimensions } from "react-native";
import Button from "../components/Button";
import Radio from "../components/Radio";
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get("window");

const Login = () => {
  const {t} = useTranslation();
  const [state, setState] = useState<string>("");
  return (

    <Box flex={1} justifyContent={"center"} alignItems={"center"} >
      <Box
        position={"absolute"}
        backgroundColor={"blue5"}
        width={150}
        height={150}
        style={{borderRadius:100}}
        bottom={-75}
        left={-75}
        alignItems={"center"}
      />
      <Box
        position={"absolute"}
        bottom={10}
        right={10}
      >
        <Text variant={"body"}>V.1.0.0</Text>
      </Box>
      <Box  position={"absolute"} top={height*0.1} left={20}>
        <Text variant={"title1"}>{t('setting')}</Text>
      </Box>
      <Box backgroundColor={"background"} width={width * 0.8} height={250} padding={"xl"} borderRadius={"m"} style={{shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,}}>
        <Box >
          <InputText
            ChangeText={(val) => setState(val)}
            value={state}
            max={20}
            min={0}
            error={() => {
            }} />
          <Box marginTop={"m"}>
            <InputText
              ChangeText={(val) => setState(val)}
              value={state}
              max={20}
              min={0}
              error={() => {
              }} />
          </Box>
          <Box marginTop={"m"}>
           <Radio label={"Tự động đăng nhập"} choose={false} onPress={()=>{}} />
          </Box>
          <Box marginTop={"m"}>
            <Button title={"Đăng nhập"} onPress={()=>{}} />
          </Box>
        </Box>
      </Box>
    </Box>


  );
};

export default Login;
