import { Box } from "./Theme";
import { Button, TextInput, TextInputProps, TouchableOpacity } from "react-native";
import { forwardRef } from "react";
import { inputLength, removeEnter } from "../Utils/Tools";
import { Formik, Field, Form, FormikHelpers } from "formik";
import AntDesgin from "react-native-vector-icons/AntDesign";


interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

interface InputTextProps extends TextInputProps {
  handleSubmit?: () => void;
  onChangeText: (s: string) => void;
  submit?: (s: string) => void;
  value: string;
  max: number;
  min: number;
  error: (s: string) => void;
}

const FormikText = forwardRef<TextInputProps, InputTextProps>(({
                                                                max, min,
                                                                value,
                                                                handleSubmit,
                                                                submit,
                                                                error,
                                                                onChangeText,
                                                                ...props
                                                              }, ref) => {

  // const onHandleSubmit = (val: any) => {
  //   if (submit) {
  //     ChangeText(val.nativeEvent.text);
  //     submit(val.nativeEvent.text);
  //   }
  // };
  //
  // const ChangeText = (val: string) => {
  //   console.log("onchange ", val);
  //   const lenArr = val.split("\n");
  //   console.log(lenArr);
  //
  //   if (lenArr.length > 1) {
  //     if (submit) {
  //       console.log("enter");
  //       let resultLen = inputLength(lenArr[0], min, max);
  //       (resultLen.result) ? submit(lenArr[0]) : error(resultLen.msg);
  //     }
  //   }else{
  //     console.log("default");
  //     onChangeText(val);
  //   }
  // };
  //
  // const onSelectionChange = (val: any) => {
  //   const data = val._dispatchInstances.memoizedProps.value.split("\n");
  //   if (onChangeText) {
  //     if (data.length > 1) {
  //       if (submit) {
  //         console.log("enter");
  //         let resultLen = inputLength(data[0], min, max);
  //         (resultLen.result) ? submit(data[0]) : error(resultLen.msg);
  //       }
  //     }
  //     onChangeText((data.length > 1) ? removeEnter(data[0]) : data[0]);
  //   }
  // };

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={values => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (

        <Box>
          <TextInput
            {...{ ref }}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            {...props}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </Box>
      )}
    </Formik>

  );
});

export default FormikText;
