import { Dimensions, Modal, TouchableOpacity } from "react-native";
import { Box } from "../../components";
import AntDesgin from "react-native-vector-icons/AntDesign";
import Radio from "../../components/Radio";
import { useState } from "react";
import { lanList } from "../../Utils/Contants";

interface ChooseLanguageProps {
  visible: boolean,
  exit: () => void,
  choose: (val: string) => void
}

interface StateProps {
  lanList: any[],
}

const initState = {
  lanList: lanList
};

const { width } = Dimensions.get("window");
const ChooseLanguage = ({ visible, exit }: ChooseLanguageProps) => {

  const [state, setState] = useState<StateProps>(initState);

  const changeLanguage = (val: any) => {
    setState({
      ...state, lanList: state.lanList.map((e) => {
        e.choose = e === val;
        return e;
      })
    });
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide">
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
        borderTopRightRadius={"l"}
        borderTopLeftRadius={"l"}
        position={"absolute"}
        bottom={0}
        width={width}
        height={400}
        backgroundColor={"background"}
        padding={"l"}>
        <Box flexDirection={"row"} justifyContent={"flex-end"}>
          <TouchableOpacity onPress={exit}>
            <AntDesgin name={"closecircleo"} size={24} />
          </TouchableOpacity>
        </Box>
        {lanList.map((e, i) => {
          return (
            <Box
              key={i}
              height={45}
              backgroundColor={"background"}
              marginBottom={"s"}>
              <Box>
                <Radio label={e.label} choose={e.choose}
                       onPress={() => {
                         changeLanguage(e);
                       }} />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Modal>
  );
};

export default ChooseLanguage;
