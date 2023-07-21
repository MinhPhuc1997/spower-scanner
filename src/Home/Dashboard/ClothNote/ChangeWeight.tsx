import { Box } from "../../../components";
import Header from "../../../components/Header";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";
import { useState } from "react";
import { Dimensions } from "react-native";
import AlertModal from "../../../components/AlertModal";
import { headerList } from "../../../Utils/Contants";
import TableSimple from "../../../components/TableSimple";

interface StateProps {
  pallet: string,
  code: string,
  visiable: boolean,
  location: string,
  load:boolean
}

const initState = { pallet: "", code: "", visiable: false, location: "" ,load:false};

const initNotif = { visiable: false, title: "", content: "", type: 0 };

const { width, height } = Dimensions.get("window");
const ChangeWight = () => {

  const [state, setState] = useState<StateProps>(initState);
  const [list, setList] = useState<any>([]);
  const [notif, setNotif] = useState(initNotif);

  const Notification = (title: string, massage: string, type: number) => {
    setNotif({
      visiable: true,
      title: title,
      content: massage,
      type: type
    });
  };

  const ModalOnPress = () => {
    setNotif({ ...notif, visiable: false });
    switch (notif.type) {
      case 0:
        return;
      case 1:

        return;
    }
  };

  return (
    <Box>
      <Header title={"Cân vải thô"} />
      <Box padding={"s"}>
        <Box
          flexDirection={"row"}
          marginBottom={"s"}>
          <Box width={width * 0.7}>
            <InputText
              min={2}
              max={40}
              error={(msg) => {
                Notification("Lỗi nhập liệu", msg, 1);
              }}
              placeholder={"Nhập mã pallet"}
              value={state.pallet}
              ChangeText={(val) => {
                setState({ ...state, pallet: val });
              }}
              submit={() => console.log(state.pallet)}
            />
          </Box>
          <Box
            flex={1}
            marginLeft={"s"}
            justifyContent={"center"}>
            <Button title={"Hoàn tất"} onPress={() => {

            }} />
          </Box>
        </Box>
        <Box
          flexDirection={"row"}
          marginBottom={"s"}>
          <Box width={width * 0.7}>
            <InputText
              min={2}
              max={40}
              error={(msg) => {
                Notification("Lỗi nhập liệu", msg, 1);
              }}
              placeholder={"Scan mã vải thô"}
              value={state.pallet}
              ChangeText={(val) => {
                setState({ ...state, pallet: val });
              }}
              submit={() => console.log(state.pallet)}
            />
          </Box>
          <Box
            flex={1}
            marginLeft={"s"}
            justifyContent={"center"}>
            <Button title={"Camera"} onPress={() => {
              Notification("Hệ thống","Tính năng này vẫn đang phát triển!",0)
            }} />
          </Box>
        </Box>
        <TableSimple
          headerColor={"edit"}
          header={headerList}
          data={list}
          hide={["id"]}
          height={height * 0.8}
          loading={state.load}
        />
      </Box>
      {(notif.visiable) && (
        <Box position={"absolute"}
             width={width}
             height={height + 200}
             opacity={0.4}
             backgroundColor={"secondary"}
        />)}
      <AlertModal
        onPress={() => {
          ModalOnPress();
        }}
        visible={notif.visiable}
        exit={() => setNotif({ ...notif, visiable: false })}
        title={notif.title}
        content={notif.content} />
    </Box>
  );
};

export default ChangeWight;

